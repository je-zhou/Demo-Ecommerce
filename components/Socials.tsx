'use client'

import { Facebook, Instagram } from 'lucide-react'
import React from 'react'

export default function Socials() {
  return (
    <div className='text-black opacity-60 flex flex-row gap-2'>
      <Instagram/>
      <Facebook/>
    </div>
  )
}
