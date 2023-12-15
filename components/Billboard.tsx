import React from 'react'
import Image from "next/image"
interface BillboardProps {
  url: string
  description?: string
}

export default function Billboard({url, description}: BillboardProps) {
  return (
    <div className='rounded-xl overflow-hidden w-full h-full'>
      <div 
        className='rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover'
        style={{backgroundImage: `url(${url})`}}
      >
        <div className='h-full w-full flex flex-col justify-center items-center text-center gap-y-8'>
           <div className='font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max:w-xs text-black'>
            {description ?? ""}
           </div>
        </div>
      </div>
    </div>
  )
}
