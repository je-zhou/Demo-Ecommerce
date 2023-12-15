import Container from '@/components/Container'
import React from 'react'
import Image from "next/image"
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function AboutUs() {
  return (
    <div className='w-full min-h-screen bg-white p-12'>
    <div className='py-16 text-black flex space-y-4'>
      <Container>
        <div className='w-full'>
          <div className='w-full relative'>
            <AspectRatio ratio={3/2} className='w-full'>
              <Image className='rounded' src={"/assets/about_us.jpg"} alt='About Us' fill/>
            </AspectRatio>
          </div>
          <div className='py-8 lg:px-12'>
            <AboutUsSections
              title='Welcome to 021 - Your eCommerce Solution Hub'
              text='At 021, we specialize in delivering cutting-edge eCommerce solutions tailored to your unique business needs. Our team is dedicated to crafting visually stunning and highly functional websites that leave a lasting impression.'
            />
            <AboutUsSections
              title='Innovative Design for Brand Elevation'
              text='Our experts are committed to creating captivating, mobile-friendly interfaces that not only elevate your brand but also ensure a memorable online experience for your customers.'
            />
            <AboutUsSections
              title='Robust Development for Security and Scalability'
              text='Count on us for secure and scalable eCommerce platforms built with the latest technologies. We prioritize the development of robust solutions that meet the evolving needs of your business.'
            />
            <AboutUsSections
              title='User-Centric Approach for Conversion-Focused Experiences'
              text="Deep user research is at the core of our process. We go beyond aesthetics to ensure an engaging and conversion-focused experience for your audience, driving meaningful interactions."
            />
            <AboutUsSections
              title='Strategic Planning for Digital Success'
              text='Collaborate with us for strategic insights and comprehensive digital planning aligned with your business goals. We provide the expertise needed to navigate the dynamic digital landscape successfully.'
            />
          </div>
         </div>   
      </Container>
    </div>
  </div>  
  )
}

interface AboutUsSectionsProps {
  title: string
  text: string
} 

function AboutUsSections({title, text} : AboutUsSectionsProps){
  return <div className='py-4 space-y-2'>
    <h3 className='font-semibold text-2xl'>{title}</h3>
    <p className='text-lg'>{text}</p>
  </div>
}