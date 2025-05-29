import { cn } from '@/lib/utils'
import { space } from 'postcss/lib/list'

type ExpandableCardProps = {
  title: string
  description?: string
  icon?: React.ReactNode
  isOpen?: boolean
  onClick?: () => void
}

export const ExpandableCard = ({ title, description, icon, isOpen = false, onClick }: ExpandableCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col bg-[linear-gradient(180deg,_rgba(255,255,255,0.06)_0%,_rgba(30,141,194,0.06)_100%)] text-white rounded-[20px] px-6 py-4 ',
        isOpen && ''
      )}
      onClick={onClick}>
      <div className="flex flex-col  ">
        <div className={cn('flex flex-row gap-6', isOpen && 'gap-8 flex-col')}>
          {isOpen && icon && (
            <span className="flex bg-primary-blue bg-opacity-5 h-20 w-20 justify-center items-center rounded-full">
              {icon}
            </span>
          )}
          {!isOpen && <div className="w-1 h-6 bg-white opacity-40 rounded-[40px]"></div>}
          <span className={cn(isOpen && 'mb-4')}>{title}</span>
        </div>

        <div
          className={cn(
            '  duration-300 ease-out ',
            isOpen ? 'opacity-65 h-full transition-all ' : 'opacity-0 h-0 transition-none'
          )}>
          {description}
        </div>
      </div>
    </div>
  )
}
