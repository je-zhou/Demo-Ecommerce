import { Variant } from "@/types";
import { Slider } from "./ui/slider";

interface VariantSliderProps {
  onChange: (varId: string, value: string) => void;
  value: string;
  variant: Variant;
  variantId: string
}

export function VariantSlider({variantId, variant, value, onChange}: VariantSliderProps) {

  return (
    <div className="flex flex-col space-y-4 w-full">
      <p className='text-sm font-medium'>{`${variant.name} (${value ? value : variant.inputStart ?? "0"} cm)`}</p>
      <Slider 
        className="max-w-[120px]"
        defaultValue={[variant.inputStart ?? 0]}
        onValueChange={(c) => onChange(variantId, c[0].toString()) }
        min={variant.inputStart ?? 50}
        max={variant.inputEnd ?? 300} 
      />
    </div>
  )
} 
