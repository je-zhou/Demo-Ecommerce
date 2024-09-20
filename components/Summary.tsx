"use client";

import axios from "axios";

import React, { useEffect, useState } from "react";

import { Button } from "./ui/button";
import Currency from "./ui/Currency";
import useCart from "@/hooks/use-cart";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  calculateProductShipping,
  cn,
  getVariablePrice,
  getVariablePricingIds,
} from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useOrigin } from "@/hooks/use-origin";
import { AddressElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { productCanBeShipped } from "@/actions/productCanBeShipped";

interface SummaryProps {
  address:
    | {
        line1: string;
        line2: string | null;
        city: string;
        state: string;
        postal_code: string;
        country: string;
      }
    | undefined;
  setAddress: React.Dispatch<
    React.SetStateAction<
      | {
          line1: string;
          line2: string | null;
          city: string;
          state: string;
          postal_code: string;
          country: string;
        }
      | undefined
    >
  >;
}

export default function Summary({ address, setAddress }: SummaryProps) {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const origin = useOrigin();
  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

  const [shipping, setShipping] = useState("Delivery");

  const [loading, setLoading] = useState(false);

  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    const variablePricingIds = getVariablePricingIds(item.variants);

    const itemPrice = item.pricingMatrix
      ? getVariablePrice(
          item.selectedVariants,
          item.pricingMatrix,
          variablePricingIds
        ) ?? item.price
      : item.price;

    return total + item.quantity * Number(itemPrice);
  }, 0);

  const allItemsCanBeShipped = address
    ? items.every((item) => productCanBeShipped(item, address.country))
    : false;

  const totalShipping = allItemsCanBeShipped
    ? items.reduce((total, item) => {
        const shipping = calculateProductShipping(item, address!.country);

        return total + item.quantity * shipping;
      }, 0)
    : null;

  const shippingOptions = [
    {
      name: "Local Pick Up",
      description: "Mount Waverley, VIC, Australia",
      price: 0,
      disabled: !items.every((item) => item.allowLocalPickUp),
      disabledText: "Not all products are available for local pick up.",
    },
    {
      name: "Delivery",
      // description: "5 to 10 days",
      price: totalShipping,
      disabled: address ? !allItemsCanBeShipped : false,
      disabledText: "Not all products can be shipped to this country",
    },
  ];

  const shippingOption = shippingOptions.find(
    (option) => option.name === shipping
  );

  const shippingPrice = shippingOption ? shippingOption.price : null;

  async function onCheckout() {
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          cartItems: items,
          shipping: shippingPrice,
          shippingName: shippingOption ? shippingOption.name : "Delivery",
          stripeAccountId: process.env.NEXT_PUBLIC_STRIPE_ACCOUNT_ID,
          frontEndStoreURL: origin,
          isLocalPickUp: shipping === "Local Pick Up",
          address: address,
          customerName: customerName,
        }
      );

      if (response.status != 200) {
        toast.error("Something went wrong. Please try again later");
      }

      window.location = response.data.url;
    } catch (error) {
      toast.error("Something went wrong. Please try again later");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Elements stripe={stripe}>
      <div className="mt-16 rounded bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
        <div className="my-4">
          {items.map((item) => {
            const variablePricingIds = getVariablePricingIds(item.variants);

            const itemPrice = item.pricingMatrix
              ? getVariablePrice(
                  item.selectedVariants,
                  item.pricingMatrix,
                  variablePricingIds
                ) ?? item.price
              : item.price;

            return (
              <div className="flex justify-between py-1" key={item.id}>
                <p className="text-sm overflow-hidden pr-8">
                  <span className="font-bold">{item.quantity} x </span>
                  {item.name}
                </p>
                <Currency value={item.quantity * Number(itemPrice)} />
              </div>
            );
          })}
        </div>
        <div className="mt-6 space-y-4">
          <div className="border-t pt-4 w-full space-y-2">
            <div className="flex items=center w-full justify-between border-gray-200">
              <div className="text-lg font-medium text-gray-900">Shipping</div>
            </div>
            {/* Enter Address */}
            {/* Select Shipping Option */}
            <RadioGroup value={shipping} className="py-4 pb-6">
              {shippingOptions.map((option) => (
                <ShippingTile
                  key={option.name}
                  name={option.name}
                  description={option.description}
                  disabled={option.disabled}
                  disabledText={option.disabledText}
                  price={option.price}
                  onChange={(val: string) => {
                    setShipping(val);
                    if (val === "Local Pick Up") {
                      setAddress(undefined);
                    }
                  }}
                />
              ))}
            </RadioGroup>
            {shipping == "Delivery" && (
              <div>
                <AddressElement
                  options={{
                    mode: "shipping",
                    defaultValues: { address: { country: "AU" } },
                  }}
                  onChange={(event) => {
                    setAddress(undefined);
                    console.log(event);
                    if (event.complete) {
                      // Extract potentially complete address
                      const address = event.value.address;
                      setAddress(address);
                      setCustomerName(event.value.name);
                    }
                  }}
                />
              </div>
            )}
          </div>
          {address && (
            <div className="flex items=center w-full justify-between  border-gray-200">
              <div className="text-base font-medium text-gray-900">
                Order Total
              </div>
              <Currency value={totalPrice + (totalShipping ?? 0)} />
            </div>
          )}
        </div>
        {address && (
          <Button
            disabled={loading}
            onClick={onCheckout}
            className="bg-white text-black border rounded-xl w-full mt-6 hover:bg-black hover:text-white h-12"
          >
            Checkout
          </Button>
        )}
      </div>
    </Elements>
  );
}

interface ShippingTileProps {
  name: string;
  description?: string;
  price: number | null;
  disabled: boolean;
  disabledText: string;
  onChange: (val: string) => void;
}

export function ShippingTile({
  name,
  description,
  price,
  disabled,
  disabledText,
  onChange,
}: ShippingTileProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value={name}
          id={name}
          disabled={disabled}
          onClick={() => onChange(name)}
        />
        <div className=" flex flex-col text-sm">
          <p className={cn("", disabled ? "text-gray-500" : "")}>{name}</p>
          <p className={cn("", disabled ? "text-gray-400" : "text-gray-500")}>
            {description}
          </p>
          {disabled ? (
            <div className={"text-red-500 text-xs"}>{disabledText}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {price === null ? null : price === 0 ? (
        <p className={cn("", disabled ? "text-gray-500" : "")}>Free</p>
      ) : (
        <Currency value={price} />
      )}
    </div>
  );
}
