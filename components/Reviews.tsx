"use client"

import { Product, Review } from '@/types'
import React, { useState } from 'react'
import { Button } from './ui/button'
import ReviewModal from './ReviewModal'
import { Star, StarHalf } from 'lucide-react'
import { getAverageRating } from '@/actions/getAverageRating'
import { Progress } from './ui/progress'

interface ReviewsProps {
  product: Product
}

export default function Reviews({product}: ReviewsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const avgRating = getAverageRating({reviews: product.reviews})

  return (
    <>
      <ReviewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={product}
      />
      <div className='space-y-8'>
        {/* Write a Review */}
        <Button 
          className='bg-black rounded text-white hover:bg-black'
          onClick={() => setIsOpen(true)}
        >
          Write a Review
        </Button>
        {/* Average Customer Rating */}
        <div className='space-y-2'>
          <p className='font-semibold'>Average Customer Rating</p>
          <div className='flex flex-row items-center space-x-2'>
            <p className='font-semibold'>{avgRating.toFixed(1)}</p>
            <div className='flex flex-row'>
              <RatingStars rating={avgRating}/>
            </div>
          </div>
        </div>
        {/* Rating Overview */}
        <div className='space-y-2'>
          <p className='font-semibold'>Rating Overview</p>
          <RatingOverview
            reviews={product.reviews}
          />
        </div>
        {/* Review List */}
        <div>
          {/* Sort By */}
          {/* <div className='flex flex-row space-x-1'>
            <p className='font-semibold text-gray-400'>Sort by</p>
            <p className='font-semibold underline'>most recent</p>
          </div> */}
          {/* Reviews */}
          <div className='flex flex-col py-8 space-y-4'>
            {
              product.reviews.map((r) => <ReviewTile key={r.id} review={r}/>)
            }
          </div>
        </div>
        
      </div>
    </>

  )
}

interface ReviewTileProps {
  review: Review
}

export function ReviewTile({review}: ReviewTileProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    let className = "text-gray-400 h-4 w-4"
    if (i <= review.rating) {
      className = "text-[#FF6A6A] h-4 w-4"
    }

    stars.push(<Star key={i} className={className}/>)
  }

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const date = new Date(Date.parse(review.updatedAt))
  const dateStr = `${months[date.getMonth()]} ${date.getFullYear()}`

  return (
    <div className='space-y-4'>
      <div className='flex justify-between'>
        <h4 className='font-semibold'>{review.title}</h4>
        <p className='font-semibold text-gray-400'>{dateStr}</p>
      </div>
      <div className='flex flex-row'>
        {stars}
      </div>
      <p>
        {review.text}
      </p>
    </div>
  )
}

export function RatingStars({rating} : {rating: number}) {

  const starComponent = []

  for (let i = 0; i < 5; i++) {
    let className = "text-gray-300 w-4 h-4"

    // Fully coloured
    if (i + 1 <= rating) {
      className = "text-black w-4 h-4"
      starComponent.push(<Star className={className}/>)

    } else if (i - rating > -1 && i - rating < 0) {
      starComponent.push(<div className='relative w-6'>
        <Star className='absolute text-gray-300 w-4 h-4'/>
        <StarHalf className=' absolute text-black bg-transparent w-4 h-4'/>
      </div>)
    } else {
      starComponent.push(<Star className={className}/>)
    }
  }

  return starComponent
}

export function RatingOverview({reviews}: {reviews: Review[]}) {
  const overviewRows = [];

  for (let i = 5; i > 0; i--) {
    const numOfIStarReviews = reviews.filter(r => r.rating === i).length;

    overviewRows.push(<div key={`${i} overview`} className='flex flex-row items-center space-x-4'>
      <div className='flex flex-row space-x-2 items-center'>
        <p className='font-semibold w-2'>{i}</p>
        <Star className="w-4 h-4"/>
      </div>
      <Progress
        className=' w-72 h-3'
        value={(numOfIStarReviews / reviews.length) * 100}
      />
      <p className='semibold text-gray-400'>{numOfIStarReviews}</p>
    </div>
    )
  }

  return <div className='flex flex-col'>
    {overviewRows}
  </div>
}