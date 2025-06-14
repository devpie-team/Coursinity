'use client'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

type ToggleLanguageProps = {
  value: boolean
  onToggle: (value: boolean) => void
}

const ToggleLanguage = ({ value, onToggle }: ToggleLanguageProps) => {
  const t = useTranslations('Header')

  const pathname = usePathname()
  const isArabicPath = pathname.startsWith('/ar')

  return (
    <div
      dir="ltr"
      onClick={() => onToggle(!value)}
      className="relative w-[108px] h-[56px] rounded-full border border-gray-300 bg-white flex items-center justify-between text-sm font-semibold cursor-pointer">
      <div
        className={
          isArabicPath
            ? 'flex justify-between pl-[20px] pr-[10px] w-full z-10'
            : 'flex justify-between px-[18px] w-full z-10'
        }>
        <span
          className={`text-base leading-6 font-medium transition-colors ${
            !isArabicPath && value ? 'text-black' : 'text-white'
          }`}>
          {t('en')}
        </span>
        <span
          className={`text-base leading-6 font-medium transition-colors ${
            !isArabicPath && value ? 'text-white' : 'text-black'
          }`}>
          {t('ar')}
        </span>
      </div>

      <div
        className={`
          absolute left-[3px] w-[48px] h-[48px] bg-black rounded-full transition-all duration-300
          ${value ? 'translate-x-[52px]' : 'translate-x-0'}
        `}
      />
    </div>
  )
}

export default ToggleLanguage
