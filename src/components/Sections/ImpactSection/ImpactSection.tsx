'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useTranslations } from 'next-intl'
import { Typography } from '@/components/ui'
import { BuildingIcon, BusinessIcon, EducationIcon, SmileIcon, StarsIcon } from '@/components/icons'
import AOS from 'aos'
import 'aos/dist/aos.css'

export const ImpactSection = () => {
  const t = useTranslations('ImpactSection')
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)
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
    const wrapper = wrapperRef.current
    const container = containerRef.current
    if (!wrapper || !container) return

    const wrapperWidth = wrapper.offsetWidth / 2

    gsap.fromTo(
      wrapper,
      { x: 0 },
      {
        x: -wrapperWidth,
        duration: 12,
        ease: 'linear',
        repeat: -1
      }
    )
  }, [])

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <section className="pt-32 pb-[89px] bg-black flex flex-col gap-[52px] overflow-hidden">
      <div className="flex flex-col gap-4 text-center text-white px-4">
        <Typography
          variant={isDesktop ? 'h3' : 'h5'}
          weight="medium"
          data-aos="fade"
          data-aos-offset={isMobile ? '-100' : '-50'}>
          {t('title')}
        </Typography>
        <Typography
          variant="body3"
          className="text-description"
          data-aos="fade"
          data-aos-offset={isMobile ? '-100' : '-50'}>
          {t('subtitle')}
        </Typography>
      </div>

      <div ref={containerRef} className="relative h-[672px] min-w-[1705px] bg-black overflow-hidden">
        <div ref={wrapperRef} className="absolute flex">
          {[...Array(2)].map((_, groupIdx) => (
            <div
              key={groupIdx}
              className="relative flex-shrink-0 text-white"
              style={{ width: '1705px', height: '633px' }}>
              <div className="blue-gradient-border absolute w-[362px] h-[280px] top-[146px] left-0  flex flex-col gap-[28px] p-6 items-end">
                <div className="flex flex-col gap-2">
                  <Typography variant="h3" weight="medium">
                    12+
                  </Typography>
                  <Typography variant="body3">{t('sectors')}</Typography>
                </div>
                <img src="/assets/impact/folder.png" alt="Folder" className="w-[157px] h-[128px]" />
              </div>
              <div className="blue-gradient-border absolute w-[253px] h-[65px] top-[22px] left-[162px] p-[6px] flex items-center before:rounded-[54px]  gap-[9px]">
                <div className="flex items-center justify-center w-[53px] h-[53px] rounded-full bg-primary-blue">
                  <Typography variant="h5">#</Typography>
                </div>
                <Typography variant="body1" weight="medium">
                  {t('smart')}
                </Typography>
              </div>
              <div className="blue-gradient-border absolute w-[100px] h-[100px] bottom-[17px] left-[264px] flex items-center justify-center ">
                <BusinessIcon />
              </div>
              <div className="blue-gradient-border absolute w-[100px] h-[100px] top-[30px] right-[50px] flex items-center justify-center">
                <BuildingIcon />
              </div>
              <div className="blue-gradient-border absolute w-[269px] h-[160px] top-[93px] left-[488px] p-6 flex flex-col gap-2 ">
                <Typography variant="h3" weight="medium">
                  725
                </Typography>
                <Typography variant="body3">{t('government')}</Typography>
              </div>
              <div className="blue-gradient-border absolute w-[156px] h-[52px] bottom-[151px] left-[421px] flex items-center justify-center before:rounded-[54px]">
                <StarsIcon />
              </div>
              <div className="overflow-hidden blue-gradient-border absolute w-[362px] h-[316px] bottom-0 left-[619px] flex flex-col gap-[28px] p-6 items-end ">
                <div className="flex flex-col gap-2">
                  <Typography variant="h3" weight="medium">
                    6
                  </Typography>
                  <Typography variant="body3">{t('active')}</Typography>
                </div>
                <img
                  src="/assets/impact/planet.png"
                  alt="Planet"
                  className="w-[228px] h-[228px] absolute bottom-[-17px] right-[-21px]"
                />
              </div>
              <div className="blue-gradient-border absolute w-[309px] h-[223px] top-[35px] right-[556px] flex flex-col gap-[23px] px-8 py-[38px]">
                <Typography variant="h3" weight="medium">
                  230K+
                </Typography>
                <Typography variant="body3">{t('learners')}</Typography>
              </div>
              <div className="blue-gradient-border absolute w-[100px] h-[100px] top-0 right-[438px] flex items-center justify-center ">
                <EducationIcon />
              </div>
              <div className="blue-gradient-border absolute w-[156px] h-[52px] top-[133px] right-[251px] flex items-center justify-center before:rounded-[54px]">
                <StarsIcon />
              </div>
              <div className="blue-gradient-border absolute w-[296px] h-[65px] bottom-[231px] right-[390px] flex items-center before:rounded-[54px]  gap-[9px]">
                <div className="flex items-center justify-center w-[53px] h-[53px] rounded-full bg-primary-blue">
                  <Typography variant="h5">#</Typography>
                </div>
                <Typography variant="body1" weight="medium">
                  {t('numbers')}
                </Typography>
              </div>
              <div className="blue-gradient-border absolute w-[100px] h-[100px] bottom-[58px] right-[507px] flex items-center justify-center">
                <SmileIcon />
              </div>
              <div className="blue-gradient-border absolute w-[362px] h-[308px] bottom-[27px] right-[16px] flex flex-col gap-3 px-[26px] py-[31px]">
                <Typography variant="h3" weight="medium">
                  9.6
                </Typography>
                <Typography variant="body3">{t('average')}</Typography>
                <img src="/assets/impact/image.png" alt="Graph" className="w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
