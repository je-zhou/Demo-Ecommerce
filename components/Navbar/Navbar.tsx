import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import getCategories from '@/actions/getCategories'
import MainNav from './MainNav'
import NavbarActions from './NavbarActions'

export default async function Navbar() {
  const categories = await getCategories();

  return (
    <div className='w-full flex flex-row px-8 text-black h-20 items-center z-50 bg-white'>
        <Link href={"/"}>
          <Image src={"/assets/logo.png"} alt='logo' height={120} width={100}></Image>
        </Link>
        <MainNav data={categories}/>
        <div className='flex flex-row gap-x-8 pr-12 text-gray-500 ml-auto'>
          <NavbarActions/>
        </div>       
    </div>
  )
}
