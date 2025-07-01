type PlayCircleIconProps = {
  size?: number | string // можна передавати і 40, і '40px'
  className?: string // новий проп
}

export const PlayCircleIcon = ({ size = 40, className }: PlayCircleIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className} // передаємо клас
    >
      <path
        d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM15 25.34V14.66C15 13.08 16.76 12.12 18.08 12.98L26.38 18.32C27.6 19.1 27.6 20.9 26.38 21.68L18.08 27.02C16.76 27.88 15 26.92 15 25.34Z"
        fill="#FDFDFD"
        fillOpacity="0.22"
      />
      <path
        d="M20 0.5C30.7639 0.5 39.5 9.23614 39.5 20C39.5 30.7639 30.7639 39.5 20 39.5C9.23614 39.5 0.5 30.7639 0.5 20C0.500001 9.23614 9.23614 0.500001 20 0.5ZM18.3496 12.5596C16.6942 11.4843 14.5 12.6881 14.5 14.6602V25.3398C14.5 27.312 16.6942 28.5153 18.3496 27.4395L18.3506 27.4404L26.6484 22.1006L26.6494 22.1016C28.177 21.1249 28.177 18.8751 26.6494 17.8984H26.6484L18.3506 12.5596H18.3496Z"
        stroke="url(#paint0_linear_892_29744)"
        strokeOpacity="0.1"
      />
      <defs>
        <linearGradient id="paint0_linear_892_29744" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E2E2E2" />
          <stop offset="1" stopColor="#E2E2E2" stopOpacity="0.75" />
        </linearGradient>
      </defs>
    </svg>
  )
}
