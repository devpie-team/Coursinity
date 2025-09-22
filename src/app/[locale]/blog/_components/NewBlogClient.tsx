'use client'

import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import AOS from 'aos'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer/Footer'
import { Typography } from '@/components/ui'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/primitives/button'
import { Article, GetArticleInfo, StrapiResponse } from '@/services/types'
import { API_URL } from '@/constants/main'
import { DirectionRightIcon } from '@/components/icons'
import { cn } from '@/lib/utils'
import Pagination from './Pagination'
import { useRouter } from 'next/navigation'
import { setBlogPage } from '../actions'
import BlogDate from '../[slug]/_components/BlogDate'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Stepper } from '@/components/AcademySections/CardSection/components/Stepper'
import { SwipeStepper } from '@/components/SwipeStepper/SwipeStepper'
import 'swiper/css'
import { Input } from '@/components/primitives/input'
import CustomSelect from '@/components/CustomSelect/CustomSelect'
import { SliderControls } from './SliderControls'
function TagPill({ children }: { children?: string }) {
  if (!children) return null
  return (
    <div className="rounded-[40px] px-2 py-1 bg-secondary-100 text-primary-purple">
      <Typography variant="caption" weight="medium">
        {children}
      </Typography>
    </div>
  )
}

function TagsRow({ tags }: { tags?: { id: number; Tag?: string }[] }) {
  if (!tags?.length) return <div className="h-7 max-md:h-auto" />
  return (
    <div className="flex flex-wrap gap-2 h-7 max-md:h-auto">
      {tags.map((t) => (
        <TagPill key={t.id}>{t.Tag}</TagPill>
      ))}
    </div>
  )
}

function CoverImg({ url, alt, className }: { url?: string; alt?: string; className?: string }) {
  if (!url) return null
  return <img src={API_URL + url} alt={alt || 'image'} className={cn('object-cover rounded-t-2xl', className)} />
}

