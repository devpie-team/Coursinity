import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const Icon = () => (
  <svg width="271" height="32" viewBox="0 0 271 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 16.1C0 7.44998 6.76999 1 15.49 1C20.7 1 25.91 3.85999 28.6 8.32999L23.13 12.38C21.34 9.64997 19.11 7.65997 15.5 7.65997C10.55 7.65997 7.29999 11.21 7.29999 16.09C7.29999 20.97 10.54 24.57 15.5 24.57C18.77 24.57 21.23 22.97 23.26 19.9L28.71 23.88C25.92 28.51 21.05 31.23 15.5 31.23C6.78 31.23 0.00997925 24.74 0.00997925 16.09"
      fill="#18233E"
    />
    <path
      d="M74.0907 1.14001V19.55C74.0907 22.75 76.1707 24.79 79.4107 24.79C82.6507 24.79 84.7507 22.78 84.7507 19.55V1.14001H91.8707V19.94C91.8707 26.77 87.1607 30.95 79.4107 30.95C71.6607 30.95 66.9707 26.9 66.9707 19.94V1.14001H74.0907Z"
      fill="#18233E"
    />
    <path
      d="M97.0996 30.51V1.14001H111.94C117.48 1.14001 121.98 5.05999 121.98 10.68C121.98 14.88 119.62 18.1 116.2 19.55L122.34 30.54H114.66L109.1 20.4H104.19V30.52H97.0996V30.51ZM104.2 14.33H110.41C113.09 14.33 114.69 12.75 114.69 10.68C114.69 8.72999 113.11 7.20001 110.41 7.20001H104.2V14.34V14.33Z"
      fill="#18233E"
    />
    <path
      d="M130.33 20.3C132 22.9 134.74 24.52 137.6 24.52C139.91 24.52 141.82 23.59 141.82 22.25C141.82 20.37 139.33 19.81 135.81 18.75C130.55 17.17 125.77 15.48 125.77 9.46997C125.77 4.05997 131.05 0.709961 136.43 0.709961C141.81 0.709961 145.38 3.19998 147.98 6.97998L142.72 10.85C141.42 8.98998 139.28 6.95996 136.43 6.95996C134.38 6.95996 132.95 7.92997 132.95 9.33997C132.95 11.29 135.2 11.63 138.38 12.69C145.02 14.9 149 16.65 149 22.01C149 28.13 143.03 30.94 137.43 30.94C132.15 30.94 127.2 28.6 124.99 24.19L130.33 20.3Z"
      fill="#18233E"
    />
    <path d="M161.28 1.14001H154.16V30.51H161.28V1.14001Z" fill="#18233E" />
    <path
      d="M166.5 30.51V1.14001H172.56L187.35 19.05V1.14001H194.47V30.51H188.3L173.62 12.77V30.51H166.5Z"
      fill="#18233E"
    />
    <path d="M206.819 1.14001H199.699V30.51H206.819V1.14001Z" fill="#18233E" />
    <path d="M212.039 1.14001H236.509V7.26001H227.829V30.51H220.739V7.26001H212.039V1.14001Z" fill="#18233E" />
    <path
      d="M248.54 1.14001L255.33 12.34L262.23 1.14001H270.56L258.79 19.59V30.51H251.67V19.59L239.82 1.14001H248.54Z"
      fill="#18233E"
    />
    <path
      d="M46.8105 0.699951C38.3105 0.699951 31.4805 7.31993 31.4805 15.7999C31.4805 24.2799 38.5105 30.9399 46.8105 30.9399C55.5305 30.9399 62.1705 24.0399 62.1705 15.7999C62.1705 7.55993 55.3105 0.699951 46.8105 0.699951ZM41.8105 23.7V8.05994L55.3604 15.8799L41.8105 23.7Z"
      fill="#1C8DC1"
    />
  </svg>
)

type TLoading = {
  loading?: boolean
}

export const Loader = ({ loading }: TLoading) => {
  const maskRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const topBlockRef = useRef<HTMLDivElement>(null)
  const bottomBlockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loading && maskRef.current && iconRef.current && topBlockRef.current && bottomBlockRef.current) {
      // wipe mask
      gsap.fromTo(
        maskRef.current,
        { x: '0%' },
        {
          x: '100%',
          duration: 3,
          ease: 'linear',
          onComplete: () => {
            // fade out icon
            gsap.to(iconRef.current, {
              opacity: 0,
              duration: 1,
              ease: 'power2.out',
              onComplete: () => {
                // open collage
                gsap.to(topBlockRef.current, {
                  y: '-100%',
                  duration: 1,
                  ease: 'power2.inOut'
                })
                gsap.to(bottomBlockRef.current, {
                  y: '100%',
                  duration: 1,
                  ease: 'power2.inOut'
                })
              }
            })
          }
        }
      )

      gsap.set(iconRef.current, { opacity: 1 })
      gsap.set(topBlockRef.current, { y: '0%' })
      gsap.set(bottomBlockRef.current, { y: '0%' })
    } else if (maskRef.current && iconRef.current && topBlockRef.current && bottomBlockRef.current) {
      gsap.set(maskRef.current, { x: '0%' })
      gsap.set(iconRef.current, { opacity: 1 })
      gsap.set(topBlockRef.current, { y: '0%' })
      gsap.set(bottomBlockRef.current, { y: '0%' })
    }
  }, [loading])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center "
      style={{ pointerEvents: 'all', opacity: loading ? 1 : 0, transition: 'opacity 0.7s' }}>
      {/* Блоки, которые открывают коллаж */}
      <div
        ref={topBlockRef}
        className="fixed top-0 left-0 w-full h-[50vh] z-20"
        style={{
          background: "url('/collage-top.jpg') center/cover, #fff", // или любой бэкграунд
          willChange: 'transform'
        }}
      />
      <div
        ref={bottomBlockRef}
        className="fixed bottom-0 left-0 w-full h-[50vh] z-20"
        style={{
          background: "url('/collage-bottom.jpg') center/cover, #fff", // или любой бэкграунд
          willChange: 'transform'
        }}
      />

      {/* Иконка посередине */}
      <div ref={iconRef} className="relative z-30">
        <Icon />
        <div
          ref={maskRef}
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to right, white 0%, transparent 85%)',
            opacity: 0.8,
            mixBlendMode: 'lighten',
            transition: 'none'
          }}
        />
      </div>
    </div>
  )
}
