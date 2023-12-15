import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react'
import React from 'react'

interface QuantityProps{
  value: number,
  onAdd: () => void,
  onSubtract: () => void,
  size: "medium" | "small"
}

export default function Quantity({value, onAdd, onSubtract, size}: QuantityProps) {
  function minus(){
    if (value > 1) {
      onSubtract()
    }
  }

  function plus() {
    onAdd();
  }

  return (
    <div className={
      cn("border select-none border-gray-400 rounded flex items-center justify-between px-2",
      size === "small" ? "h-8 w-24": "h-12 w-32") 
      }>
      <Minus className={cn('hover:cursor-pointer', 
        size === "small" ? "h-4 w-4": ""
      )} onClick={minus}/>
      <p className={cn('font-bold', 
        size === "small" ? "text-sm": "text-xl"
      )}>{value}</p>
      <Plus className={cn('hover:cursor-pointer', 
        size === "small" ? "h-4 w-4": ""
      )} onClick={plus}/> 
    </div>
  )
}
