'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const cards = [
  { title: 'Step 1', text: 'Pinpoint the Skill Gaps' },
  { title: 'Step 2', text: 'Tailored learning experiences' },
  { title: 'Step 3', text: 'Maximize the Return' }
]

export default function StackSteps() {
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    cardRefs.current.forEach((el, i) => {
      gsap.set(el, {
        y: i > index ? 100 : 0,
        opacity: i === index ? 1 : 0,
        zIndex: i === index ? 2 : 1
      })
    })
  }, [index])

  const handleNext = () => {
    const current = cardRefs.current[index]
    const nextIndex = (index + 1) % cards.length
    const next = cardRefs.current[nextIndex]

    const tl = gsap.timeline()

    tl.to(current, {
      y: -100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }).set(current, { zIndex: 0 })

    tl.to(
      next,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      },
      '<' // одночасно з set
    )

    setIndex(nextIndex)
  }

  return (
    <div className="relative w-[400px] h-[500px] mx-auto" ref={containerRef}>
      {cards.map((card, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) cardRefs.current[i] = el
          }}
          className="absolute top-0 left-0 w-full h-full bg-purple-500 text-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-xl font-semibold">{card.title}</h2>
          <p className="mt-4 text-sm">{card.text}</p>
        </div>
      ))}
      <button
        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-black rounded-full"
        onClick={handleNext}>
        Next
      </button>
    </div>
  )
}

export const StackSection = () => {
  return <StackSteps />
}
