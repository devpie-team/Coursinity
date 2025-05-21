import React from 'react'

type ToggleLanguageProps = {
  value: boolean
  onToggle: (value: boolean) => void
}

const ToggleLanguage = ({ value, onToggle }: ToggleLanguageProps) => {
  return (
    <div
      onClick={() => onToggle(!value)}
      className="relative w-[108px] h-[56px] rounded-full border border-gray-300 bg-white flex items-center justify-between text-sm font-semibold cursor-pointer">
      <div className="flex justify-between px-[18px] w-full z-10">
        <span className={`text-base leading-6 font-medium transition-colors ${value ? 'text-black' : 'text-white'}`}>
          En
        </span>
        <span className={`text-base leading-6 font-medium transition-colors ${value ? 'text-white' : 'text-black'}`}>
          Ar
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
