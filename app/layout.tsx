import Footer from '@/components/Footer/Footer'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import { cn } from '@/lib/utils'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'

const inter = Inter({weight: ["300","400","500","600","700","800"], subsets:['latin']})

export const metadata: Metadata = {
  title: '021 - Demo Ecommerce',
  description: 'Demo Ecommerce storefront powerered by 021 Commerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("text-white min-h-screen ", inter.className)}>
        <ModalProvider/>
        <ToastProvider/>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
