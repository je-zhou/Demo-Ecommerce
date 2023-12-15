"use client"
import CartItem from '@/components/CartItem';
import Container from '@/components/Container';
import Summary from '@/components/Summary';
import useCart from '@/hooks/use-cart';
import React, { useEffect, useState } from 'react'

export default function CartPage() {
  const cart = useCart();

  const [isMounted, setIsMounted] = useState(false)

  useEffect(()=> {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null;

  return (
    <div className='bg-white min-h-screen h-full'>
      <Container>
        <div className='px-4 py-16 sm:px-6 lg:px-8 text-black'>
          <h1 className='text-3xl font-bold'>Shopping Cart</h1>
          <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
            <div className='lg:col-span-7'>
              {
                cart.items.length === 0 && <p className='text-neutral-500'>No items added to cart</p>
              }
              <ul>
                {cart.items.map((item)=> (
                  <CartItem key={item.id + Object.values(item.selectedVariants).join()} data={item}/>
                ))}
              </ul>
            </div>
          <Summary/>
          </div>
        </div>
      </Container>

    </div>
  )
}
