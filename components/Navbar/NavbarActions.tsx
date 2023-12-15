'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {ShoppingBag} from "lucide-react";
import useCart from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';

export default function NavbarActions() {
  const cart = useCart();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null;

  return (
    <div>
      {/* Shopping Cart */}
      <Button onClick={() => router.push("/cart")} variant={"outline"} className='rounded-full gap-x-2 hover:scale-110 transition'>
        <ShoppingBag size={20}/>
        <span>{cart.items.length}</span>
      </Button> 
    </div>
  )
}
