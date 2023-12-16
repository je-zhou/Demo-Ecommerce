import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function LandingImage() {
  return (
    <div className='relative'>
        {/* Text */}
        <div className='w-full h-full absolute flex items-center justify-center z-20 flex-col gap-y-16 text-center text-background'>
            {/* Title */}
            <h1 className='text-4xl max-w-xl font-semibold'>Hoodies with a Twist: Where Fun Meets Fashion</h1>
            {/* Description */}
            <p className='max-w-2xl font-light text-lg'>Your Cozy Adventure Begins Here!</p>
            {/* CTA */}
            <Link href={"/product"}>
                <Button className='bg-white text-black hover:bg-white transition rounded p-7 text-xl'>Shop Now</Button>
            </Link>
        </div>
        <div className='bg-black w-full h-full absolute opacity-60 z-10'></div>
        <Image src={'/assets/landing.png'} alt={'landing'} height={100000} width={10000}></Image>
    </div>  
    )
}
