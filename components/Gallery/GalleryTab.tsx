import React from 'react'
import Image from 'next/image'
import { Image as ImageType} from '@/types'
import { Tab } from '@headlessui/react'
import { cn } from '@/lib/utils'

interface GalleryTabProps {
  image: ImageType
}

export default function GalleryTab({image}: GalleryTabProps) {
  return (
    <Tab className='relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white'>
      {({selected}) => (
        <div>
          <span className='absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md'>
            <Image
              fill
              src={image.url}
              alt=''
              className='object-cover object-center rounded'
            />
          </span>
          <span className={cn("absolute inset-0 rounded ring-2 ring-offset-2", selected ? "ring-black" : "ring-transparent")}>
          </span>
        </div>
      )}
    </Tab>
  )
}
