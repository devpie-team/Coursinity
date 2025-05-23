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
      setIsMobile(width < 834)
      setIsTablet(width < 1440)
      setIsDesktop(width > 1440)
    }

    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <footer
      className={cn(
        'w-full py-[140px] px-[150px] pb-[50px] text-white bg-primary-purple max-[1280px]:px-6 max-[1440px]:py-20 max-[1440px]:pb-16 max-[834px]:px-4',
        className
      )}>
      <div>
        <div className="flex flex-col gap-[120px] max-[1440px]:gap ">
          <div className="flex flex-col gap-8 items-center font-medium text-center max-[1440px]:gap-4">
            <Typography variant={isDesktop ? 'h2' : 'h5'} weight="medium">
              {t('headline')
                .split('\n')
                .map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
            </Typography>
            <Typography variant={isDesktop ? 'body2' : 'button'} weight="medium">
              {t('subheadline')}
            </Typography>
            <Button
              variant="secondary"
              size="md"
              className="w-[263px]
            max-[1440px]:w-[343px] mt-4">
              {t('button')}
            </Button>
          </div>

          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-[1fr_3fr]  gap-[50px] pb-20 max-[1440px]:pb-8 max-[1440px]:gap-8 max-[834px]:flex max-[834px]:flex-col ">
              <div className="flex flex-col gap-[20px] font-medium flex-none">
                <Typography variant={isTablet ? 'body1' : 'body2'} weight="medium">
                  {t('columns.coursinity.title')}
                </Typography>
                <Typography variant={isDesktop ? 'body3' : 'caption'}>{t('columns.coursinity.items.0')}</Typography>
                <Typography variant={isDesktop ? 'body3' : 'caption'}>{t('columns.coursinity.items.1')}</Typography>
              </div>
              <div className="grid grid-cols-3 gap-[50px] max-[834px]:grid-cols-2 max-[834px]:grid-rows-2 flex-grow">
                <div>
                  <Typography variant={isTablet ? 'body3' : 'body2'} weight="medium" className="mb-5">
                    {t('columns.solutions.title')}
                  </Typography>
                  <ul className="space-y-[6px] text-button">
                    <li>
                      <a href="#">{t('columns.solutions.items.0')}</a>
                    </li>
                    <li>
                      <a href="#">{t('columns.solutions.items.1')}</a>
                    </li>
                    <li>
                      <a href="#">{t('columns.solutions.items.2')}</a>
                    </li>
                    <li>
                      <a href="#">{t('columns.solutions.items.3')}</a>
                    </li>
                    <li>
                      <a href="#">{t('columns.solutions.items.4')}</a>
                    </li>
                  </ul>
                </div>

                <div>
                  <Typography variant={isTablet ? 'body3' : 'body2'} weight="medium" className="mb-5">
                    {t('columns.academy.title')}
                  </Typography>
                  <ul className="space-y-[6px] text-button">
                    <li>
                      <a href="#">{t('columns.academy.items.0')}</a>
                    </li>
                    <li>
                      <a href="#">{t('columns.academy.items.1')}</a>
                    </li>
                    <li>
                      <a href="#">{t('columns.academy.items.2')}</a>
                    </li>
                    <li>
                      <a href="#">{t('columns.academy.items.3')}</a>
                    </li>
                  </ul>
                </div>

                <div>
                  <Typography variant={isTablet ? 'body3' : 'body2'} weight="medium" className="mb-5">
                    {t('columns.company.title')}
                  </Typography>
                  <ul className="space-y-[6px] text-button">
                    <li>
                      <a href="#">{t('columns.company.items.0')}</a>
                    </li>
                    <li>
                      <a href="#">{t('columns.company.items.1')}</a>
                    </li>
                    <li>
                      <a href="#">{t('columns.company.items.2')}</a>
                    </li>
                    <li>
                      <a href="#">{t('columns.company.items.3')}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative flex justify-between pt-5 border-t border-[#7662E833] items-center max-[1440px]:pt-8 max-[1440px]:flex-col gap-6">
              <p className="text-sm font-normal w-[33%] order-1 max-[1440px]:order-3 max-[1440px]:text-center">
                {t('bottom.copyright')}
              </p>
              <div className="flex text-button gap-6 w-[33%] justify-center order-2 max-[1440px]:order-1 max-[1440px]:justify-center">
                <a href="#">{t('bottom.links.terms')}</a>
                <a href="#">{t('bottom.links.privacy')}</a>
                <a href="#">{t('bottom.links.cookies')}</a>
              </div>
              <div className="flex gap-2 w-[33%] justify-end order-3 max-[1440px]:order-2 max-[1440px]:justify-center">
                <button className="flex min-w-14 h-14 rounded-full bg-white bg-opacity-[12%] justify-center items-center hover:bg-opacity-25 transition-all">
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
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
