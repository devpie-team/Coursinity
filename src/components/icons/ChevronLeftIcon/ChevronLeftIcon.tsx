type ChevronLeftIconProps = {
  className?: string
  stroke?: string
}

export const ChevronLeftIcon = ({ className = '', stroke = '' }: ChevronLeftIconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
