"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import {Check, Cross, Truck, X} from "lucide-react"

import IconButton from './ui/IconButton'
import Currency from './ui/Currency'
import { CartItem } from '@/types'
import useCart from '@/hooks/use-cart'
import Quantity from './Quantity'
import { calculateProductShipping, formatter, getVariablePrice, sameVariantCombo } from '@/lib/utils'

interface CartItemProps {
  data: CartItem
}

export default function CartItem({data}: CartItemProps) {
  const cart = useCart();

  function onRemove(){
    cart.removeItem(data.id)
  }

  function onAdd(){
    cart.updateItem(data, {quantity: data.quantity + 1, selectedVariants: data.selectedVariants})
  }

  function onSubtract(){
    cart.updateItem(data, {quantity: data.quantity - 1, selectedVariants: data.selectedVariants})
  }

  const shipping = calculateProductShipping(data);

  const variablePricingIds = data.variants.filter(v => v.inputType && v.variablePricing).map(v => v.id); 

  return (
    <li className='flex py-6 border-b'>
      <div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-56 sm:w-56'>
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className='object-cover object-center rounded'
        />
      </div>
      <div className='relative ml-4 flex flex-1 flex-col sm:ml-6'>
        <div className='absolute z-10 right-0 top-0'>
          <IconButton onClick={onRemove} icon={<X size={15}/>}/>
        </div>
        <div className='md:pr-24 text-lg space-y-2 font-semibold text-black'>
          {/* Name */}
          <p className='pr-20 md:pr-0'>
            {data.name}
          </p>
          {/* Currency */}
          <Currency value={data.pricingMatrix ? getVariablePrice(data.selectedVariants, data.pricingMatrix, variablePricingIds) ?? data.price :  data.price}/>
          {/* Variants */}
          <div className='mt-1 flex text-sm flex-col'>
            {
              data.variants.map((variant) => <div className='flex space-x-1' key={variant.id}>
                <p className='font-semibold text-gray-800'>{variant.name}:</p>
                <p className='font-normal text-gray-500'>{data.selectedVariants[variant.id]}</p>
              </div>)
            }
          </div>
          <Quantity value={data.quantity} onAdd={onAdd} onSubtract={onSubtract} size='small'></Quantity>
          {/* Shipping */}
          <div className='text-sm text-gray-500 font-normal flex flex-row space-x-1'> 
            <Truck className='w-5 h-5'/>
            <p>{`Shipping - ${formatter.format(shipping * data.quantity)}`}</p>
          </div>
          {/* Local Pickup */}
          <div className='text-sm text-gray-500 font-normal flex flex-row items-center space-x-1'>
             {data.allowLocalPickUp ? 
            <Check className='w-5 h-5'></Check>: <X className='w-5 h-5'></X>
            } 
            <p>
              {`Local pick up ${data.allowLocalPickUp ? "available" : "unavailable"}` }
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}
