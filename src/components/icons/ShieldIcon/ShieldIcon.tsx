export const ShieldIcon = ({ size = 'big' }: { size?: 'big' | 'small' }) => {
  return size == 'big' ? (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 24L22.2528 27.4023C22.6707 27.7366 23.2777 27.6826 23.6301 27.2799L30 20"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22.3754 4.72202L8.37762 10.9433C6.932 11.5858 5.99252 13.0285 6.03305 14.61C6.42112 29.7533 10.3031 35.275 21.9184 42.6982C23.1848 43.5075 24.8165 43.5092 26.0832 42.7002C37.7657 35.2395 41.4641 29.6018 41.9479 14.6309C41.9994 13.0387 41.0583 11.5814 39.6026 10.9345L25.6246 4.72202C24.5903 4.26235 23.4097 4.26235 22.3754 4.72202Z"
        stroke="white"
        stroke-width="2"
        stroke-linejoin="round"
      />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 12L10.7528 13.4023C11.1707 13.7366 11.7777 13.6826 12.1301 13.2799L15 10"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.3754 2.72202L5.37762 4.94328C3.932 5.58578 2.97801 7.02462 3.07 8.60391C3.42963 14.7781 5.23768 17.4963 9.9358 20.677C11.1804 21.5196 12.821 21.5216 14.0646 20.6777C18.7772 17.4797 20.5206 14.7231 20.9118 8.6253C21.0138 7.03557 20.0583 5.58145 18.6026 4.93447L13.6246 2.72202C12.5903 2.26235 11.4097 2.26235 10.3754 2.72202Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  )
}
