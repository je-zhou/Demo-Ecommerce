"use client"

import React from 'react'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
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

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
})

export default function ContactForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })
   
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col items-center">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className='rounded placeholder:text-gray-500'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} className='rounded placeholder:text-gray-500'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} className='rounded placeholder:text-gray-500'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='pt-4'>
          <Button className='bg-[#FF6A6A] text-white rounded hover:bg-[#FF6A6A] w-40' type="submit">Submit</Button>

        </div>
      </form>
    </Form>
  )
}
