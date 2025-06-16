type DirectionDownIconProps = {
  className?: string
}

export const DirectionDownIcon = ({ className }: DirectionDownIconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10L12 14L17 10" stroke="#28303F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
