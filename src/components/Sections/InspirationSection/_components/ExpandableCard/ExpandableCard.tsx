import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Typography } from '@/components/ui'

type ExpandableCardProps = {
  title?: string
  description?: string
  icon?: React.ReactNode
  innerRef?: React.Ref<HTMLDivElement>
  isOpen?: boolean
}

export const ExpandableCard = ({ title, description, icon, innerRef, isOpen }: ExpandableCardProps) => {
  const [isReallyClosed, setIsReallyClosed] = useState(true)
  const localRef = useRef<HTMLDivElement | null>(null)

  // Для прокидування ref зовні + локально
  const setRefs = (el: HTMLDivElement | null) => {
    if (typeof innerRef === 'function') innerRef(el)
    else if (innerRef) (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
    localRef.current = el
  }

  useEffect(() => {
    // Слухаємо зміни height
    function update() {
      const node = localRef.current
      if (!node) return
      setIsReallyClosed(node.offsetHeight <= 70)
    }
    update()

    const el = localRef.current
    if (el) {
      const ro = new window.ResizeObserver(update)
      ro.observe(el)
      return () => ro.disconnect()
    }
  }, [])

  return (
    <div
      ref={setRefs}
      className="overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.06)_0%,_rgba(30,141,194,0.06)_100%)] text-white px-6">
      {isReallyClosed && (
        <div className="flex flex-row items-center gap-6 h-[56px] card-closed">
          <div className="w-1 h-6 bg-white opacity-40 rounded-[40px]" />
          <Typography variant="body1" weight="medium">
            {title}
          </Typography>
        </div>
      )}
      {/* завжди показуємо open-контент, якщо isOpen */}

      <div className="flex flex-row items-start justify-between gap-4 p-4 pt-3">
        <div className="flex flex-col gap-4 ">
          <Typography variant="body1" weight="medium" className="pl-3">
            {title}
          </Typography>

          <div className="opacity-65 mt-2">{description}</div>
        </div>

        <div className="flex bg-primary-blue bg-opacity-5 h-20 w-20 justify-center items-center rounded-full mb-2 shrink-0">
          {icon}
        </div>
      </div>
    </div>
  )
}
