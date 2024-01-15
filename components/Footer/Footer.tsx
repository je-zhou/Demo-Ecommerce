import React from 'react'
import Socials from '../Socials'
import Image from 'next/image'
import LinksCol from './LinksCol'
import getCategories from '@/actions/getCategories'

export default async function Footer() {
  const categories = await getCategories()

  return (
    <div className=' bg-[#E9E9E9] pt-16 w-full flex flex-col items-center text-slate-700 text-sm py-8 px-4'>
      <div className='max-w-7xl w-full'>
        {/* Top Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-5 gap-y-8 gap-x-4'>
          {/* Logo and Socials */}
          <div className='flex flex-col'>
            <Image src={"/assets/logo.png"} alt='logo' height={120} width={100}></Image>
            <div className='py-8'><Socials/></div>
          </div>
          <LinksCol title='Products' 
            links={categories.map((cat) => {
              return {
                name: cat.name,
                url: `/category/${cat.id}`
              }
            })}/>
          <LinksCol title='021' 
            links={[
              {name:"About Us", url: '/about'},
              {name:"Contact Us", url: '/contact'},
            ]}/>          
            <LinksCol title='Useful Links' 
            links={[
              {name:"Warranty", url: '/warranty'},
              {name:"Returns and Refunds", url: '/returns'},
            ]}/>          
            <LinksCol title='Helpful' 
            links={[
              {name:"Track My Order", url: ''},
            ]}/>
        </div>
        {/* Copyright and other links */}
        <div className='pt-12 space-y-4'>
          <div className='flex flex-row gap-x-6 sm:hidden'>
            <p>Terms and Conditions</p>
            <p>Privacy Policy</p>
          </div>
          <div className='w-full flex justify-between'> 
            <p>{"© 2024 021 Commerce | All rights reserved"}</p>
            <div className='flex-row gap-x-6 hidden sm:flex'>
              <p>Terms and Conditions</p>
              <p>Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
