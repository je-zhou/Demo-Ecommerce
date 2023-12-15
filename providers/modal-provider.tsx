"use client"

import PreviewModal from '@/components/PreviewModal'
import React, { useEffect, useState } from 'react'

export default function ModalProvider() {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(()=> {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null;

  return (
    <>
      <PreviewModal/>
    </>
  )
}
