import { formatter } from '@/lib/utils'
import React, { useEffect, useState } from 'react'

interface CurrencyProps {
  value?: string | number
}

export default function Currency({value}: CurrencyProps) {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null;
  
  return (
    <div className='font-semibold text-black'>
      {formatter.format(Number(value))}
    </div>
  )
}
