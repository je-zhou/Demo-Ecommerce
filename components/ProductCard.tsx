'use client'

import { Product } from '@/types'
import React, { MouseEventHandler } from 'react'
import Image from 'next/image'
import IconButton from './ui/IconButton'
import { Expand, ShoppingCart } from 'lucide-react'
import Currency from './ui/Currency'
import { useRouter } from 'next/navigation'
import usePreviewModal from '@/hooks/use-preview-modal'
import useCart from '@/hooks/use-cart'
import { loadDefaultVariantValues } from '@/actions/defaultVariantValues'

interface ProductCardProps {
  data: Product
}

export default function ProductCard({data}: ProductCardProps) {
  const previewModal = usePreviewModal();
  const router = useRouter();
  const cart = useCart();
  const initialVariantValues = loadDefaultVariantValues(data);

  function handleClick() {
    router.push(`/product/${data.id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  }
  
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data, {quantity: 1, selectedVariants: initialVariantValues});
  }

  const category = data.categories.length > 0 ? data.categories[0].name : ""

  return (
    <div onClick={handleClick} className='bg-white group cursor-pointer rounded-xl border p-3 space-x-2 text-black space-y-4'>
      {/* Images and Actions */}
      <div className='aspect-square rounded-xl bg-gray-100 relative'>
        <Image
          src={data?.images?.[0].url}
          alt={data.id}
          fill
          className='aspect-square object-cover rounded'
        />
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20}/>}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20}/>}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className='text-md font-medium'>
          {data.name}
        </p>
        <p className='text-sm text-gray-500'>
          {category}
        </p>
      </div>
      {/* Price */}
      <Currency value={data.price}/>
    </div>
  )
}
