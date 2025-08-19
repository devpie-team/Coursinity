'use client'

import { useEffect, useState } from 'react'
import { Typography } from '@/components/ui'
import { FadeInOnView } from '@/components/FadeInOnView/FadeInOnView'
import { ElementRenderer } from './_components/ElementRenderer'
import { Button } from '@/components/primitives/button'
import { useLocale } from 'next-intl'
import { useTranslations } from 'use-intl'

type ElementType = 'card' | 'img' | 'lottie'

type ElementConfig = {
  id: string
  type: ElementType
  src?: string
  alt?: string
  title?: string
  description?: string
  tags?: string[]
  className: string
  style?: React.CSSProperties
}

export const CustomTrainingSection = () => {
  const [lottieAnimations, setLottieAnimations] = useState<Record<string, any>>({})
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const t = useTranslations('S_CustomTrainingSection')

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

  const elements: ElementConfig[] = [
    {
      id: 'card1',
      type: 'card',
      title: t('elements.card1.title'),
      description: t('elements.card1.description'),
      tags: [t('elements.card1.tags.0'), t('elements.card1.tags.1'), t('elements.card1.tags.2')],
      className: 'absolute top-[500px] max-1250:!left-[0] max-lg:!left-[5vw] max-lg:top-[400px] max-md:top-[620px]',
      style: {
        left: 'calc(50vw - 600px)'
      }
    },
    {
      id: 'card2',
      type: 'card',
      title: t('elements.card2.title'),
      description: t('elements.card2.description'),
      tags: [t('elements.card2.tags.0'), t('elements.card2.tags.1'), t('elements.card2.tags.2')],
      className:
        'absolute top-[790px] max-1250:!left-[62vw] max-lg:!left-[55vw] max-lg:top-[660px] max-md:top-[1010px] max-md:!left-[15vw]',
      style: {
        left: 'calc(50vw + 145px)'
      }
    },
    {
      id: 'card3',
      type: 'card',
      title: t('elements.card3.title'),
      description: t('elements.card3.description'),
      tags: [t('elements.card3.tags.0'), t('elements.card3.tags.1'), t('elements.card3.tags.2')],
      className: 'absolute top-[1370px] max-1250:!left-[5vw] max-lg:top-[1150px] max-md:top-[1580px] ',
      style: {
        left: 'calc(50vw - 620px)'
      }
    },
    {
      id: 'card4',
      type: 'card',
      title: t('elements.card4.title'),
      description: t('elements.card4.description'),
      tags: [t('elements.card4.tags.0'), t('elements.card4.tags.1'), t('elements.card4.tags.2')],
      className:
        'absolute top-[1950px] max-1250:!left-[50vw] max-lg:top-[1450px] max-lg:!left-[50vw] max-md:top-[2190px] max-md:!left-[12vw]',
      style: {
        left: 'calc(50vw - 135px)'
      }
    },
    {
      id: 'img2',
      type: 'img',
      src: '/assets/solutions/custom_training_section/custom_training_2.png',
      alt: 'custom_training_2',
      className:
        'absolute w-[255px] h-[255px] top-[420px] max-lg:w-[180px] max-lg:h-[180px] max-lg:!left-[60vw] max-lg:top-[320px] max-md:top-[370px] max-md:!left-[20vw] ',
      style: {
        left: 'calc(50vw - 80px)'
      }
    },
    {
      id: 'img3',
      type: 'img',
      src: '/assets/solutions/custom_training_section/custom_training_3.png',
      alt: 'custom_training_3',
      className:
        'absolute w-[60px] h-[60px] top-[540px] max-lg:w-[48px] max-lg:h-[48px] max-lg:!left-[90vw] max-lg:top-[340px] max-md:top-[400px] max-md:!left-[75vw]',
      style: {
        left: 'calc(50vw + 145px)'
      }
    },
    {
      id: 'img4',
      type: 'img',
      src: '/assets/solutions/custom_training_section/custom_training_4.png',
      alt: 'custom_training_4',
      className:
        'absolute w-[255px] h-[255px] top-[950px] max-lg:w-[180px] max-lg:h-[180px] max-lg:!left-[15vw] max-lg:top-[850px] max-md:top-[1340px]',
      style: {
        left: 'calc(50vw - 180px)'
      }
    },
    {
      id: 'img5',
      type: 'img',
      src: '/assets/solutions/custom_training_section/custom_training_5.png',
      alt: 'custom_training_5',
      className:
        'absolute w-[60px] h-[60px] top-[1020px] max-lg:w-[48px] max-lg:h-[48px] max-lg:!left-[12vw] max-lg:top-[920px] max-md:top-[1400px] max-md:!left-[8vw]',
      style: {
        left: 'calc(50vw - 210px)'
      }
    },
    {
      id: 'img6',
      type: 'img',
      src: '/assets/solutions/custom_training_section/custom_training_6.png',
      alt: 'custom_training_6',
      className:
        'absolute w-[690px] h-[690px] top-[780px] max-lg:top-[640px] max-lg:h-[400px] max-lg:w-[400px] max-lg:!left-[-15vw] max-md:top-[720px] max-md:!left-[50vw]',
      style: {
        left: 'calc(50vw - 845px)'
      }
    },
    {
      id: 'img7',
      type: 'img',
      src: '/assets/solutions/custom_training_section/custom_training_7.png',
      alt: 'custom_training_7',
      className:
        'absolute w-[255px] h-[343px] top-[1430px] max-lg:w-[180px] max-lg:h-[244px] max-lg:top-[1100px] max-lg:!left-[55vw] max-md:top-[1890px] max-md:!left-[15vw]',
      style: {
        left: 'calc(50vw - 60px)'
      }
    },
    {
      id: 'img8',
      type: 'img',
      src: '/assets/solutions/custom_training_section/custom_training_8.png',
      alt: 'custom_training_8',
      className:
        'absolute w-[40px] h-[40px] top-[1470px] max-lg:top-[1120px] max-lg:!left-[50vw] max-md:top-[1910px] max-md:!left-[4vw]',
      style: {
        left: 'calc(50vw - 105px)'
      }
    },
    {
      id: 'img9',
      type: 'img',
      src: '/assets/solutions/custom_training_section/custom_training_9.png',
      alt: 'custom_training_9',
      className:
        'absolute w-[60px] h-[60px] top-[1580px] max-lg:w-[48px] max-lg:h-[48px] max-lg:top-[1200px] max-lg:!left-[75vw] max-md:top-[2000px] max-md:!left-[65vw]',
      style: {
        left: 'calc(50vw + 165px)'
      }
    },
    {
      id: 'img10',
      type: 'img',
      src: '/assets/solutions/custom_training_section/custom_training_10.png',
      alt: 'custom_training10',
      className:
        'absolute w-[640px] h-[640px] top-[1540px] max-lg:w-[300px] max-lg:h-[300px] max-lg:top-[1400px] max-lg:!left-[75vw] max-md:top-[1850px] max-md:!left-[45vw]',
      style: {
        left: 'calc(50vw + 185px)'
      }
    },
    {
      id: 'im11',
      type: 'img',
      src: '/assets/solutions/custom_training_section/custom_training_11.png',
      alt: 'custom_training_11',
      className:
        'absolute w-[255px] h-[255px] top-[2000px] max-lg:w-[180px] max-lg:h-[180px] max-lg:top-[1570px] max-lg:!left-[10vw] max-md:top-[2520px] max-md:!left-[25vw]',
      style: {
        left: 'calc(50vw - 460px)'
      }
    },
    {
      id: 'img12',
      type: 'img',
      src: '/assets/solutions/custom_training_section/custom_training_12.png',
      alt: 'custom_training12',
      className:
        'absolute w-[60px] h-[60px] top-[2060px] max-lg:w-[48px] max-lg:h-[48px] max-lg:top-[1630px] max-lg:!left-[7vw] max-md:top-[2580px] max-md:!left-[20vw]',
      style: {
        left: 'calc(50vw - 490px)'
      }
    },
    {
      id: 'lottie1',
      type: 'lottie',
      src: isArabic
        ? '/assets/lottie/solutions/custom_training_section/custom_training_ar/custom_training_1.json'
        : '/assets/lottie/solutions/custom_training_section/custom_training_en/custom_training_1.json',
      className:
        'absolute w-[165px] h-[31px] top-[690px] max-lg:top-[520px] max-lg:!left-[55vw] max-md:top-[565px] max-md:!left-[10vw]',
      style: {
        left: 'calc(50vw - 150px)'
      }
    },
    {
      id: 'lottie2',
      type: 'lottie',
      src: isArabic
        ? '/assets/lottie/solutions/custom_training_section/custom_training_ar/custom_training_7.json'
        : '/assets/lottie/solutions/custom_training_section/custom_training_en/custom_training_7.json',
      className:
        'absolute w-[96px] h-[32px] top-[380px] max-lg:top-[270px] max-lg:!left-[80vw] max-md:top-[320px] max-md:!left-[65vw]',
      style: {
        left: 'calc(50vw + 109px)'
      }
    },
    {
      id: 'lottie3',
      type: 'lottie',
      src: isArabic
        ? '/assets/lottie/solutions/custom_training_section/custom_training_ar/custom_training_2.json'
        : '/assets/lottie/solutions/custom_training_section/custom_training_en/custom_training_2.json',
      className:
        'absolute w-[160px] h-[32px] top-[910px] max-lg:top-[800px] max-lg:!left-[30vw] max-md:top-[1300px] max-md:!left-[45vw]',
      style: {
        left: 'calc(50vw - 40px)'
      }
    },
    {
      id: 'lottie4',
      type: 'lottie',
      src: isArabic
        ? '/assets/lottie/solutions/custom_training_section/custom_training_ar/custom_training_3.json'
        : '/assets/lottie/solutions/custom_training_section/custom_training_en/custom_training_3.json',
      className:
        'absolute w-[160px] h-[32px] top-[1220px] max-lg:top-[1050px] max-lg:!left-[8vw] max-md:top-[1530px] max-md:!left-[3vw]',
      style: {
        left: 'calc(50vw - 245px)'
      }
    },
    {
      id: 'lottie5',
      type: 'lottie',
      src: isArabic
        ? '/assets/lottie/solutions/custom_training_section/custom_training_ar/custom_training_4.json'
        : '/assets/lottie/solutions/custom_training_section/custom_training_en/custom_training_4.json',
      className:
        'absolute w-[196px] h-[32px] top-[1780px] max-lg:top-[1360px] max-lg:!left-[75vw] max-md:top-[2150px] max-md:!left-[45vw]',
      style: {
        left: 'calc(50vw + 60px)'
      }
    },
    {
      id: 'lottie6',
      type: 'lottie',
      src: isArabic
        ? '/assets/lottie/solutions/custom_training_section/custom_training_ar/custom_training_5.json'
        : '/assets/lottie/solutions/custom_training_section/custom_training_en/custom_training_5.json',
      className:
        'absolute w-[150px] h-[32px] top-[1960px] max-lg:top-[1530px] max-lg:!left-[30vw] max-md:top-[2480px] max-md:!left-[54vw]',
      style: {
        left: 'calc(50vw - 320px)'
      }
    },
    {
      id: 'lottie7',
      type: 'lottie',
      src: isArabic
        ? '/assets/lottie/solutions/custom_training_section/custom_training_ar/custom_training_6.json'
        : '/assets/lottie/solutions/custom_training_section/custom_training_en/custom_training_6.json',
      className: 'absolute w-[160px] h-[32px] top-[2265px] max-lg:top-[1760px] max-lg:!left-[5vw] max-md:top-[2710px]',
      style: {
        left: 'calc(50vw - 525px)'
      }
    }
  ]

  useEffect(() => {
    const loadLotties = async () => {
      const data: Record<string, any> = {}
      await Promise.all(
        elements
          .filter((el) => el.type === 'lottie')
          .map(async (el) => {
            const res = await fetch(el.src!)
            data[el.src!] = await res.json()
          })
      )
      setLottieAnimations(data)
    }
    loadLotties()
  }, [])

  return (
    <div className="relative">
      <div
        className="sticky top-0 h-[100vh] w-full bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/assets/solutions/custom_training_section/custom_training_1.png')",
          backgroundSize: '1920px auto',
          backgroundPosition: 'center 65%'
        }}
      />

      {/* Content Section */}
      <section className="relative z-10 flex flex-col py-[120px] justify-between items-center text-center mt-[-100vh] max-lg:py-20 max-lg:px-4 h-[2600px] max-lg:h-[2100px] max-md:h-[3000px] overflow-hidden custom-shadow-bg2">
        <FadeInOnView variant="fade-up">
          <div className="flex flex-col gap-8 max-lg:gap-1">
            <Typography variant={isDesktop ? 'h1' : 'h5'} weight="medium" className="text-white opacity-50">
              {t('headline')}
            </Typography>
            {t('subheadline') && (
              <Typography variant={isDesktop ? 'h1' : 'h5'} weight="medium" className="text-white opacity-30">
                {t('subheadline')}
              </Typography>
            )}
            <Typography variant="body3" weight="regular" className="text-white opacity-60 max-lg:mt-7">
              {t('subtitle')}
            </Typography>
          </div>
        </FadeInOnView>

        {elements.map((el) => (
          <ElementRenderer
            key={el.id}
            el={el}
            animationData={el.type === 'lottie' ? lottieAnimations[el.src!] : undefined}
          />
        ))}

        <div className="flex flex-col gap-8 items-center max-lg:w-[393px] px-4">
          <FadeInOnView variant="fade-up">
            <Typography variant="body3" weight="regular" className="text-white/80">
              {t('footerText')}
            </Typography>
          </FadeInOnView>
          <FadeInOnView variant="fade-up">
            <Button
              href={`/${locale}/contact-form`}
              variant="purple"
              className={`w-auto max-lg:w-full ${isArabic ? 'max-lg:p-2' : ''}`}>
              {t('cta')}
            </Button>
          </FadeInOnView>
        </div>
      </section>
    </div>
  )
}
