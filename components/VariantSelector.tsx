import { Variant } from '@/types';
import { Tabs, TabsList, TabsTrigger} from './ui/tabs';
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface VariantSelectorProps {
  onChange: (variantId: string, valueId: string) => void;
  value: string;
  variant: Variant;
}

export default function VariantSelector({variant, value, onChange}: VariantSelectorProps) {
  const options = variant.variantOptions.map((vo) => vo.name);
  
  return (
    <div className="flex flex-col space-y-4">
      <p className='text-sm font-medium'>{variant.name}</p>
      {/* Show tabs if less than 3 options */}
      {
        options.length < 3 ? 
          <Tabs 
            onValueChange={(val) => onChange(variant.id, val)} 
            value={value}
            className="space-x-2 bg-[#EEEEEE] rounded h-auto max-w-fit">
            <TabsList>
              {options.map((option) => <TabsTrigger
                className={"rounded data-[state=active]:text-white data-[state=active]:bg-[#FF6A6A] h-auto"}
                key={option}
                value={option}
              >
                <div className=''>
                  {option}  
                </div>
              </TabsTrigger>
              )}
            </TabsList>
          </Tabs> :
          <Select value={value} onValueChange={(val) => onChange(variant.id, val)}>
            <SelectTrigger className='w-full text-black rounded border-2 border-[#FF6A6A] space-x-2'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='w-full text-black bg-white pr-6 pl-2 py-2 rounded'>
              {options.map((option) => <SelectItem value={option} key={option}>
                {option}
              </SelectItem>)}
            </SelectContent>
          </Select>
      }

    </div>
  )
} 
