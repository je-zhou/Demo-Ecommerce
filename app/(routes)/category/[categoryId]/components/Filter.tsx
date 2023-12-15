'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import qs from "query-string"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface FilterProps {
  data: (Size | Colour)[]
  name: string
  valueKey: string
}

export default function Filter({data, name, valueKey}: FilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  function onClick(id: string) {
    const current = qs.parse(searchParams.toString())

    const query = {
      ...current,
      [valueKey]: id
    }

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, {skipNull: true})

    router.push(url)
  }

  return (
    <div className='mb-8'>
      <h3 className='text-lg font-semibold text-black'>
        {name}
      </h3>
      <hr className='my-4'/>
      <div className='flex flex-wrap gap-2'>
        {data.map((filter)=> (
          <div key={filter.id} className='flex items-center'>
            <Button
              onClick={() => onClick(filter.id)}
              className={
                cn("rounded text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValue === filter.id && "bg-black text-white"
              )}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
