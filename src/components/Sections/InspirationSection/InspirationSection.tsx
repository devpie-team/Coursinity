'use client'

import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { useEffect, useRef, useState } from 'react'
import { ExpandableCard } from './_components/ExpandableCard'
import { EducationProperty5Icon } from '@/components/icons/EducationProperty5Icon'
import { BookCheckIcon } from '@/components/icons/BookCheckIcon'
import { BriefCaseIcon } from '@/components/icons/BriefCaseIcon'
import { EducationProperty2Icon } from '@/components/icons/EducationProperty2Icon'
import { GamingPadIcon } from '@/components/icons/GamingPadIcon'
import DiplomaIcon from '@/components/icons/DiplomaIcon'
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
const CLOSED_HEIGHT = 56
const OPEN_HEIGHT = 280
export const InspirationSection = () => {
  gsap.registerPlugin(ScrollTrigger)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [openStates, setOpenStates] = useState<boolean[]>(() => benefits.map((_, idx) => idx === 0))

  function setOpenOnly(idx: number) {
    setOpenStates((states) => states.map((_, i) => i === idx))
  }

  useEffect(() => {
    if (!sectionRef.current) return

    cardRefs.current.forEach((card, idx) => {
      if (card) gsap.set(card, { height: idx === 0 ? OPEN_HEIGHT : CLOSED_HEIGHT })
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=' + 100 * benefits.length + '%',
        pin: true,
        scrub: true,
        invalidateOnRefresh: true
      }
    })

    benefits.forEach((_, i) => {
      if (cardRefs.current[i + 1]) {
        const label = `switch-${i}`
        tl.addLabel(label)

        tl.to(
          cardRefs.current[i],
          {
            height: CLOSED_HEIGHT,
            onStart: () => setOpenOnly(i + 1),
            onReverseComplete: () => setOpenOnly(i)
          },
          label
        )
        tl.to(
          cardRefs.current[i + 1],
          {
            height: OPEN_HEIGHT
          },
          label
        )
      }
    })
  }, [])

  return (
    <section ref={sectionRef} className="flex bg-black h-[952px] p-[140px] gap-20 max-[1300px]:p-10 items-center">
      <div className="max-w-[270px] shrink max-[1150px]:hidden">
        <Typography variant="h3" weight="medium" className="text-white">
          Inspire Productivity, Don’t Force it
        </Typography>
      </div>
      <div className="flex flex-col gap-[10px] border border-white border-opacity-15 p-6 rounded-3xl w-full flex-1 ">
        {benefits.map((item, idx) => (
          <ExpandableCard
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            innerRef={(el) => {
              cardRefs.current[idx] = el
            }}
            isOpen={openStates[idx]}
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
