'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import { LogoSlider } from './_components/LogoSlider'
import { Typography } from '@/components/ui'
import { UserOctagonIcon } from '@/components/icons/UserOctagonIcon'
import { cn } from '@/lib/utils'
import { ClipboardIcon } from '@/components/icons/ClipboardIcon'
import { GridEditIcon } from '@/components/icons/GridEditIcon'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ZapIcon } from '@/components/icons/ZapIcon'

export const FutureSection = () => {
  const t = useTranslations('AiTeamSection')

  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width < 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    const elementSettings = [
      { selector: '.element1', x: 200, y: -700 },
      { selector: '.element2', x: 1100, y: -200 },
      { selector: '.element3', x: 1000, y: 700 },
      { selector: '.element4', x: -1200, y: 600 },
      { selector: '.element5', x: -1100, y: -300 }
    ]

    // Для каждого элемента настраиваем анимацию
    elementSettings.forEach(({ selector, x, y }) => {
      gsap.fromTo(
        selector,
        {
          opacity: 1,
          x: x,
          y: y
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: '.future-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 2
          }
        }
      )
    })
    gsap.fromTo(
      '.scaleText',
      {
        scale: 2
      },
      {
        scale: 0.5,
        duration: 1,
        ease: 'sine.inOut',
        delay: 20,
        scrollTrigger: {
          trigger: '.future-section',
          start: 'bottom bottom',
          end: 'bottom top ',
          scrub: 2,
          pin: true
        }
      }
    )
  }, [])

  return (
    <div className="p-10  ">
      <LogoSlider />
      <div className="relative flex items-center justify-center text-center w-full h-[975px] overflow-hidden future-section">
        <div className="flex flex-col w-[452px] scaleText">
          <Typography variant="h3" weight="medium">
            The Future Starts Now. Get Your Team Ready
          </Typography>
          <Typography variant="body2" weight="regular">
            Get your team future-ready with training designed to ignite productivity.
          </Typography>
        </div>

        <div className="absolute flex flex-col w-[240px] h-[240px] bg-primary-purple p-6 rounded-[40px] top-[40%] left-[40%]   element1">
          <Typography variant="body2" weight="semibold" className="text-white ">
            Training Built to Fit
          </Typography>
          <div className="flex gap-1 h-full items-end">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'flex justify-center items-end w-full h-[100px] py-2 rounded-[15px] bg-white bg-opacity-[16%]',
                  i === 1 && 'items-start',
                  i === 2 && 'items-center'
                )}>
                <UserOctagonIcon />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute flex flex-col w-[250px] h-[250px] bg-secondary-100 p-6 rounded-[40px] justify-between text-start top-[40%] left-[40%]  element2">
          <Typography variant="body2" weight="semibold" className="text-primary-purple">
            Gamified Experiences that Stick
          </Typography>
          <div className="flex w-20 h-20 bg-primary-purple justify-center items-center rounded-full">
            <ClipboardIcon />
          </div>
        </div>

        <div className="absolute w-[250px] h-[250px] rounded-[40px] overflow-hidden top-[40%] left-[40%]  element3">
          <div className="absolute inset-0 bg-[url('/assets/future/future_1.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
          <div className="relative z-1 p-6 pt-[33px] flex flex-col justify-between h-full text-white text-start">
            <Typography variant="body2" weight="semibold" className="text-white">
              Maximum Value, Whatever the Budget
            </Typography>
            <img src="/assets/future/future_2.png" alt="" className="object-fill" />
          </div>
        </div>

        <div className="absolute flex flex-col w-[240px] h-[240px] bg-secondary-200 p-6 rounded-[40px] justify-between top-[40%] left-[40%]  text-start element4">
          <Typography variant="body2" weight="semibold" className="text-primary-blue">
            Seamless Systems by Design
          </Typography>
          <div className="flex w-20 h-20 bg-primary-blue justify-center items-center rounded-full">
            <GridEditIcon />
          </div>
        </div>

        <div className="absolute flex flex-col w-[250px] h-[245px] bg-secondary-200 px-5 py-3 rounded-[40px] justify-end top-[40%] left-[40%]  text-start  bg-[url('/assets/future/future_3.jpg')] bg-cover bg-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.32)]  element5">
          <div className="flex flex-3 bg-white rounded-[20px] p-3">
            <ZapIcon />
            <Typography variant="body2" weight="semibold">
              Real Results, No Guesswork
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
