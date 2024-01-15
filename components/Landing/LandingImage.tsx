import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { AspectRatio } from '../ui/aspect-ratio'

export default function LandingImage() {
  return (
    <div className='relative'>
        {/* Text */}
        <div className='w-full h-full absolute flex items-center justify-center z-20 flex-col gap-y-8 xl:gap-y-16 text-center text-background'>
            {/* Title */}
            <h1 className='md:text-xl xl:text-4xl max-w-xl font-semibold'>Hoodies with a Twist: Where Fun Meets Fashion</h1>
            {/* Description */}
            <p className='max-w-xs md:max-w-lg xl:max-w-2xl font-light text-sm xl:text-lg'>Your Cozy Adventure Begins Here!</p>
            {/* CTA */}
            <Link href={"/product"}>
                <Button className='bg-white text-black rounded hover:bg-white p-4xl:p-7 text-sm md:text-base xl:text-xl'>Shop Now</Button>
            </Link>
        </div>
        <div className='bg-black w-full h-full absolute opacity-60 z-10'></div>
        <div className='block sm:hidden'>
            <AspectRatio ratio={1}>
                <Image src={'/assets/landing.png'} alt={'landing'} fill={true} objectFit='cover'></Image>
            </AspectRatio>
        </div>
        <Image className='hidden sm:block' src={'/assets/landing.png'} alt={'landing'} width={100000} height={100000}></Image>    </div>  
    )
}
