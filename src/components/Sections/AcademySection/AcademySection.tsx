import { useEffect, useRef } from 'react'
import Lottie from 'lottie-web'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Typography } from '@/components/ui'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/primitives/button'

gsap.registerPlugin(ScrollTrigger)

function LottieScrollTrigger(vars: any) {
  let target = gsap.utils.toArray(vars.target)[0] as Element,
    animation: any = Lottie.loadAnimation({
      container: target,
      renderer: vars.renderer || 'svg',
      loop: false,
      autoplay: false,
      path: vars.path,
      rendererSettings: vars.rendererSettings || {
        preserveAspectRatio: 'xMidYMid slice'
      }
    })

  animation.addEventListener('DOMLoaded', function () {
    let hasPlayed = false
    let isPlaying = false
    
    animation.addEventListener('complete', () => {
      hasPlayed = true
      isPlaying = false
    })

    animation.addEventListener('play', () => {
      isPlaying = true
    })

    animation.addEventListener('pause', () => {
      isPlaying = false
    })

    ScrollTrigger.create({
      trigger: target,
      start: 'top center',
      onEnter: () => {
        if (!hasPlayed && !isPlaying) {
          animation.play()
        }
      },
      onLeave: () => {
        if (isPlaying && !hasPlayed) {
          animation.pause()
        }
      },
      onEnterBack: () => {
        if (hasPlayed) {
          hasPlayed = false
          animation.goToAndPlay(0)
        } else if (!isPlaying) {
          animation.play()
        }
      },
      onLeaveBack: () => {
        if (isPlaying && !hasPlayed) {
          animation.pause()
        } else if (hasPlayed) {
          hasPlayed = false
          animation.goToAndStop(0)
        }
      }
    })
  })

  return animation
}

export const AcademySection = () => {
  const t = useTranslations('AcademySection')
  const animationContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animationContainerRef.current) return

    const animation = LottieScrollTrigger({
      target: animationContainerRef.current,
      path: '/assets/lottie/academic/academic.json'
    })

    return () => {
      if (animation && animation.destroy) {
        animation.destroy()
      }
    }
  }, [])

  return (
    <section className="bg-white py-[140px] flex justify-center items-center flex-col gap-12">
      <div className="flex flex-col gap-4 text-center">
        <Typography weight="medium" variant="h3">
          {t('title')}
        </Typography>
        <Typography variant="body3" weight="regular" className="text-description">
          {t('description')}
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-8">
        <div ref={animationContainerRef} className="w-full h-[900px] max-lg:h-[600px] max-md:h-[400px]" />
        <Button variant="purple">{t('button')}</Button>
      </div>
    </section>
  )
}
