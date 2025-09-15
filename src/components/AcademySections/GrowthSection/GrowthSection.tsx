'use client'

import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/primitives/accordion'
import { useEffect, useRef, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import Lottie1En from '../../../../public/assets/lottie/academy/growth_section/en/growth_1.json'
import Lottie2En from '../../../../public/assets/lottie/academy/growth_section/en/growth_2.json'
import Lottie3En from '../../../../public/assets/lottie/academy/growth_section/en/growth_3.json'
import Lottie4En from '../../../../public/assets/lottie/academy/growth_section/en/growth_4.json'
import Lottie2Ar from '../../../../public/assets/lottie/academy/growth_section/ar/growth_2.json'
import Lottie3Ar from '../../../../public/assets/lottie/academy/growth_section/ar/growth_3.json'
import Lottie4Ar from '../../../../public/assets/lottie/academy/growth_section/ar/growth_4.json'
import { useInView } from 'react-intersection-observer'
import { useLocale, useTranslations } from 'next-intl'

const usePreventLenisScroll = (ref: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      const isScrollable = el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
      if (isScrollable) e.stopPropagation()
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [ref])
}

export const GrowthSection = () => {
  const t = useTranslations('AC_GrowthSection')

  const [activeTab, setActiveTab] = useState<keyof typeof lotties>('soft-skills')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const { ref, inView } = useInView({ triggerOnce: false })
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [isDesktop, setIsDesktop] = useState(true)
  const lotties = {
    'soft-skills': Lottie1En,
    'lead-manage': isArabic ? Lottie2Ar : Lottie2En,
    'finance-accounting': isArabic ? Lottie3Ar : Lottie3En,
    'growth-marketing': isArabic ? Lottie4Ar : Lottie4En
  } as const
  type AccordionItemT = { title: string; content: string }
  type AccordionMap = Record<keyof typeof lotties, AccordionItemT[]>

  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth > 1024)
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

  // Беремо весь контент акордеонів із перекладу
  const accordionData = t.raw('accordion') as AccordionMap

  return (
    <section className="flex flex-col bg-white rounded-[40px] border-secondary-400 border pt-[120px] px-[120px] pb-10 mx-8 gap-[60px] items-center max-lg:mx-6 max-lg:px-4 max-md:mx-2 max-md:gap-10 z-20 max-md:pt-10 max-md:rounded-3xl">
      <div className="flex flex-col text-center gap-6">
        <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
          {t('title')}
        </Typography>
        <Typography variant="body3" className="text-description">
          {t('subtitle')}
        </Typography>
      </div>

      <div className="flex flex-col gap-4 max-w-[1090px] w-full">
        {/* Tabs */}
        <div className="flex p-1 rounded-[40px] border-secondary-300 border gap-1 max-md:flex-col">
          <button
            onClick={() => setActiveTab('soft-skills')}
            className={`flex-1 p-3 rounded-full transition-all duration-200 ${
              activeTab === 'soft-skills'
                ? 'bg-primary-green text-white'
                : 'bg-secondary-300 hover:bg-secondary-400 text-black'
            }`}>
            <Typography variant="body3" weight="medium">
              {t('tabs.soft-skills')}
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
              {t('tabs.lead-manage')}
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
              {t('tabs.finance-accounting')}
            </Typography>
          </button>

          <button
            onClick={() => setActiveTab('growth-marketing')}
            className={`flex-1 p-3 rounded-full transition-all duration-200 ${
              activeTab === 'growth-marketing'
                ? 'bg-primary-green text-white'
                : 'bg-secondary-300 hover:bg-secondary-400 text-black'
            }`}>
            <Typography variant="body3" weight="medium">
              {t('tabs.growth-marketing')}
            </Typography>
          </button>
        </div>

        {/* Content */}
        <div className="bg-secondary-300 rounded-[20px] p-6 h-[450px] max-md:h-auto">
          <div className="flex max-md:flex-col gap-6">
            {/* Accordion */}
            <div
              ref={scrollContainerRef}
              className="flex flex-col max-w-[390px] w-full max-h-[400px] overflow-y-scroll overflow-x-hidden lenis-exclude scroll-smooth-custom order-1 max-md:order-2 max-md:max-w-full">
              <Accordion type="single" collapsible className="w-full space-y-4 max-lg:space-y-2">
                {accordionData[activeTab].map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-secondary-400">
                    <AccordionTrigger className="bg-white hover:no-underline pl-6 pr-6 max-lg:pr-4 max-lg:pl-4 mr-4">
                      <Typography
                        variant={isDesktop ? 'body2' : 'body3'}
                        weight="medium"
                        className={isArabic ? 'text-right' : 'text-left'}>
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

            {/* Lottie */}
            <div ref={ref} className="mx-auto max-w-[550px] w-full order-2 max-md:order-1">
              <Lottie
                lottieRef={lottieRef}
                animationData={lotties[activeTab]}
                loop={false}
                className="w-full h-[400px] max-md:h-[310px]"
              />
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col justify-center items-center text-center mt-4 gap-10 max-w-[760px] mx-auto">
          <Typography variant="body3" className="text-description">
            {t('finalText')}
          </Typography>
          <Button variant="academy" className="shrink-0 max-md:w-full">
            {t('cta')}
          </Button>
        </div>
      </div>
    </section>
  )
}
