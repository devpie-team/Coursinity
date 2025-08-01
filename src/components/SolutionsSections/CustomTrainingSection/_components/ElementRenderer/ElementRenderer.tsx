'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import gsap from 'gsap'
import { TrainingCard } from '../Card/TrainingCard'

type ElementType = 'card' | 'img' | 'lottie'

type ElementConfig = {
  id: string
  type: ElementType
  src?: string
  alt?: string
  title?: string
  description?: string
  tags?: string[]
  className: string
  style?: React.CSSProperties
}

type ElementRendererProps = {
  el: ElementConfig
  animationData?: any
}

export const ElementRenderer = ({ el, animationData }: ElementRendererProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  const inView = useInView(containerRef, { amount: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const containerElement = containerRef.current

    gsap.fromTo(
      containerElement,
      { opacity: 1, scale: 0.6, transformOrigin: 'center center' },
      {
        opacity: inView ? 1 : 1,
        scale: inView ? 1 : 0.6,
        duration: 0.6,
        ease: 'power2.out'
      }
    )

    if (inView && el.type === 'lottie') {
      lottieRef.current?.stop()
      lottieRef.current?.play()
    }
  }, [inView, el.type])

  return (
    <div
      ref={containerRef}
      id={el.id}
      className={`${el.className} ${
        el.type === 'card' ? 'min-w-[440px] min-h-[370px] max-lg:min-w-[300px] max-lg:min-h-[280px]' : ''
      }`}
      style={{ ...el.style, opacity: 1, scale: 0.2 }}>
      {el.type === 'card' && (
        <TrainingCard title={el.title!} description={el.description!} tags={el.tags!} className="" />
      )}
      {el.type === 'img' && <img src={el.src!} alt={el.alt || el.id} className="w-full h-full object-contain" />}
      {el.type === 'lottie' && animationData && (
        <Lottie lottieRef={lottieRef} animationData={animationData} autoplay={false} loop={false} />
      )}
    </div>
  )
}
