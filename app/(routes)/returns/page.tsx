import Container from '@/components/Container'
import Link from 'next/link'
import React from 'react'

export default function Returns() {
  return (
    <div className='w-full min-h-screen bg-white p-12'>
    <div className='py-16 text-black flex space-y-4'>
      <Container>
        <div className='space-y-4'>
          {/* Title */}
          <div className='space-y-2'>
            <h3 className='font-semibold text-2xl'>Returns and Refunds</h3>
            <p className='text-gray-500'>We offer a 14-Day Money Back Guarantee </p>
          </div>
          <div className='space-y-2'>
            <h3 className='font-semibold text-xl'>Terms & Conditions</h3>
            <div className='space-y-6'>
              <p className='text-gray-500'>If, for any reason, a customer is unsatisfied with their purchase, please contact us within 14 days of delivery to organize the product product and receive a refund for purchase price, subject to the terms and conditions listed below:</p>
              <ul className='space-y-2 text-gray-500 pl-4'>
                <li className='list-item'>○ In order to apply a refund, the customer must notify us with a refund request within 14 days of taking delivery of the product.</li>
                <li className='list-item'>○ The products must be returned within 14 days.</li>
                <li className='list-item'>○ Shipping for product returns are to be incured at your own cost.</li>
                <li className='list-item'>○ An acceptable reason must be supplied for a return. This includes but is not limited to: product damaged during the delivery, product size has more than a 5 cm error, or product delivered differs from what was ordered.</li>
              </ul>
              <p className='text-gray-500'>After receiving the returned application, we will issue a refund as soon as is reasonably practicable, and the customer will be provided with e-mail acknowledgement. Where possible, refunds will be processed by reversing the initial customer transaction. We accepts no responsibility for any delays that may occur in receiving the refund as a result of any third-party payment gateway.</p>
              <p className='text-gray-500'><span className='font-bold'>NOTE: Made-to-Measure</span> items (this includes Custom-Made Curtains, Sheers, Tracks and Roller Blinds) cannot be returned for change of mind, incorrect measuring, or incorrect colour choice. We suggest you think about it before ordering.</p>
              <p className='text-gray-500'> We reserves the right to make changes to the 14-Day Money Back Guarantee Terms and Conditions without notice. </p>
            </div>
            
          </div>
        </div>
      </Container>
    </div>
  </div>  
  )
}