import { cn } from '@/lib/utils'
import { BaggageClaim, Flame, Shield, Truck } from 'lucide-react'
import React from 'react'

export default function Badges() {
  return (
    <div className='grid grid-cols-2 gap-8'>
      <Badge title='Secure Payments' icon={<Shield className='w-4 h-4'/>} className='text-sm space-x-2'/>
      <Badge title='Free Local Pick Up' icon={<BaggageClaim className='w-4 h-4'/>} className='text-sm space-x-2'/>
      <Badge title='Popular Seller' icon={<Flame className='w-4 h-4'/>} className='text-sm space-x-2'/>
      <Badge title='Delivered in Australia' icon={<Truck className='w-4 h-4'/>} className='text-sm space-x-2'/>
    </div>
  )
}

interface BadgeProps {
  title: string
  className?: string
  icon: React.ReactNode
  
}

export function Badge({title, icon, className}: BadgeProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <div className='bg-black rounded-full p-1 text-white'>
        {icon}
      </div>
      <p>{title}</p>
    </div>
  )
}

