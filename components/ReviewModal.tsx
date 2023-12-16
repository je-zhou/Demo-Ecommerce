"use client"

import React, { useState } from 'react'
import Modal from './ui/Modal'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Star } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import axios from 'axios'
import { Product } from '@/types'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface ReviewModalProps {
  isOpen: boolean,
  onClose: () => void
  product: Product
}

const formSchema = z.object({
  rating: z.number(),
  title: z.string().min(1),
  text: z.string().min(1),
  orderId: z.string(),
})

export default function ReviewModal({isOpen, onClose, product}: ReviewModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 5,
      title: "",
      text: "",
      orderId: "", 
    },
  })
   
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    setLoading(true)

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${product.id}`, values)

      router.refresh();
      toast.success("Review added");
      onClose();
    } catch (e) {
      toast.error("Something went wrong. Please try again later")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    
    >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='text-black flex flex-col space-y-8 w-full'>
        {/* Title */}
        <div>
          <h2 className='text-xl font-semibold'>
            Please leave a review!
          </h2>
          <p className='text-gray-500'>
            Tell us what you thought of this product.
          </p>
        </div>
        {/* Rating */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => {
            const ratings = []

            for (let i = 1; i<= 5; i++) {
              ratings.push(<Star
                key={i}
                className={cn('hover:cursor-pointer', field.value >= i ? "text-black " : "text-gray-300" )}
                onClick={() => field.onChange(i)}

              />)
            }

            return <FormItem className='w-full'>
            <FormLabel>Rating</FormLabel>
            <div className='flex flex-row space-x-2'>
              {ratings}
            </div>

            <FormMessage />
          </FormItem>
          }}
        />
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} className='rounded placeholder:text-gray-500'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Text */}
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea {...field} className='rounded placeholder:text-gray-500'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Order Id
        <FormField
          control={form.control}
          name="orderId"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Order Id</FormLabel>
              <FormControl>
                <Input {...field} className='rounded placeholder:text-gray-500'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <div className='flex justify-center'>
          <Button disabled={loading} type='submit' className='w-32 bg-black hover:bg-black text-white rounded'>Submit</Button>
        </div>

      </form>
    </Form>
    </Modal>
  )
}
