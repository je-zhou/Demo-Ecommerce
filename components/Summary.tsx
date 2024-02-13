"use client"

import axios from "axios"

import React, { useEffect, useState } from 'react'

import { Button } from "./ui/button"
import Currency from "./ui/Currency"
import useCart from "@/hooks/use-cart"
import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import { calculateProductShipping, cn, getVariablePrice } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { useOrigin } from "@/hooks/use-origin"

export default function Summary() {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll)
  const origin = useOrigin();

  const [shipping, setShipping] = useState("Standard");

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.")
      removeAll();
    }
  
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.")
    }

  }, [searchParams, removeAll])

  const totalPrice = items.reduce((total,item) => {

    const variablePricingIds = item.variants.filter(v => v.inputType && v.variablePricing).map(v => v.id); 
    
    const itemPrice = item.pricingMatrix ? getVariablePrice(item.selectedVariants, item.pricingMatrix, variablePricingIds) ?? item.price : item.price

    return total + item.quantity * Number(itemPrice);
  }, 0)

  const totalShipping = items.reduce((total, item) => {
    const shipping = calculateProductShipping(item)

    return total + item.quantity * shipping;
  }, 0)

  const shippingOptions = [
    {
      name: "Standard", 
      description: "5 to 10 days",
      price: totalShipping,
      disabled: false, 
    },
    {
      name: "Local Pick Up", 
      description: "Mount Waverley, VIC, Australia",
      price: 0,
      disabled: !items.every((item) => item.allowLocalPickUp), 
    },
  ]

  const shippingOption = shippingOptions.find((option) => option.name === shipping)
  const shippingPrice = shippingOption ? shippingOption.price : 0

  async function onCheckout(){

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      cartItems: items,
      shipping: shippingPrice,
      shippingName: shippingOption? shippingOption.name : "Standard",
      stripeAccountId: process.env.NEXT_PUBLIC_STRIPE_ACCOUNT_ID,
      frontEndStoreURL: origin,
    })

    window.location = response.data.url
  }

  return (
    <div className="mt-16 rounded bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">
        Order Summary
      </h2>
      <div className="my-4">
        {items.map((item) => {
        const variablePricingIds = item.variants.filter(v => v.inputType && v.variablePricing).map(v => v.id); 

        const itemPrice = item.pricingMatrix ? getVariablePrice(item.selectedVariants, item.pricingMatrix, variablePricingIds) ?? item.price : item.price
        
        return <div className="flex justify-between py-1" key={item.id}>
          <p className="text-sm overflow-hidden pr-8"><span className="font-bold">{item.quantity} x </span>{item.name}</p>
          <Currency value={item.quantity * Number(itemPrice)}/>
        </div>})}
      </div>
      <div className="mt-6 space-y-4">
        <div className="border-y pt-4 w-full space-y-2">
          <div className="flex items=center w-full justify-between border-gray-200">
            <div className="text-lg font-medium text-gray-900">
              Shipping
            </div>
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
                price={option.price}
                onChange={(val: string) => setShipping(val)}
              />
            ))}
          </RadioGroup>
        </div>
        <div className="flex items=center w-full justify-between  border-gray-200">
            <div className="text-base font-medium text-gray-900">
              Order Total
            </div>
            <Currency value={totalPrice + shippingPrice}/>
          </div>
      </div>
      <Button onClick={onCheckout} className="bg-white text-black border rounded-xl w-full mt-6 hover:bg-black hover:text-white h-12">
        Checkout
      </Button>
    </div>
  )
}

interface ShippingTileProps {
  name: string
  description: string
  price: number
  disabled: boolean
  onChange: (val: string) => void
}

export function ShippingTile({name, description, price, disabled, onChange}: ShippingTileProps) {

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={name} id={name} disabled={disabled} onClick={() => onChange(name)} />
        <div className=" flex flex-col text-sm">
          <p className={cn("", disabled ? "text-gray-500" : "")}>{name}</p>
          <p className={cn("", disabled ? "text-gray-400" : "text-gray-500")}>{description}</p>
          {
            disabled ? 
            <div className={"text-red-500 text-xs"}>
              Not all products are available for local pick up.
            </div> : <></>
          }
        </div>
      </div>
      {
        price === 0 ? 
        <p className={cn("", disabled ? "text-gray-500" : "")}>Free</p>:
        <Currency value={price}/>
      }
      
    </div>

  )
}
