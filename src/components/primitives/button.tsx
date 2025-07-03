import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { ElementType, ComponentPropsWithoutRef } from 'react'
import { useLocale } from 'next-intl'

import { cn } from '@/lib/utils'

const buttonVariants = cva('rounded-full leading-4 font-medium', {
  variants: {
    variant: {
      primary:
        'btn-gradient-primary bg-black text-white hover:bg-[linear-gradient(90deg,_#0D0D0D_0%,_#3D3D3D_100%)] hover:shadow-[0px_12px_30px_0px_#A578F240] active:bg-none active:bg-primary-purple active:shadow-none disabled:pointer-events-none  disabled:bg-opacity-20 disabled:text-opacity-90 ',
      secondary:
        'btn-gradient-secondary bg-white backdrop-blur-[40px] text-black  hover:text-primary-purple hover:shadow-[0px_12px_40px_0px_#A578F240] hover:bg-[#F6F1FE]  active:text-[#8759D5] disabled:pointer-events-none  disabled:bg-opacity-30 disabled:text-opacity-40 disabled:text-white',
      purple:
        'btn-gradient-purple bg-primary-purple text-white hover:bg-secondary-purple hover:shadow-[0px_12px_30px_0px_#A578F240] active:bg-none active:bg-primary-purple active:shadow-none disabled:pointer-events-none  disabled:bg-opacity-20 disabled:text-opacity-90 '
    },
    size: {
      md: 'h-14 px-6 py-5',
      lg: 'h-16 px-8 py-5'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
})

type ButtonProps<T extends ElementType> = {
  as?: T
  asChild?: boolean
  className?: string
} & VariantProps<typeof buttonVariants> &
  ComponentPropsWithoutRef<T>

const Button = <T extends ElementType = 'button'>({
  as,
  asChild = false,
  className,
  variant,
  size,
  ...props
}: ButtonProps<T>) => {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const fontClass = isArabic ? 'font-kanun-ar' : 'font-poppins'

  const Component = as || (asChild ? Slot : 'button')

  return React.createElement(Component, {
    className: cn(buttonVariants({ variant, size }), fontClass, className),
    ...props
  })
}
Button.displayName = 'Button'

export { Button, buttonVariants }
