'use client'

import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/primitives/accordion'
import { useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import Lottie1En from '../../../../public/assets/lottie/academy/growth_section/growth_1.json'
import Lottie2En from '../../../../public/assets/lottie/academy/growth_section/growth_2.json'
import Lottie3En from '../../../../public/assets/lottie/academy/growth_section/growth_3.json'
import Lottie4En from '../../../../public/assets/lottie/academy/growth_section/growth_4.json'
import { useInView } from 'react-intersection-observer'
import { useLocale } from 'next-intl'

const lotties = {
  'soft-skills': Lottie1En,
  'lead-manage': Lottie2En,
  'finance-accounting': Lottie3En,
  'growth-marketing': Lottie4En
}
const usePreventLenisScroll = (ref: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      const isScrollable = el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth

      if (isScrollable) {
        e.stopPropagation()
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [ref])
}

export const GrowthSection = () => {
  const [activeTab, setActiveTab] = useState('soft-skills')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const { ref: ref, inView: inView } = useInView({ triggerOnce: false })
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const locale = useLocale()
  const isArabic = locale === 'ar'

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
    if (inView && lottieRef.current) {
      lottieRef.current.stop()
      lottieRef.current.play()
    }
  }, [inView])

  usePreventLenisScroll(scrollContainerRef)

  const accordionData = {
    'soft-skills': [
      {
        title: 'Handling tough conversations & debates',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      },
      {
        title: 'Leading productive meetings',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      },
      {
        title: 'Creative problem solving',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      },
      {
        title: 'Emotional intelligence skills',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      },
      {
        title: 'Time management mastery',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      }
    ],
    'lead-manage': [
      {
        title: 'Leading organizational change',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      },
      {
        title: 'Performance appraisal models',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      },
      {
        title: 'Building strong teams',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      },
      {
        title: 'Innovation frameworks',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      },
      {
        title: 'Crisis management tools',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      }
    ],
    'finance-accounting': [
      {
        title: 'Finance for non-financials',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      },
      {
        title: 'Anti-money laundering basics',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      },
      {
        title: 'Financial markets overview',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      }
    ],
    'growth-marketing': [
      {
        title: 'Customer experience & value',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      },
      {
        title: 'Pricing strategy essentials',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      },
      {
        title: 'Marketing plan development',
        content:
          'Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll help you tailor a training journey that perfectly fits your organization.'
      }
    ]
  }

  return (
    <section className=" flex flex-col bg-white rounded-[40px] border-secondary-400 border pt-[120px] px-[120px] pb-10 mx-8 gap-[60px] items-center max-lg:mx-6 max-lg:px-4 max-md:mx-2 max-md:gap-10 z-20">
      <div className="flex flex-col text-center gap-6">
        <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
          One Academy. Endless Growth
        </Typography>
        <Typography variant="body3" className="text-description">
          Coursinity Academy is your team’s all-in-one hub for skills, knowledge, and real-world learning.
        </Typography>
      </div>

      <div className="flex  flex-col gap-4 max-w-[1090px] w-full">
        <div className="flex p-1 rounded-[40px] border-secondary-300 border gap-1 max-md:flex-col">
          <button
            onClick={() => setActiveTab('soft-skills')}
            className={`flex-1 p-3 rounded-full transition-all duration-200 ${
              activeTab === 'soft-skills'
                ? 'bg-primary-green text-white'
                : 'bg-secondary-300 hover:bg-secondary-400 text-black'
            }`}>
            <Typography variant="body3" weight="medium">
              Soft Skills
            </Typography>
          </button>
          <button
            onClick={() => setActiveTab('lead-manage')}
            className={`flex-1 p-3 rounded-full transition-all duration-200 ${
              activeTab === 'lead-manage'
                ? 'bg-primary-green text-white'
                : 'bg-secondary-300 hover:bg-secondary-400 text-black'
            }`}>
            <Typography variant="body3" weight="medium">
              Lead & Manage
            </Typography>
          </button>
          <button
            onClick={() => setActiveTab('finance-accounting')}
            className={`flex-1 p-3 rounded-full transition-all duration-200 ${
              activeTab === 'finance-accounting'
                ? 'bg-primary-green text-white'
                : 'bg-secondary-300 hover:bg-secondary-400 text-black'
            }`}>
            <Typography variant="body3" weight="medium">
              Finance & Accounting
            </Typography>
          </button>
          <button
            onClick={() => setActiveTab('growth-marketing')}
            className={`flex-1 p-3 rounded-full transition-all duration-200  ${
              activeTab === 'growth-marketing'
                ? 'bg-primary-green text-white'
                : 'bg-secondary-300 hover:bg-secondary-400 text-black'
            }`}>
            <Typography variant="body3" weight="medium">
              Growth & Marketing
            </Typography>
          </button>
        </div>
        <div className="bg-secondary-300 rounded-[20px] p-6 h-[450px] max-md:h-auto">
          <div className="flex max-md:flex-col gap-6">
            <div
              className="flex flex-col max-w-[390px] w-full max-h-[400px] overflow-y-scroll  overflow-x-hidden  lenis-exclude scroll-smooth-custom order-1 max-md:order-2 max-md:max-w-full "
              ref={scrollContainerRef}>
              <Accordion type="single" collapsible className="w-full space-y-4 max-lg:space-y-2 ">
                {accordionData[activeTab as keyof typeof accordionData].map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-secondary-400 ">
                    <AccordionTrigger className="bg-white  text-left hover:no-underline pl-6 pr-6 max-lg:pr-4 max-lg:pl-4 mr-4 ">
                      <Typography variant={isDesktop ? 'body2' : 'body3'} weight="medium">
                        {item.title}
                      </Typography>
                    </AccordionTrigger>
                    <AccordionContent className="pl-6 pr-8 bg-white rounded-b-xl mr-4">
                      <Typography variant="body3" className="text-description">
                        {item.content}
                      </Typography>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div ref={ref} className="mx-auto  max-w-[550px] w-full order-2 max-md:order-1">
              <Lottie
                lottieRef={lottieRef}
                animationData={lotties[activeTab as keyof typeof lotties]}
                loop={false}
                className="w-full h-[400px] max-md:h-[310px]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center mt-4 gap-10 max-w-[760px] mx-auto">
          <Typography variant="body3" className="text-description ">
            Didn’t see your perfect fit? With hundreds of certifications and expert partners across industries, we’ll
            help you tailor a training journey that perfectly fits your organization.
          </Typography>
          <Button variant="academy" className="shrink-0 max-md:w-full">
            Talk to an Expert
          </Button>
        </div>
      </div>
    </section>
  )
}
