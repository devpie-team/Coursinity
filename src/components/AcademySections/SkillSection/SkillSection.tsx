'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { Typography } from '@/components/ui'
import { useTranslations } from 'next-intl'
gsap.registerPlugin(ScrollTrigger)

type Step = {
  id: string
  leftTitle: string
  leftBullets: string[]
  Right: React.FC
}

const DemoCard = ({ label }: { label: string }) => (
  <div className="rounded-2xl shadow-xl p-6 w-full h-full bg-gradient-to-b from-white to-slate-100/60">
    <div className="text-sm opacity-70 mb-2">{label}</div>
    <div className="h-40 rounded-xl bg-gradient-to-br from-indigo-200 to-cyan-200" />
  </div>
)

const stepsData: Step[] = [
  {
    id: 'digital',
    leftTitle: 'Digital & Tech Transformation',
    leftBullets: [
      'Communication tech & smart apps',
      'Data strategy & decision-making',
      'Cybersecurity & sensitive data safety'
    ],
    Right: () => <DemoCard label="App mock • 01" />
  },
  {
    id: 'lead',
    leftTitle: 'Leadership & Management',
    leftBullets: ['Leading w/ empathy', 'Delegation & feedback loops', 'Metrics tracking'],
    Right: () => <DemoCard label="Team list • 02" />
  },
  {
    id: 'sales',
    leftTitle: 'Sales & Marketing',
    leftBullets: ['Go-to-market strategy', 'Digital ads analytics', 'High-converting creatives'],
    Right: () => <DemoCard label="Charts • 03" />
  },
  {
    id: 'presentation',
    leftTitle: 'Presentation & Communication',
    leftBullets: ['Narrative & storytelling', 'Visual hierarchy', 'Delivery & audience focus'],
    Right: () => <DemoCard label="Slide UI • 04" />
  }
]

export const SkillSection = () => {
  const rootRef = useRef<HTMLElement | null>(null)

  // LEFT
  const leftStageRef = useRef<HTMLDivElement | null>(null)
  const leftTrackRef = useRef<HTMLDivElement | null>(null)

  // RIGHT
  const rightStageRef = useRef<HTMLDivElement | null>(null)
  const rightTrackRef = useRef<HTMLDivElement | null>(null)

  const [isDesktop, setIsDesktop] = useState(false)
  const [panelH, setPanelH] = useState<number>(560)

  useEffect(() => {
    const onResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
      setTimeout(() => ScrollTrigger.refresh(), 50)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useLayoutEffect(() => {
    if (!isDesktop) return

    const measure = () => {
      const h = rightStageRef.current?.getBoundingClientRect().height || panelH
      setPanelH(Math.max(1, Math.round(h)))
    }

    measure()

    const ro = new ResizeObserver(measure)
    if (rightStageRef.current) ro.observe(rightStageRef.current)

    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [isDesktop])

  useLayoutEffect(() => {
    if (!isDesktop) return

    const ctx = gsap.context(() => {
      const stepsCount = stepsData.length
      const pinDuration = window.innerHeight * (stepsCount - 1)

      gsap.set([leftTrackRef.current, rightTrackRef.current], {
        y: 0,
        willChange: 'transform'
      })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: `+=${pinDuration}`,
          pin: true,
          scrub: 0.6,
          snap: {
            snapTo: (value) => {
              const s = stepsCount - 1
              return s > 0 ? Math.round(value * s) / s : 0
            },
            duration: 0.2,
            ease: 'linear.inOut'
          }
        }
      })

      for (let k = 0; k < stepsCount - 1; k++) {
        tl.to(rightTrackRef.current, { y: -(k + 1) * panelH, duration: 1 }).to(
          leftTrackRef.current,
          { y: -(k + 1) * panelH, duration: 1 },
          k
        )
      }
    }, rootRef)

    return () => ctx.revert()
  }, [isDesktop, panelH])

  if (!isDesktop) {
    return (
      <section ref={rootRef} className="bg-secondary-300 py-24 ">
        <div className="container mx-auto px-4 space-y-16">
          <Header />
          {stepsData.map((s) => (
            <div key={s.id} className="grid grid-cols-1 gap-8">
              <LeftStep step={s} />
              <div className="rounded-3xl overflow-hidden">
                <s.Right />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={rootRef} className="bg-white py-24 lg:py-36 h-screen max-h-screen">
      <div className="container mx-auto px-4">
        <Header />
      </div>

      <div className="container mx-auto px-4 mt-12 lg:mt-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="relative">
            <div ref={leftStageRef} className="relative overflow-hidden" style={{ height: panelH }}>
              <div ref={leftTrackRef} className="absolute inset-0 will-change-transform">
                {stepsData.map((step) => (
                  <div key={step.id} className="flex items-start pr-2" style={{ minHeight: panelH }}>
                    <LeftStep step={step} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden w-[455px]"
              style={{
                backgroundImage: `url('/assets/academy/skill/bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
              <div ref={rightStageRef} className="relative h-[520px] lg:h-[560px] xl:h-[553px]  overflow-hidden">
                <div ref={rightTrackRef} className="absolute inset-x-0 top-0 will-change-transform">
                  {stepsData.map((step) => (
                    <div key={step.id} className="p-6 lg:p-8 flex items-center" style={{ minHeight: panelH }}>
                      <step.Right />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Header() {
  const t = useTranslations('AC_SkillSection')
  return (
    <div className="flex flex-col max-w-full  scaleText opacityText max-md:px-4 gap-4 max-md:gap-6 text-center">
      <FadeInOnView variant="fade-up">
        <Typography variant={'h3'} weight="medium">
          {t('title')}
        </Typography>
      </FadeInOnView>
      <FadeInOnView variant="fade-up">
        <Typography variant="body3" weight="regular" className="text-description">
          {t('subtitle')}
        </Typography>
      </FadeInOnView>
    </div>
  )
}

function LeftStep({ step }: { step: Step }) {
  return (
    <div>
      <h3 className="text-xl lg:text-2xl font-semibold">{step.leftTitle}</h3>
      <ul className="mt-3 space-y-2 text-slate-700">
        {step.leftBullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
