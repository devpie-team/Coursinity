import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Typography } from '@/components/ui'

type ExpandableCardProps = {
  title?: string
  description?: string
  icon?: React.ReactNode
  innerRef?: React.Ref<HTMLDivElement>
  isOpen?: boolean
  closedHeight: number
  openHeight: number
}

export const ExpandableCard = ({
  title,
  description,
  icon,
  innerRef,
  isOpen,
  closedHeight,
  openHeight
}: ExpandableCardProps) => {
  const [isReallyClosed, setIsReallyClosed] = useState(true)
  const [openPercent, setOpenPercent] = useState(0)
  const localRef = useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width <= 1024)
      setIsDesktop(width > 1024)
    }

    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const setRefs = (el: HTMLDivElement | null) => {
    if (typeof innerRef === 'function') innerRef(el)
    else if (innerRef) (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
    localRef.current = el
  }

  useEffect(() => {
    function update() {
      const node = localRef.current
      if (!node) return
      const percent = Math.max(0, Math.min(1, (node.offsetHeight - closedHeight) / (openHeight - closedHeight)))
      setOpenPercent(percent)
      setIsReallyClosed(node.offsetHeight <= 70)
    }
    update()

    const el = localRef.current
    if (el) {
      const ro = new window.ResizeObserver(update)
      ro.observe(el)
      return () => ro.disconnect()
    }
  }, [openHeight, closedHeight])

  return (
    <div
      ref={setRefs}
      className="overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.06)_0%,_rgba(30,141,194,0.06)_100%)] text-white px-6 !max-h-[170px] max-[1150px]:!max-h-[145px] max-lg:!max-h-[200px] max-md:!max-h-[180px]">
      {isReallyClosed && (
        <div className="flex flex-row items-center gap-6 h-[56px] card-closed">
          <div
            className="w-1 bg-white rounded-[40px] transition-all duration-300 "
            style={{
              opacity: 0.4 - openPercent * 10,
              height: `${24 - openPercent * 1000}px`
            }}
          />
          <Typography variant={isDesktop ? 'body1' : 'body2'} weight="medium">
            {title}
          </Typography>
        </div>
      )}

      {!isMobile && (
        <div className="flex flex-row items-start justify-between gap-4 p-7 pt-[13px] min-h-[100%] relative pr-20 max-lg:pr-14 max-md:pr-0 ">
          <div className="flex flex-col gap-4 items-start h-full">
            <Typography variant={isDesktop ? 'body1' : 'body2'} weight="medium" className="">
              {title}
            </Typography>

            <Typography
              variant={isDesktop ? 'body3' : 'caption'}
              className="transition-opacity duration-300 text-[#FFFFFFA3]"
              style={{ opacity: 0 + openPercent * 0.95 }}>
              {description}
            </Typography>
          </div>

          <div
            className="absolute flex bg-primary-blue bg-opacity-5 h-16 w-16 justify-center items-center rounded-full shrink-0 right-0 transition-opacity duration-300 max-lg:w-12 max-lg:h-12 translate-y-1/2"
            style={{ opacity: 0.3 + openPercent * 0.7 }}>
            {icon}
          </div>
        </div>
      )}
      {isMobile && (
        <div className="flex items-start  gap-4 p-7 pt-[13px] min-h-[100%] relative pr-20 max-ld:pr-17 max-md:pr-0 flex-col ">
          <div className="flex items-center justify-between w-full h-full gap-4">
            <Typography variant={isDesktop ? 'body1' : 'body2'} weight="medium" className="">
              {title}
            </Typography>
            <div
              className=" flex bg-primary-blue bg-opacity-5 h-16 w-16 justify-center items-center rounded-full shrink-0 right-0 transition-opacity duration-300 max-lg:w-12 max-lg:h-12 "
              style={{ opacity: 0.3 + openPercent * 0.7 }}>
              {icon}
            </div>
          </div>

          <Typography
            variant={isDesktop ? 'body3' : 'caption'}
            className="transition-opacity duration-300 text-[#FFFFFFA3]"
            style={{ opacity: 0 + openPercent * 0.95 }}>
            {description}
          </Typography>
        </div>
      )}
    </div>
  )
}
