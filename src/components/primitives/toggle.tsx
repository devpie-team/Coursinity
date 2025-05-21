import React from 'react'

type ToggleProps = {
  value: boolean 
  onToggle: (value: boolean) => void
}

const Toggle = ({ value, onToggle }: ToggleProps) => {
  return (
    <div className="relative w-[108px] h-[56px] rounded-full border border-gray-300 bg-white flex items-center justify-between  text-sm font-semibold">
      
      <div className="flex justify-between px-[18px] w-full">
        <span
          className={`text-base leading-6 font-medium z-10 transition-colors ${value ? 'text-black' : 'text-white'}`}>
          En
        </span>
        <span
          className={`text-base leading-6 font-medium z-10 transition-colors ${value ? 'text-white' : 'text-black'}`}>
          Ar
        </span>
      </div>

    
      <div
        className={`
          absolute left-[3px] w-[48px] h-[48px] bg-black rounded-full transition-all duration-300
          ${value ? 'translate-x-[52px]' : 'translate-x-0'}
        `}
      />

     
      <div className="absolute inset-0 z-20 flex">
        <button className="flex-1" onClick={() => onToggle(false)} />
        <button className="flex-1" onClick={() => onToggle(true)} />
      </div>
    </div>
  )
}

export default Toggle
