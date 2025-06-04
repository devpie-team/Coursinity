// RotatedCard.tsx
import { Typography } from '@/components/ui'
import { ReactNode, forwardRef } from 'react'

type TRotateCardProps = {
  rotation: string
  icon: ReactNode
  title: string
  subtitle: string
  id: number
  innerRef: (el: HTMLDivElement) => void
}

export const RotatedCard = forwardRef<HTMLDivElement, TRotateCardProps>(
  ({ title, icon, subtitle, rotation, id, innerRef }, ref) => (
    <div
      ref={innerRef}
      className="page text-white flex flex-col min-w-[400px] h-[400px] items-start gap-16 pt-6 pb-8 px-6 relative rounded-[20px] overflow-hidden border border-solid border-[#ffffff66] [background:linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(30,141,194,0.06)_100%)]"
      style={{ zIndex: id, marginLeft: id === 0 ? '10px' : '0px' }}>
      {icon}
      <div className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
        <Typography>{title}</Typography>
        <Typography className="text-[#FFFFFFA3]">{subtitle}</Typography>
      </div>
    </div>
  )
)

RotatedCard.displayName = 'RotatedCard'
