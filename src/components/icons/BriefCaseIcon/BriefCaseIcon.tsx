type BriefCaseIconProps = {
  size?: number | string
  color?: string
}

export const BriefCaseIcon = ({ size = 40, color = 'white' }: BriefCaseIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.332 9.99967V8.33301C13.332 5.57158 15.5706 3.33301 18.332 3.33301H21.6654C24.4268 3.33301 26.6654 5.57158 26.6654 8.33301V9.99967M3.33203 17.2455C3.33203 17.2455 8.52877 20.7071 16.6281 21.5178M36.6654 17.2455C36.6654 17.2455 31.4686 20.7071 23.3693 21.5178M9.9987 36.6663H29.9987C33.6806 36.6663 36.6654 33.6816 36.6654 29.9997V16.6663C36.6654 12.9844 33.6806 9.99967 29.9987 9.99967H9.9987C6.3168 9.99967 3.33203 12.9844 3.33203 16.6663V29.9997C3.33203 33.6816 6.3168 36.6663 9.9987 36.6663Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.3346 20.2663V21.9329C23.3346 21.9496 23.3346 21.9496 23.3346 21.9663C23.3346 23.7829 23.318 25.2663 20.0013 25.2663C16.7013 25.2663 16.668 23.7996 16.668 21.9829V20.2663C16.668 18.5996 16.668 18.5996 18.3346 18.5996H21.668C23.3346 18.5996 23.3346 18.5996 23.3346 20.2663Z"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
