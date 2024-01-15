import React from 'react'
import BannerTile from './BannerTile'
import { BaggageClaim, ShieldCheck, Truck } from 'lucide-react'
// import { faGlobeOceania, faLock, faTruck } from '@fortawesome/free-solid-svg-icons'

export default function LandingBanner() {
  return (
    <div className='bg-[#323232] h-12 flex items-center justify-center gap-x-8 sm:gap-x-24'>
        {/* Free Local Pick Up */}
        <BannerTile icon={<BaggageClaim className='w-5 h-5'/>} text='Free Local Pick Up'></BannerTile>
        {/* Fast Delivery */}
        <BannerTile icon={<Truck className='w-5 h-5'/>} text='Fast Delivery'></BannerTile>
        {/* Free Secure Checkout */}
        <div className='hidden sm:block'>
          <BannerTile icon={<ShieldCheck className='w-5 h-5'/>} text='Secure Checkout'></BannerTile>
        </div>
    </div>
  )
}
