'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Button } from '@/components/primitives/button'
import { Typography } from '@/components/ui'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { Card } from './components/Card'

export const CardSection = () => {
  const t = useTranslations('AC_CardSection')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <section className={cn('pb-[120px] pt-40 flex flex-col items-center justify-center gap-[60px] max-md:gap-10 px-4')}>
      <div className="flex flex-col max-w-full scaleText opacityText max-md:px-4 gap-6 text-center">
        <FadeInOnView variant="fade-up">
          <Typography variant="h3" weight="medium" className="text-white max-md:text-h5">
            {t('title')}
          </Typography>
        </FadeInOnView>
        <FadeInOnView variant="fade-up">
          <Typography variant="body3" weight="regular" className="text-description">
            {t('subtitle')}
          </Typography>
        </FadeInOnView>
      </div>

      <div className="flex flex-col items-center gap-10 text-center w-full">
        <div className="w-full px-[120px]" dir={isArabic ? 'rtl' : 'ltr'}>
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            className="w-full"
            allowTouchMove
            observer
            observeParents
            // если родитель скейлится/появляется — форс-апдейт на маунте
            onInit={(swiper) => {
              // кадр на пересчёт после рендера
              requestAnimationFrame(() => swiper.update())
            }}
            // нормальный адаптив без ручных useState
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1260: { slidesPerView: 3, spaceBetween: 20 }
            }}>
            {[0, 1, 2, 3, 4, 5].map((index, id) => (
              <SwiperSlide key={index}>
                <div className="flex w-full justify-center">
                  <Card id={id} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Button variant="academy" className="max-md:w-full">
          {t('button')}
        </Button>
      </div>
    </section>
  )
}
