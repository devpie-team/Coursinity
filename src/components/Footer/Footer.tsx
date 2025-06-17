'use client'

import { cn } from '@/lib/utils'
import { Button } from '../primitives/button'
import XIcon from '../icons/XIcon'
import FacebookIcon from '../icons/FacebookIcon'
import InstagramIcon from '../icons/InstagramIcon'
import LinkedInIcon from '../icons/LinkedInIcon'
import YouTubeIcon from '../icons/YouTubeIcon'
import { Typography } from '../ui'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FadeInOnView } from '../FadeInOnView/FadeInOnView'

type FooterProps = {
  className?: string
}

const Footer = ({ className }: FooterProps) => {
  const t = useTranslations('Footer.Footer')

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

  const renderListItems = (baseKey: string, count: number) =>
    Array.from({ length: count }).map((_, i) => (
      <li key={i}>
        <Typography as="a" href="#" variant={isDesktop ? 'body3' : 'caption'}>
          {t(`${baseKey}.${i}`)}
        </Typography>
      </li>
    ))

  return (
    <footer
      className={cn(
        'w-full py-[140px] px-[150px] pb-[50px] text-white bg-primary-purple max-[1280px]:px-6 max-lg:py-20 max-lg:pb-16 max-[834px]:px-4 ',
        className
      )}>
      <div className="flex flex-col gap-[120px] max-lg:gap-20">
        {/*Headline*/}
        <div className="flex flex-col gap-8 items-center font-medium text-center max-lg:gap-4">
          <FadeInOnView>
            <Typography variant={isDesktop ? 'h2' : 'h5'} weight="medium">
              {t('headline')
                .split('\n')
                .map((line, i) => (
                  <React.Fragment key={i}>
                    {' '}
                    {''}
                    {line}
                  </React.Fragment>
                ))}
            </Typography>
          </FadeInOnView>
          <FadeInOnView>
            <Typography variant={isDesktop ? 'body2' : 'button'} weight="regular" className="text-opacity-80">
              {t('subheadline')}
            </Typography>
            <Button variant="secondary" size="md" className="w-[263px] max-lg:w-[343px] mt-4">
              {t('button')}
            </Button>
          </FadeInOnView>
        </div>

        {/* Middle: Columns */}
        <div className="flex flex-col justify-between ">
          <div className="grid grid-cols-[1fr_3fr] gap-[50px] pb-20 max-md:pb-0 max-lg:pb-8 max-lg:gap-8  max-md:grid-rows-[1fr_3fr] max-md:grid-cols-1">
            {/* Coursinity column */}
            <FadeInOnView>
              <div className="flex flex-col gap-[20px] font-medium flex-none max-w-[240px] max-[834px]:max-w-full">
                <Typography variant={isTablet ? 'body1' : 'body2'} weight="medium">
                  {t('columns.coursinity.title')}
                </Typography>
                <Typography variant={isDesktop ? 'body3' : 'caption'}>{t('columns.coursinity.items.0')}</Typography>
                <Typography variant={isDesktop ? 'body3' : 'caption'}>{t('columns.coursinity.items.1')}</Typography>
              </div>
            </FadeInOnView>

            <FadeInOnView>
              <div className="grid grid-cols-3 gap-[50px] max-md:grid-cols-2 max-md:grid-rows-2 flex-grow">
                {/* Solutions */}
                <div>
                  <Typography variant={isTablet ? 'body3' : 'body2'} weight="medium" className="mb-5">
                    {t('columns.solutions.title')}
                  </Typography>
                  <ul className="space-y-[6px] text-button">{renderListItems('columns.solutions.items', 5)}</ul>
                </div>
                {/* Academy */}
                <div>
                  <Typography variant={isTablet ? 'body3' : 'body2'} weight="medium" className="mb-5">
                    {t('columns.academy.title')}
                  </Typography>
                  <ul className="space-y-[6px] text-button">{renderListItems('columns.academy.items', 4)}</ul>
                </div>
                {/* Company */}
                <div>
                  <Typography variant={isTablet ? 'body3' : 'body2'} weight="medium" className="mb-5">
                    {t('columns.company.title')}
                  </Typography>
                  <ul className="space-y-[6px] text-button">{renderListItems('columns.company.items', 4)}</ul>
                </div>
              </div>
            </FadeInOnView>
          </div>

          {/*Copyright + Links + Socials */}
          <FadeInOnView>
            <div className="relative flex justify-between pt-5 border-t border-opacity-15 border-white items-center max-lg:pt-8 max-lg:flex-col gap-6">
              <Typography
                as="p"
                variant="caption"
                className="text-sm font-normal w-[33%] order-1 max-lg:order-3 max-lg:text-center max-md:w-full">
                {t('bottom.copyright')}
              </Typography>
              <div className="flex text-button gap-6 w-[33%] justify-center order-2 max-lg:order-1 max-lg:justify-center">
                <Typography as="a" href="#" variant={isDesktop ? 'body3' : 'caption'}>
                  {t('bottom.links.terms')}
                </Typography>
                <Typography as="a" href="#" variant={isDesktop ? 'body3' : 'caption'}>
                  {t('bottom.links.privacy')}
                </Typography>
                <Typography as="a" href="#" variant={isDesktop ? 'body3' : 'caption'}>
                  {t('bottom.links.cookies')}
                </Typography>
              </div>
              <div className="flex gap-2 w-[33%] justify-end order-3 max-lg:order-2 max-lg:justify-center">
                <button className="flex min-w-14 h-14 rounded-full bg-white bg-opacity-[12%] justify-center items-center hover:bg-opacity-25 transition-all ">
                  <XIcon />
                </button>
                <button className="flex min-w-14 h-14 rounded-full bg-white bg-opacity-[12%] justify-center items-center hover:bg-opacity-25 transition-all">
                  <FacebookIcon />
                </button>
                <button className="flex min-w-14 h-14 rounded-full bg-white bg-opacity-[12%] justify-center items-center hover:bg-opacity-25 transition-all">
                  <InstagramIcon />
                </button>
                <button className="flex min-w-14 h-14 rounded-full bg-white bg-opacity-[12%] justify-center items-center hover:bg-opacity-25 transition-all">
                  <LinkedInIcon />
                </button>
                <button className="flex min-w-14 h-14 rounded-full bg-white bg-opacity-[12%] justify-center items-center hover:bg-opacity-25 transition-all">
                  <YouTubeIcon />
                </button>
              </div>
            </div>
          </FadeInOnView>
        </div>
      </div>
    </footer>
  )
}

export default Footer
