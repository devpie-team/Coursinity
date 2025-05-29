'use client'

import { CheckCircleIcon } from '@/components/icons'
import DealIcon from '@/components/icons/DealIcon'
import DiplomaIcon from '@/components/icons/DiplomaIcon'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { ExpandableCard } from './_components/ExpandableCard'
import TeacherIcon from '@/components/icons/TeacherIcon'
import { EducationProperty5Icon } from '@/components/icons/EducationProperty5Icon'
import { BookCheckIcon } from '@/components/icons/BookCheckIcon'
import { BriefCaseIcon } from '@/components/icons/BriefCaseIcon'
import { EducationProperty2Icon } from '@/components/icons/EducationProperty2Icon'
import { GamingPadIcon } from '@/components/icons/GamingPadIcon'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const benefits = [
  {
    title: 'Game On',
    description: 'We turn training into an energizing mix of play, challenge, and learning.',
    icon: <GamingPadIcon />
  },
  {
    title: 'Real-World Ready',
    description: 'Go beyond theory with training built for real-world challenges.',
    icon: <EducationProperty2Icon />
  },
  {
    title: 'Lasting Impact ',
    description: 'Training that boosts performance long after it ends, creating lasting growth.',
    icon: <BriefCaseIcon />
  },
  {
    title: 'Beyond the Classroom',
    description: 'Immersive training through real-time learning, daily nudges, and ongoing interaction.',
    icon: <BookCheckIcon />
  },
  {
    title: 'Ongoing Mentorship',
    description: '1-on-1 support that keeps trainees on track and driving results.',
    icon: <EducationProperty5Icon />
  },
  {
    title: 'Certified & Celebrated',
    description: "Credentials from prestigious institutions validating your team's accomplishments.",
    icon: <DiplomaIcon size="40px" fill="primary-blue" />
  }
]

export const InspirationSection = () => {
  gsap.registerPlugin(ScrollTrigger)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const stepsCount = benefits.length

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

  useEffect(() => {
    if (!sectionRef.current) return

    let ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${stepsCount * 300}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const step = Math.floor(self.progress * stepsCount)
          setOpenIndex(Math.min(step, stepsCount - 1))
        }
      })

      return () => st.kill()
    }, sectionRef)

    // якщо gsap.context, то просто ctx.revert()
    return () => ctx.revert()
  }, [stepsCount])

  return (
    <section ref={sectionRef} className="flex bg-black h-[952px] p-[140px] gap-20 max-[1300px]:p-10 items-center">
      <div className="max-w-[270px] shrink">
        <Typography variant="h3" weight="medium" className="text-white">
          Inspire Productivity, Don’t Force it
        </Typography>
      </div>
      <div className="flex flex-col gap-[10px] border border-white border-opacity-15 p-6 rounded-3xl w-full flex-1 max-h-[612px]">
        {benefits.map((item, idx) => (
          <ExpandableCard
            key={item.title}
            title={item.title}
            description={item.description}
            isOpen={openIndex === idx}
            icon={item.icon}
            onClick={() => {}}
          />
        ))}
      </div>
      <div className="flex flex-col gap-8 max-w-[270px] shrink">
        <Typography variant="body3" weight="regular" className="text-white opacity-80">
          Coursinity isn’t just a platform, it’s where expert-led training meets team engagement, all in one smart
          learning community.
        </Typography>
        <Typography variant="body3" weight="medium" className="text-white">
          Your Success is our Only Metric
        </Typography>
        <Button variant="purple">Learn More</Button>
      </div>
    </section>
  )
}