export function ArticleCard({ a, isArabic, isFeatured }: { a: Article; isArabic: boolean; isFeatured: boolean }) {
  const title = a.Title
  const desc = a?.ShortDescription
  const img = a?.CoverImage?.formats?.small?.url
  const router = useRouter()
  const t = useTranslations('BL_BlogPage')

  return (
    <div
      className={cn(
        'flex flex-col gap-5 items-start cursor-pointer bg-secondary-300 rounded-2xl',
        isFeatured && 'w-full'
      )}
      onClick={() => router.push(`/${isArabic ? 'ar' : 'en'}/blog/${a.Slug}`)}>
      {img ? (
        <CoverImg url={img} alt={title || 'Article image'} className="w-full aspect-[16/9]" />
      ) : (
        <div className="w-full aspect-[16/9] bg-secondary-400 rounded-t-2xl" />
      )}
      <div className="flex flex-col gap-8 items-start pb-8 px-6">
        <div className="flex flex-col gap-4 items-start">
          <TagsRow tags={a.Tags} />
          <div className="flex flex-col gap-2 min-w-0 w-full">
            <Typography
              variant="button"
              weight="medium"
              className="line-clamp-2 break-words h-12 cursor-pointer max-md:h-auto">
              {title}
            </Typography>
            <Typography variant="caption" className="text-description line-clamp-2 break-words h-10">
              {desc}
            </Typography>
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <Typography variant="caption" className="text-description">
            <BlogDate iso={a?.publishedAt || ''} />
          </Typography>
          {a.TimeToRead ? (
            <Typography variant="caption" className="text-description">
              {a?.TimeToRead + ' '}
              {t('time_to_read')}
            </Typography>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col gap-5 animate-pulse">
      <div className="w-full aspect-[16/9] rounded-2xl bg-gray-200" />
      <div className="h-7" />
      <div className="flex flex-col gap-2">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-24" />
    </div>
  )
}

export function BlogClient({
  articles,
  featuredArticles,
  currentPage,
  info
}: {
  articles: StrapiResponse<Article>
  featuredArticles: StrapiResponse<Article>
  currentPage: number
  info: StrapiResponse<GetArticleInfo>
}) {
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [isBigDesktop, setIsBigDesktop] = useState(false)

  const swiperRef = useRef<SwiperType | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [currentSliderPage, setCurrentSliderPage] = useState(0)
  const [totalSliderPages, setTotalSliderPages] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isPending, startTransition] = useTransition() // 👈 для м'якої індикації
  const t = useTranslations('BL_BlogPage')
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const router = useRouter()

  useEffect(() => {
    AOS.init({ once: false, duration: 700, offset: 100, easing: 'ease-in-out', mirror: true })
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width <= 1024)
      setIsDesktop(width > 1024 && width <= 1836)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const fa = featuredArticles?.data ?? []
  const as = articles?.data ?? []
  const mainInfo = info.data?.[0]

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((articles.meta.pagination.total ?? 0) / 9)),
    [articles.meta.pagination.total]
  )

  const getPerView = () => Number(swiperRef.current?.params.slidesPerView) || 1

  const handlePageChange = (p: number) => {
    startTransition(async () => {
      await setBlogPage(p)
      router.refresh()
    })
  }

  return (
    <>
      <Header />

      <section className=" bg-white w-full flex flex-col">
        <div className="flex flex-col items-center px-8 max-lf:px-6 max-md:px-4 w-full">
          <div
            className={cn(
              'flex flex-col gap-[98px] pt-[156px] max-lg:pt-[100px] w-full',
              'pb-[80px] max-lg:pb-[80px]',
              isBigDesktop ? 'max-w-[1540px]' : 'max-w-[952px]'
            )}>
            <div className="flex flex-col gap-12 max-lg:gap-10 ">
              <div
                className={cn(
                  'flex flex-col',
                  isArabic
                    ? 'max-w-[1000px] max-lg:max-w-[600px] gap-9 max-lg:gap-6'
                    : 'max-w-[778px] max-lg:max-w-[506px] gap-6 max-lg:gap-4'
                )}>
                <Typography variant={isDesktop ? 'h2' : isArabic ? 'h5' : 'h3'} weight="medium">
                  {mainInfo?.MainTitle ? mainInfo.MainTitle : t('title')}
                </Typography>
                <Typography variant="body3" className="text-description">
                  {mainInfo?.MainSubtitle ? mainInfo.MainSubtitle : t('subtitle')}
                </Typography>
              </div>
              {mainInfo?.MainArticle ? (
                <div className="bg-secondary-300 rounded-2xl p-3 max-md:pb-6 flex gap-6 items-center max-md:flex-col">
                  {mainInfo.MainArticle?.CoverImage?.formats.medium?.url ? (
                    <CoverImg
                      url={mainInfo.MainArticle?.CoverImage?.formats.medium?.url}
                      className="rounded-2xl w-[480px] h-[320px] max-lg:w-[50%] max-md:w-full max-md:h-300"
                    />
                  ) : (
                    <div className="rounded-2xl w-[480px] h-[320px] max-lg:w-[50%] max-md:w-full max-md:h-300 bg-secondary-400" />
                  )}
                  <div className="flex flex-col gap-6 max-lg:w-[50%] max-md:w-full">
                    {mainInfo.MainArticle?.Tags?.[0]?.Tag ? <TagsRow tags={mainInfo.MainArticle.Tags} /> : null}
                    <div className="flex flex-col gap-4 min-w-0 w-full">
                      <Typography
                        variant="h6"
                        weight="medium"
                        className="line-clamp-2 break-words min-h-12 cursor-pointer max-md:h-auto">
                        {mainInfo.MainArticle.Title}
                      </Typography>
                      <Typography variant="body3" className="text-description line-clamp-2 break-words min-h-10">
                        {mainInfo.MainArticle.ShortDescription}
                      </Typography>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Featured section */}
          {featuredArticles.data.length ? (
            <section
              className={cn(
                'flex flex-col items-center pb-[80px] max-md:pb-[60px] w-full max-w-[1540px]',
                isBigDesktop ? 'max-w-[1540px]' : 'max-w-[952px]'
              )}>
              <div className="flex flex-col gap-10 max-md:gap-10 w-full">
                <div className="flex flex-col gap-4">
                  <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
                    {mainInfo?.FeaturedTitle ? mainInfo.FeaturedTitle : t('block_title')}
                  </Typography>
                  <Typography variant="body3" className="text-description">
                    {mainInfo?.FeaturedSubtitle ? mainInfo.FeaturedSubtitle : t('block_subtitle')}
                  </Typography>
                </div>

                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper
                    setTotalSliderPages(swiper.snapGrid?.length)
                    setCurrentSliderPage(Math.floor(swiper.activeIndex / getPerView()))
                  }}
                  onSlideChange={(swiper) => {
                    setCurrentSliderPage(Math.floor(swiper.activeIndex / getPerView()))
                    setCurrentStep(swiper.activeIndex)
                  }}
                  slidesPerView={isMobile ? 1 : isTablet ? 2 : isDesktop ? 3 : 3}
                  slidesPerGroup={isMobile ? 1 : isTablet ? 2 : isDesktop ? 3 : 3}
                  spaceBetween={20}
                  className="w-full"
                  allowTouchMove
                  observer
                  observeParents
                  onInit={(swiper) =>
                    requestAnimationFrame(() => {
                      swiper.update()
                      setTotalSliderPages(swiper.snapGrid?.length)
                      setCurrentSliderPage(Math.floor(swiper.activeIndex / getPerView()))
                    })
                  }
                  breakpoints={{
                    350: {
                      spaceBetween: 20
                    },
                    370: {
                      spaceBetween: 20
                    },
                    410: {
                      spaceBetween: 20
                    },
                    460: {
                      spaceBetween: 20
                    },
                    500: {
                      spaceBetween: 20
                    },
                    550: {
                      spaceBetween: -80
                    },
                    600: {
                      spaceBetween: -100
                    },
                    670: {
                      spaceBetween: -120
                    },
                    700: {
                      spaceBetween: -120
                    },
                    767: {
                      spaceBetween: 20
                    }
                  }}>
                  {[...fa, ...fa].map((article: any) => (
                    <SwiperSlide key={article.id}>
                      <div className="flex w-full justify-center">
                        <ArticleCard a={article} isArabic={isArabic} isFeatured />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <SliderControls
                  current={currentSliderPage}
                  total={totalSliderPages}
                  onPrev={() => swiperRef.current?.slidePrev()}
                  onNext={() => swiperRef.current?.slideNext()}
                  onDotClick={(i) => swiperRef.current?.slideTo(i * getPerView())}
                />
              </div>
            </section>
          ) : null}

          {/* Latest */}
          <section
            className={cn(
              'flex flex-col gap-10 pb-[120px] max-lg:pb-[80px] w-full max-w-[1540px] self-center max-md:px-2',
              isBigDesktop ? 'max-w-[1540px]' : 'max-w-[952px]'
            )}>
            <div className="flex flex-col gap-4">
              <Typography variant="h3" weight="medium" className="max-lg:!text-3xl">
                {mainInfo?.LatestTitle ? mainInfo?.LatestTitle : t('latest_title')}
              </Typography>
              <Typography variant="body3" className="text-description">
                {mainInfo?.LatestSubtitle ? mainInfo?.LatestSubtitle : t('latest_subtitle')}
              </Typography>
            </div>
            {/* <div className="flex w-full justify-between items-center">
              <CustomSelect
                label={t('input')}
                className="rounded-full h-[48px] w-[300px] max-lg:w-[343px] max-md:w-full"
                options={
                  mainInfo?.category
                    ? [
                        { value: 'All Posts', label: 'All Posts' },
                        { value: String(mainInfo.category.Name), label: mainInfo.category.Name }
                      ]
                    : [{ value: 'All Posts', label: 'All Posts' }]
                }
              />
              <Input
                placeholder={t('input')}
                required={false}
                className="rounded-full h-[48px] w-[300px] max-lg:w-[343px] max-md:w-full"
                divClassName="h-[60px] max-lg:w-[343px] max-md:w-full"
              />
            </div> */}
            <div
              className={cn(
                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-md:gap-4',
                isPending && 'pointer-events-none select-none'
              )}>
              {isPending
                ? Array.from({ length: 3 }).map((_, i) => <ArticleCardSkeleton key={i} />)
                : as.map((article) => (
                    <ArticleCard key={article.id} a={article} isArabic={isArabic} isFeatured={false} />
                  ))}
            </div>
            <Pagination className="mt-8" current={currentPage} total={totalPages} onPageChange={handlePageChange} />
          </section>
        </div>
      </section>

      <Footer page="blog" />
    </>
  )
}
