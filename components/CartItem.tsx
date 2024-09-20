"use client";

import React from "react";
import Image from "next/image";
import { Check, Truck, X } from "lucide-react";

import IconButton from "./ui/IconButton";
import Currency from "./ui/Currency";
import { CartItem as CartItemType } from "@/types";
import useCart from "@/hooks/use-cart";
import Quantity from "./Quantity";
import {
  calculateProductShipping,
  formatter,
  getVariablePrice,
  getVariablePricingIds,
  sameVariantCombo,
} from "@/lib/utils";
import { productCanBeShipped } from "@/actions/productCanBeShipped";
import Link from "next/link";

interface CartItemProps {
  data: CartItemType;
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
}

export default function CartItem({ data, address }: CartItemProps) {
  const cart = useCart();

  function onRemove() {
    cart.removeItem(data.id);
  }

  function onAdd() {
    cart.updateItem(data, {
      quantity: data.quantity + 1,
      selectedVariants: data.selectedVariants,
    });
  }

  function onSubtract() {
    cart.updateItem(data, {
      quantity: data.quantity - 1,
      selectedVariants: data.selectedVariants,
    });
  }

  const canBeShipped = address
    ? productCanBeShipped(data, address.country)
    : false;

  const variablePricingIds = getVariablePricingIds(data.variants);

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-56 sm:w-56">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center rounded"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="md:pr-24 text-lg space-y-2 font-semibold text-black">
          {/* Name */}
          <Link href={`/product/${data.id}`} className="pr-20 md:pr-0">
            {data.name}
          </Link>{" "}
          {/* Currency */}
          <Currency
            value={
              data.pricingMatrix
                ? getVariablePrice(
                    data.selectedVariants,
                    data.pricingMatrix,
                    variablePricingIds
                  ) ?? data.price
                : data.price
            }
          />
          {/* Variants */}
          <div className="mt-1 flex text-sm flex-col">
            {Object.entries(data.variants).map(([k, v]) => (
              <div className="flex space-x-1" key={k}>
                <p className="font-semibold text-gray-800">{v.name}:</p>
                <p className="font-normal text-gray-500">
                  {data.selectedVariants[k]}
                </p>
              </div>
            ))}
          </div>
          <Quantity
            value={data.quantity}
            onAdd={onAdd}
            onSubtract={onSubtract}
            size="small"
          ></Quantity>
          {/* Local Pickup */}
          <div className="text-sm text-gray-500 font-normal flex flex-row items-center space-x-1">
            {data.allowLocalPickUp ? (
              <Check className="w-5 h-5"></Check>
            ) : (
              <X className="w-5 h-5"></X>
            )}
            <p>
              {`Local pick up ${
                data.allowLocalPickUp ? "available" : "unavailable"
              }`}
            </p>
          </div>
          {/* Shipping */}
          {address && (
            <div className="text-sm text-gray-500 font-normal flex flex-row space-x-1">
              <Truck className="w-5 h-5" />
              <p>{`This product ${
                canBeShipped ? "can" : "cannot"
              } be shipped to ${address.country}`}</p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
