import React, { MouseEventHandler } from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string
}

export default function IconButton({onClick, icon, className}: IconButtonProps) {
  return (
    <Button 
      onClick={onClick} 
      className={cn('rounded-full flex items-center justify-center bg-gray-200 border hover:bg-white hover:scale-110 transition',
      className
      )}
    >
      {icon}
    </Button>
  )
}
