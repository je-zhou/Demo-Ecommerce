import Container from '@/components/Container'
import React from 'react'
import ContactForm from './components/contact-form'
import Socials from '@/components/Socials'
 
export default function AboutUs() {
  return (
    <div className='w-full min-h-screen bg-white p-12'>
    <div className='py-16 text-black flex space-y-4'>
      <Container>
        <div className='space-y-8'>
          {/* Title */}
          <div>
            <h3 className='font-semibold text-2xl'>Contact Us</h3>
            <p className='text-gray-500'>Need help or have questions?</p>
            <p className='text-gray-500'>You are more than welcomed to leave your contact info and we will be in touch shortly</p>
          </div>
          {/* Call Us */}
          <div>
            <h3 className='font-semibold text-xl'>Call</h3>
            <p className='text-gray-500'>Call us at <span className='underline cursor-pointer'>+61 434 412 800</span></p>
          </div>
          {/* Visit Us */}
          {/* <div>
            <h3 className='font-semibold text-xl'>Visit</h3>
            <p className='text-gray-500'>Visit us at <span className='underline cursor-pointer'>6 Montgomery Avenue, Mount Waverley, VIC 3149, Australia</span></p>
          </div> */}
          {/* Email */}
          {/* <div>
            <h3 className='font-semibold text-xl'>Email</h3>
            <p className='text-gray-500'>Send us an email at <span className='underline cursor-pointer'>dmh@decormyhouse.com.au</span> or via the form below</p>
          </div> */}
          {/* Email form */}
          <ContactForm />
          {/* Socials */}
          <div>
            <h3 className='font-semibold text-xl'>Socials</h3>
            <p className='text-gray-500'>Or reach us on our social media platforms below</p>
            <div className='flex items-center justify-center pt-4'>
              <Socials></Socials>
            </div>
          </div>
        </div>
      </Container>
    </div>
  </div>  )
}
