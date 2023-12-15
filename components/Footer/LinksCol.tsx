'use client'
import Link from 'next/link'
import React from 'react'

interface LinksColProps {
    title: string
    links: Array<{
        name: string,
        url: string
    }>
}

export default function LinksCol({title, links}: LinksColProps) {
  return (
    <div className='flex flex-col font-light text-sm gap-y-4'>
        <p className='font-bold'>{title}</p>
        {links.map((link) => <Link key={link.name} href={link.url}>{link.name}</Link> )}
    </div>
  )
}
