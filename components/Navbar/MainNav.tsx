'use client'

import React from 'react'
import {usePathname} from "next/navigation"
import { Category } from '@/types';
import Link from 'next/link';

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
    <div className='flex flex-row gap-x-16 pl-12'>
      {routes.map((route) => (
        <Link key={route.href} href={route.href} className='font-medium text-gray-800'>{route.label}</Link>
      ))}
    </div>
  )
}
