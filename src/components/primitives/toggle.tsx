import React from 'react'

type ToggleProps = {
  value: boolean
  onToggle: (value: boolean) => void
}

const Toggle = ({ value, onToggle }: ToggleProps) => {
  return (
    <div
      onClick={() => onToggle(!value)}
      className={`relative w-9 h-5 rounded-full flex items-center transition-colors duration-300 cursor-pointer ${
        value ? 'bg-primary-blue' : 'bg-secondary-200'
      }`}>
      <div
        className={`
      absolute left-[2px] w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-[0px_1px_3px_0px_#1018281A]  
      ${value ? 'translate-x-[16px]' : 'translate-x-0'}
    `}
      />
    </div>
  )
}

export default Toggle
