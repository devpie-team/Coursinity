'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { cn } from '@/lib/utils'
import TickIcon from '../icons/TickIcon'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'flex h-4 w-4 rounded-sm border border-secondary-400  disabled:pointer-events-none disabled:opacity-50 data-[state=checked]:bg-primary-blue data-[state=checked]:border-none focus:outline-none  transition-all duration-300',
      className
    )}
    {...props}>
    <CheckboxPrimitive.Indicator className={cn('text-current')}>
      <TickIcon />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
