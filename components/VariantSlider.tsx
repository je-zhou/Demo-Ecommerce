"use client";

import { Variant } from "@/types";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { useState } from "react";

interface VariantSliderProps {
  onChange: (varId: string, value: string) => void;
  setValidSlider: (validSldier: boolean) => void;
  value: string;
  variant: Variant;
  variantId: string;
}

export function VariantSlider({
  variantId,
  variant,
  value,
  onChange,
  setValidSlider,
}: VariantSliderProps) {
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  return (
    <div className="flex flex-col space-y-4 w-full">
      <p className="text-sm font-medium">{variant.name}</p>
      <div className="flex flex-row space-x-4">
        <Slider
          className="max-w-[120px]"
          defaultValue={[variant.inputRangeLow ?? 0]}
          onValueChange={(c) => onChange(variantId, c[0].toString())}
          min={variant.inputRangeLow ?? 50}
          max={variant.inputRangeHigh ?? 300}
        />
        <div className="flex flex-row space-x-2 items-center">
          <Input
            className="border-gray-200 rounded w-16 h-fit p-2 text-xs"
            value={value}
            onChange={(v) => {
              // Check is number
              let num = Number(v.target.value);
              if (v.target.value === "") num = 0;
              if (num || num === 0) {
                onChange(variantId, num.toString());
                setErrorMsg(undefined);
                setValidSlider(true);

                const withinMin = variant.inputRangeLow
                  ? num >= variant.inputRangeLow
                  : true;
                const withinMax = variant.inputRangeHigh
                  ? num <= variant.inputRangeHigh
                  : true;

                if (!withinMin) {
                  setErrorMsg(
                    `Please enter a number greater than ${variant.inputRangeLow}`
                  );
                  setValidSlider(false);
                }
                if (!withinMax) {
                  setErrorMsg(
                    `Please enter a number lower than ${variant.inputRangeHigh}`
                  );
                  setValidSlider(false);
                }
              }
            }}
          />
          <p className="text-xs">cm</p>
        </div>
      </div>
      {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
    </div>
  );
}
