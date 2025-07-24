'use client'

import { useEffect, useState } from 'react'
import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import { FeaturedCheckIcon } from '../icons/FeaturedCheckIcon'
import { CloseIcon } from '../icons/CloseIcon'
import { useLocale } from 'next-intl'

type SuccessModalProps = {
  isOpen: boolean
  onClose: () => void
  message?: string
}

export const SuccessModal = ({ isOpen, onClose, message }: SuccessModalProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const locale = useLocale()
  const isArabic = locale == 'ar'

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'fixed bottom-2 z-[9999] transition-all duration-300 ease-in-out',
        isOpen ? 'translate-x-0 opacity-100' : isArabic ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0',
        isArabic ? 'left-2' : 'right-2'
      )}>
      <div className="flex w-[400px] h-[60px] border border-secondary-600 bg-white  py-3 px-2 pr-4 rounded-xl  items-center justify-between ">
        <div className="flex items-center gap-2">
          <FeaturedCheckIcon />
          <Typography variant="body3" weight="medium">
            {message}
          </Typography>
        </div>
        <button onClick={onClose}>
          <CloseIcon className="text-[#D0D5DD] hover:text-[#0D0D0D] transition-colors" />
        </button>
      </div>
    </div>
  )
}
