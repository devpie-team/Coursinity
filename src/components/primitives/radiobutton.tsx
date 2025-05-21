import React from 'react'

type RadioButtonProps = {
  checked: boolean
  onChange: () => void
}

const RadioButton = ({ checked, onChange }: RadioButtonProps) => {
  return (
    <button
      onClick={onChange}
      className={`w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${
        checked ? 'bg-primary-blue border-primary-blue' : 'border-secondary-200'
      }`}>
      {checked && <div className="w-[6px] h-[6px] bg-white rounded-full" />}
    </button>
  )
}

export default RadioButton
