import * as React from 'react'

import { cn } from '@/lib/utils'

type Props = {
  label?: string
  errorMessage?: string
  isError?: boolean
} & React.ComponentProps<'input'>

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, errorMessage, isError, type, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <p className="text-sm font-medium mb-[6px]">
          {label}
          <span className="text-[#7662E8] ml-[2px]">*</span>
        </p>
        <input
          type={type}
          className={cn(
            'w-full flex focus:outline-none h-15  text-md rounded-2xl border  bg-white px-5 py-[18px]   placeholder:text-opacity-60  disabled:pointer-events-none disabled:opacity-50 hover:border-black focus:border-black transition-all duration-300',
            isError ? 'border-[#D92D20]' : 'border-secondary-400',
            className
          )}
          ref={ref}
          {...props}
        />
        <p className="text-sm text-[#D92D20] mt-2">{errorMessage}</p>
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
