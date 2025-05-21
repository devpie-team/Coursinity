import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type TooltipCustomProps = {
  children: ReactNode
  content: string
  variant?: 'dark' | 'light'
}

export const TooltipCustom = ({ children, content, variant = 'dark' }: TooltipCustomProps) => {
  const isDark = variant === 'dark'

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side="top"
          sideOffset={10}
          className={cn(
            'relative rounded-lg px-3 py-2 text-sm font-semibold shadow-lg',
            isDark ? 'bg-black text-white' : 'bg-white text-black'
          )}>
          {content}

          <div
            className={cn(
              'absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-0 h-0 border-x-8 border-x-transparent border-t-8',
              isDark ? 'border-t-black' : 'border-t-white'
            )}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipCustom
