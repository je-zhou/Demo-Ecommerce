import { Variant } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface VariantSelectorProps {
  onChange: (variantId: string, valueId: string) => void;
  value: string;
  variant: Variant;
  variantId: string;
}

export default function VariantSelector({
  variant,
  variantId,
  value,
  onChange,
}: VariantSelectorProps) {
  const options = variant.values ? variant.values.map((vo) => vo.value) : [];

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-sm font-medium">{variant.name}</p>
      {/* Show tabs if less than 3 options */}
      {options.length < 4 ? (
        <Tabs
          onValueChange={(val) => onChange(variantId, val)}
          value={value}
          className="space-x-2 rounded h-auto max-w-fit border border-jet-400"
        >
          <TabsList>
            {options.map((option) => (
              <TabsTrigger
                className={
                  "rounded data-[state=active]:text-white data-[state=active]:bg-black h-auto"
                }
                key={option}
                value={option}
              >
                <div className="">{option}</div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      ) : (
        <Select value={value} onValueChange={(val) => onChange(variantId, val)}>
          <SelectTrigger className="w-full text-black rounded border-2 border-primary space-x-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="w-full text-black bg-black pr-6 pl-2 py-2 rounded">
            {options.map((option) => (
              <SelectItem value={option} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
