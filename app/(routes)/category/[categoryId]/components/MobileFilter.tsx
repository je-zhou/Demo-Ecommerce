'use client'

import IconButton from '@/components/ui/IconButton'
import { Button } from '@/components/ui/button'
import { Dialog } from '@headlessui/react'
import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import Filter from './Filter'

interface MobileFilterProps {
  // sizes: Size[]
  // colours: Colour[]
}

export default function MobileFilter({sizes, colours}: MobileFilterProps) {
  const [open, setOpen] = useState(false)

  function onOpen() {
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
  }

  return (
    <>
      <Button 
        onClick={onOpen}
        className="flex items-center gap-x-2 lg:hidden text-black border border-black rounded"
      >
        Filters
        <Plus size={20}/>
      </Button>
      <Dialog open={open} as="div" className={"relative z-40 lg:hidden text-black"} onClose={onClose}>
        {/* Background */}
        <div className='fixed inset-0 bg-black bg-opacity-25'>
          <div className='fixed inset-0 z-40 flex'>
            <Dialog.Panel className={"relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 px-4 shadow-xl"}>
              <div className='flex items-center justify-end px-4 text-black'>
                <IconButton icon={<X size={15} onClick={onClose}/>}/>
              </div>
              {/* Filter */}
              <Filter 
                valueKey="sizeId" data={sizes} name={'Sizes'}              
              />
              <Filter 
                valueKey="colourId" data={colours} name={'Colours'}              
              />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
