import Container from '@/components/Container'
import Link from 'next/link'
import React from 'react'

export default function Warranty() {
  return (
    <div className='w-full min-h-screen bg-white p-12'>
    <div className='py-16 text-black flex space-y-4'>
      <Container>
        <div className='space-y-4'>
          {/* Title */}
          <div className='space-y-2'>
            <h3 className='font-semibold text-2xl'>Warranty</h3>
            <div className='space-y-6'>
              <p className='text-gray-500'>Thanks for visiting our online store and we greatly appreciate your patronage. If something goes wrong with your purchase please do not hesitate to contact us and we will do our best to help resolve any issues.</p>
              <p className='text-gray-500'>Please read the terms and conditions below that fully outline your warranty rights, and policy about return and refund.</p>
              <p className='text-gray-500'>All of our products have 6 months to 5 years warranty, varied with different products. Please read the warranty conditions for each product in the descriptions before buy it.</p>
            </div>
          
          </div>
          <div>
            <h3 className='font-semibold text-xl'>Covered Under Warranty</h3>
            <ul className='space-y-2 py-2 text-gray-500 pl-4'>
              <li className='list-item'>○ The original retail purchaser of the products</li>
              <li className='list-item'>○ Defects in materials and workmanship</li>
              <li className='list-item'>○ Wrong size of custom made products more than 5cm</li>
              <li className='list-item'>○ Supplied colour different to sample colour</li>
              <li className='list-item'>○ Damage noted upon delivery</li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold text-xl'>Not Covered Under Warranty</h3>
            <ul className='space-y-2 py-2 text-gray-500 pl-4'>
              <li className='list-item'>○ Alterations or improper installations</li>
              <li className='list-item'>○ Abuse and misuse</li>
              <li className='list-item'>○ Customer induced accidents</li>
              <li className='list-item'>○ Natural minor fading over time</li>
              <li className='list-item'>○ Improper cleaning and use of chemicals</li>
            </ul>
          </div>
          <div className='space-y-2'>
            <h3 className='font-semibold text-xl'>How To Make A Claim</h3>
            <div className='text-gray-500'>In the event you need to make a warranty claim, please send your claim to our customer service team by emailing <span className='underline cursor-pointer'>dmh@decormyhouse.com.au</span> or through the contact form <Link className='underline' href={"/contact"}>here</Link>.</div>
          </div>
        </div>
      </Container>
    </div>
  </div>  
  )
}