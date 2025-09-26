import * as React from 'react'
import { cn } from '@/lib/utils'
import { SearchIcon } from '../icons/SearchIcon/SearchIcon'

type Props = {
  label?: string
  errorMessage?: string
  isError?: boolean
  divClassName?: string
  search?: boolean
  isArabic?: boolean
} & React.ComponentProps<'input'>

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    { className, label, errorMessage, isError, type, required = true, divClassName, search, isArabic, ...props },
    ref
  ) => {
    return (
      <div className={cn('flex flex-col', divClassName)}>
        {required ? (
          <p className="text-sm font-medium mb-[6px]">
            {label}
            <span className="text-[#7662E8] ml-[2px]">*</span>
          </p>
        ) : null}

        <div className="relative w-full">
          {search && (
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400',
                isArabic ? 'right-4' : 'left-4'
              )}>
              <SearchIcon />
            </div>
          )}
          <input
            type={type}
            className={cn(
              'w-full flex focus:outline-none h-15 text-md rounded-2xl border bg-white py-[18px] placeholder:text-opacity-60 disabled:pointer-events-none disabled:opacity-50 hover:border-black focus:border-black transition-all duration-300',
              search ? (!isArabic ? 'pl-12 pr-5' : 'pr-12 pl-5') : 'px-5',
              isError ? 'border-[#D92D20]' : 'border-secondary-400',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>

        {errorMessage ? <p className="text-sm text-[#D92D20] mt-2">{errorMessage}</p> : null}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
