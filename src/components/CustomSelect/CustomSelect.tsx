'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'

type Option = {
  value: string
  label: string
}

type CustomSelectProps = {
  value?: string
  onChange?: (value: string) => void
  options: Option[]
  placeholder?: string
  label?: string
  className?: string
  isError?: boolean
  errorMessage?: string
}

export const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  className,
  isError = false,
  errorMessage
}: CustomSelectProps) => {
  return (
    <div className="flex flex-col">
      {label && (
        <Typography variant="caption" weight="medium" className="mb-[6px]">
          {label}
          <span className="text-[#7662E8] ml-[2px]">*</span>
        </Typography>
      )}

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            'w-full border disabled:pointer-events-none disabled:opacity-50 hover:border-description focus:border-black focus:outline-none',
            'relative h-[60px] px-5 py-[18px] rounded-2xl',
            '[&_[data-placeholder]]:text-description transition-all duration-300', // ← це і є рішення
            isError ? 'border-[#D92D20]' : 'border-secondary-400',
            className
          )}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isError && errorMessage && <p className="text-sm text-[#D92D20] mt-2">{errorMessage}</p>}
    </div>
  )
}

export default CustomSelect
