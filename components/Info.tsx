'use client'
import { Product } from '@/types'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import Currency from './ui/Currency'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import Quantity from './Quantity'
import VariantSelector from './VariantSelector'
import { cn, findPrice } from '@/lib/utils'
import Badges from './Badges'
import { loadDefaultVariantValues } from '@/actions/defaultVariantValues'
import useCart from '@/hooks/use-cart'
import { VariantSlider } from './VariantSlider'

interface InfoProps {
  data: Product
}

export default function Info({data}: InfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [variants, setVariants] = useState<{[key: string]: string}>({})
  const [price, setPrice] = useState(data.price)
  const cart = useCart();

  useEffect(() => {
    const initialVariants = loadDefaultVariantValues(data);
    const newPrice = findPrice(data, initialVariants)
    setVariants(initialVariants)
    setPrice(newPrice)

  }, [data]);

  function onVariantUpdate(variantId: string, value: string) {
    const newVariants = {...variants, [variantId]: value}
    setVariants(newVariants)
    
    const newPrice = findPrice(data, newVariants);
    setPrice(newPrice);
  }

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data, {quantity: quantity, selectedVariants: variants});
  }

  return (
    <div>
      {/* Title */}
      <h1 className='text-3xl font-semibold text-gray-900'>{data.name}</h1>
      {/* Reviews */}
      <div></div>
      {/* Price */}
      <div className='text-4xl py-8 text-gray-900 '>
        <Currency value={price}/>
      </div>
      {/* Short description */}
      <p className='text-gray-400 whitespace-pre-line'>
        {data.description ? Buffer.from(data.description.data).toString("utf-8") : ""}
      </p>
      {/* Variants */}
      <div className=''>
        {
          data.variants.sort((a,b) => Number(a.inputType) - Number(b.inputType)).map((variant) => 
            <div key={variant.id}
              className={cn('flex gap-x-4 pt-4', variant.variantOptions.length > 2 ? "" : "")}>
                {
                  variant.inputType ? 
                    <VariantSlider
                      variantId={variant.id}
                      variant={variant} 
                      value={variants[variant.id]} 
                      onChange={onVariantUpdate}
                    /> : 
                    <VariantSelector 
                      variant={variant} 
                      value={variants[variant.id]} 
                      onChange={onVariantUpdate}
                    />

                }
            </div>)
        }
      </div>
      {/* Quantity and Add to Cart */}
      <div className='pt-12 flex flex-row space-x-4 items-center'>
        {/* Quantity */}
        <Quantity size='medium' value={quantity} onAdd={() => setQuantity(quantity+1)} onSubtract={() => setQuantity(quantity-1)}/>
        {/* Cart Button */}
        <Button onClick={onAddToCart} type='button' variant="default"  className='w-64 h-12 bg-black hover:bg-black text-xl rounded text-white' >
          Add to cart
          <ShoppingCart className='ml-2'/>
        </Button>
      </div>
      {/* Product badges */}
      <div className='pt-16 pb-8'>
        <Badges/>
      </div>
    </div>
  )
}
