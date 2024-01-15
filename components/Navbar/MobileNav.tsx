'use client'

import React from 'react'
import {usePathname} from "next/navigation"
import { Category } from '@/types';
import Link from 'next/link';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { AlignJustify } from 'lucide-react';

interface MainNavProps {
    data: any
}

interface Route {
  href: string
  label: string
  active: boolean
}

export default function MainNav({data}: MainNavProps) {
  const pathname = usePathname();

  const routes: Route[] = data.map((route: Category) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`
  }));

  return (
    <Sheet>
      <SheetTrigger><AlignJustify className='mr-8'/></SheetTrigger>
      <SheetContent className='bg-white text-black'>
        <SheetHeader>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <div className='flex flex-col gap-y-4 pt-12'>
          {routes.map((route) => (
            <Link key={route.href} href={route.href} className='font-medium text-gray-800'>{route.label}</Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
