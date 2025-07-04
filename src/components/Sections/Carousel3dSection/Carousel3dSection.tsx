'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocale, useTranslations } from 'use-intl'

import { SceneContent } from './_components/SceneContent/SceneContent'
import { useHeaderVisibility } from '@/components/Header/HeaderVisibilityContext'
import { Torus } from './_components/Torus/Torus'
import { Typography } from '@/components/ui/Typography/Typography'
import { start } from 'repl'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const slidesData = [
  { text: { en: 'AI Transformation', ar: 'تبنّي الذكاء الاصطناعي' }, colors: ['#5a5a9e', '#535157', '#4a5568'] },
  { text: { en: 'Activity-Based Training', ar: 'سيناريوهات تدريب واقعية' }, colors: ['#5a5a9e', '#2c2a33', '#4a5568'] },
  { text: { en: 'Meta Verse & VR', ar: 'ميتاڤيرس وواقع افتراضي' }, colors: ['#5a5a9e', '#2c2a33', '#4a5568'] },
  { text: { en: 'Customised Learning Journeys', ar: 'رحلات تدريبية' }, colors: ['#5a5a9e', '#2c2a33', '#4a5568'] },
  { text: { en: 'Data Driven Tracking', ar: 'عائد ببيانات وتقارير' }, colors: ['#5a5a9e', '#2c2a33', '#4a5568'] }
]

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])
  return matches
}

export function Carousel3dSection() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const locale = useLocale()
  const pinSectionRef = useRef<HTMLDivElement>(null)
  const scrollProxy = useRef({ value: 0 })
  const [dpr, setDpr] = useState(isMobile ? 1 : 1.5)
  const t = useTranslations('Carousel3d')

  useEffect(() => {
    if (!pinSectionRef.current) return

    const totalScrollDuration = slidesData.length
    const startCurtainDuration = 1
    const endCurtainDuration = 1
    const totalVh = (totalScrollDuration + startCurtainDuration + endCurtainDuration) * 100

    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: `+=${totalVh}%`
          }
        })

        /* tl.fromTo('#canvas-container', { opacity: 0 }, { opacity: 1, ease: 'power1.in', duration: startCurtainDuration }) */

        .to(scrollProxy.current, { value: slidesData.length - 1, ease: 'none', duration: totalScrollDuration }, '>')
      /*  .to('#canvas-container', { opacity: 0, ease: 'power1.out', duration: endCurtainDuration }, '>') */
    }, pinSectionRef)

    return () => ctx.revert()
  }, [slidesData.length])

  const { hideHeaderForSection, showHeaderForSection } = useHeaderVisibility()
  const sectionId = useRef(Math.random()?.toString())

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) hideHeaderForSection(sectionId.current)
        else showHeaderForSection(sectionId.current)
      },
      { threshold: 0.1 }
    )
    const currentRef = pinSectionRef.current
    if (currentRef) observer.observe(currentRef)
    return () => {
      if (currentRef) observer.unobserve(currentRef)
      showHeaderForSection(sectionId.current)
    }
  }, [hideHeaderForSection, showHeaderForSection])

  return (
    <div ref={pinSectionRef} className="relative h-screen w-full overflow-hidden bg-[#0D0D0D]">
      {/* <div id="curtain-start" className="absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#0D0D0D]">
        ...
      </div> */}

      <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
        <div id="canvas-container" className="relative h-full w-full">
          <div className="absolute inset-0 z-10 flex items-end pl-4 pb-14 max-md:pb-0 max-md:pl-0 pointer-events-none">
            <div className="flex flex-col text-white text-start max-w-[600px] gap-6 p-6 max-md:gap-2 max-md:bg-gradient-to-t max-md:from-black/70 max-md:w-full max-md:pt-3 max-md:backdrop-blur-[2px]">
              {/*  <Typography variant="body1" weight="medium">
                {t('title')}
              </Typography> */}
              <div className="flex flex-col gap-4 text-[#A578F2] max-md:gap-2 max-md:pb-[80px]">
                {['point1', 'point2', 'point3', 'point4', 'point5'].map((key) => (
                  <Typography
                    key={key}
                    variant={isMobile ? 'body3' : 'body2'}
                    className="hover:text-white transition-all duration-300 pointer-events-auto cursor-pointer"
                    as="a">
                    –{'>'} {t(key)}
                  </Typography>
                ))}
              </div>
            </div>
          </div>

          <Canvas
            shadows
            dpr={dpr}
            camera={{ position: [0, -0.1, isMobile ? 1.4 : 1.65], fov: isMobile ? 75 : 70 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <PerformanceMonitor
              onIncline={() => setDpr(isMobile ? 1.5 : 2)}
              onDecline={() => setDpr(isMobile ? 0.8 : 1)}>
              {/*  <OrbitControls rotateSpeed={0.5} /> */}
              <SceneContent
                isMobile={isMobile}
                scrollProgressRef={scrollProxy}
                slidesData={slidesData}
                locale={locale}
                textOpacityFadePower={4}
                textFadeStartDistance={0}
                textFadeEndDistance={1}
                waveFrequency={10.0}
                waveSpeed={5.0}
                waveDecay={1}
                rippleOpacity={0.4}
                rippleEmissiveIntensity={0.02}
              />
              {/*   <EffectComposer>
                <Bloom intensity={1.5} luminanceThreshold={0.1} luminanceSmoothing={0.025} radius={0.8} mipmapBlur />
              </EffectComposer> */}
            </PerformanceMonitor>
            {!isMobile && (
              <Torus
                position={[0, -0.2, -0.9]}
                rotation={[Math.PI, 0, 0]}
                scrollProgressRef={scrollProxy}
                animationSpeed={0.0002}
                scrollSpeed={0.8}
                showHalfTorus={true}
                startAngle={-0.1}
              />
            )}
            {!isMobile && (
              <Torus
                position={[0, -0.9, -0.9]}
                rotation={[Math.PI, 0, Math.PI * 1.03]}
                scrollProgressRef={scrollProxy}
                animationSpeed={0.00005}
                scrollSpeed={0.3}
                showHalfTorus={true}
                startAngle={-0.3}
              />
            )}
          </Canvas>
        </div>
      </div>

      {/* <div id="curtain-end" className="absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#0D0D0D] text-white">
        <Typography variant="h2" weight="medium">{t('endTitle')}</Typography>
      </div> */}
    </div>
  )
}
