'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import AOS from 'aos'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer/Footer'
import { Typography } from '@/components/ui'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/primitives/button'
import { Article, StrapiResponse } from '@/services/types'
import { API_URL } from '@/constants/main'
import { DirectionRightIcon } from '@/components/icons'
import { cn } from '@/lib/utils'
import Pagination from './Pagination'
import { useRouter } from 'next/navigation'
import { setBlogPage } from '../actions'
import { Input } from '@/components/primitives/input'

// ──────────────────────────────────────────────────────────────────────────────
// UI atoms
// ──────────────────────────────────────────────────────────────────────────────
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
  return <img src={API_URL + url} alt={alt || 'image'} className={cn('object-cover rounded-2xl', className)} />
}

export function ArticleCard({ a, isArabic }: { a: Article; isArabic: boolean }) {
  const title = a.Title
  const desc = a?.ShortDescription
  const img = a?.CoverImage?.formats?.small?.url
  const router = useRouter()

  return (
    <div
      className="flex flex-col gap-5 items-start cursor-pointer"
      onClick={() => router.push(`/${isArabic ? 'ar' : 'en'}/blog/${a.Slug}`)}>
      {img ? (
        <CoverImg url={img} alt={title || 'Article image'} className="w-full aspect-[16/9]" />
      ) : (
        <div className="w-full aspect-[16/9] bg-secondary-400 rounded-2xl" />
      )}
      <TagsRow tags={a.Tags} />
      <div className="flex flex-col gap-2 min-w-0 w-full">
        <Typography
          variant="button"
          weight="medium"
          className="line-clamp-2 break-words h-12 cursor-pointer max-md:h-auto">
          {title}
        </Typography>
        <Typography variant="caption" className="text-description line-clamp-2 break-words">
          {desc}
        </Typography>
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
  currentPage // 👈 тепер отримуємо з сервера
}: {
  articles: StrapiResponse<Article>
  featuredArticles: StrapiResponse<Article>
  currentPage: number
}) {
  const [email, setEmail] = useState('')
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [isPending, startTransition] = useTransition() // 👈 для м'якої індикації
  const t = useTranslations('BL_BlogPage')
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const router = useRouter()

  useEffect(() => {
    AOS.init({ once: false, duration: 700, offset: 100, easing: 'ease-in-out', mirror: true })
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsTablet(width >= 768 && width <= 1024)
      setIsDesktop(width > 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const fa = featuredArticles?.data ?? []
  const as = articles?.data ?? []
  const firstFeatured = fa?.[0]
  const restFeatured = fa.slice(1)

  const bigTitle = firstFeatured?.Title
  const bigDesc = featuredArticles.data?.[0]?.ShortDescription
  const bigImg = firstFeatured?.CoverImage?.formats?.small?.url

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((articles.meta.pagination.total ?? 0) / 9)),
    [articles.meta.pagination.total]
  )

  const handlePageChange = (p: number) => {
    startTransition(async () => {
      await setBlogPage(p)
      router.refresh()
    })
  }

  return (
    <>
      <Header />

      <section className="flex flex-col items-center bg-gradient-to-b from-[#F9FAFB] via-[#F9FAFB] to-[#F9FAFB] w-full px-8 max-md:px-2 ">
        <div
          className={cn(
            'flex flex-col gap-[98px] pt-[200px] max-lg:pt-[140px] px-4 items-center max-md:pt-[120px]',
            !featuredArticles.data.length ? 'pb-0' : ' pb-[88px] max-lg:pb-[72px]'
          )}>
          <div className="flex flex-col gap-8 items-center">
            <div
              className={cn(
                'flex flex-col items-center text-center',
                isArabic
                  ? 'max-w-[1000px] max-lg:max-w-[600px] gap-9 max-lg:gap-6'
                  : 'max-w-[778px] max-lg:max-w-[506px] gap-6 max-lg:gap-4'
              )}>
              <Typography variant={isDesktop ? 'h1' : isArabic ? 'h5' : 'h3'} weight="medium">
                {t('title')}
              </Typography>
              <Typography variant="body3" className="text-center text-description">
                {t('subtitle')}
              </Typography>
            </div>
            <div className="flex max-lg:flex-col items-center gap-4 w-full justify-center">
              <Button
                variant="purple"
                className=" max-lg:w-[343px] max-md:w-full h-[60px]"
                onClick={() => router.push(`/${locale}/contact-form?email=${encodeURIComponent(email)}`)}>
                {t('button')}
              </Button>
            </div>
          </div>
        </div>

        {/* Featured section */}
        {featuredArticles.data.length ? (
          <section className="flex flex-col items-center bg-white rounded-[40px] border-secondary-400 border py-[120px] max-lg:py-[80px] max-md:py-[60px] px-[85px] max-lg:px-12 max-md:px-4 w-full">
            <div className="flex flex-col gap-12 w-full max-w-[1740px]">
              <Typography variant={isDesktop ? 'h3' : 'h5'} weight="medium">
                {t('block_title')}
              </Typography>

              {/* Mobile/Tablet: такий самий грід, як у Latest */}
              <div className="grid grid-cols-1  sm:grid-cols-2 gap-6 lg:hidden">
                {fa.map((article) => (
                  <ArticleCard key={article.id} a={article} isArabic={isArabic} />
                ))}
              </div>

              <div className="hidden lg:grid lg:grid-cols-2 max-1150:grid-cols-[0.7fr_1fr] lg:gap-6">
                <div
                  className="flex flex-col gap-6 items-start cursor-pointer"
                  onClick={() => router.push(`/${isArabic ? 'ar' : 'en'}/blog/${firstFeatured.Slug}`)}>
                  <CoverImg url={bigImg} alt={bigTitle || 'Featured image'} className="w-full aspect-[16/9]" />
                  {!!firstFeatured?.Tags?.[0]?.Tag ? <TagsRow tags={firstFeatured?.Tags} /> : null}
                  <div className="flex flex-col gap-4 min-w-0 w-full">
                    <Typography variant="h6" weight="medium" className="line-clamp-2 break-words cursor-pointer">
                      {bigTitle}
                    </Typography>
                    {bigDesc ? (
                      <Typography variant="body3" className="text-description line-clamp-2 break-words">
                        {bigDesc}
                      </Typography>
                    ) : null}
                  </div>
                </div>

                {/* Right column with rest */}
                <div className="flex flex-col gap-4">
                  {restFeatured.map((article) => (
                    <div
                      key={article.id}
                      className="flex gap-4 md:gap-5 items-center cursor-pointer"
                      onClick={() => router.push(`/${isArabic ? 'ar' : 'en'}/blog/${article.Slug}`)}>
                      <CoverImg
                        url={article.CoverImage?.formats?.small?.url}
                        alt={article.Title || 'Article image'}
                        className="flex-none w-36 md:w-[300px] aspect-[4/3]"
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-4">
                        {article.Tags?.length && article.Tags[0].Tag ? <TagsRow tags={article.Tags} /> : null}
                        <div className="flex flex-col gap-2 min-w-0">
                          <Typography
                            variant="button"
                            weight="medium"
                            className="line-clamp-2 break-words cursor-pointer">
                            {article.Title}
                          </Typography>
                          <Typography variant="caption" className="text-description line-clamp-2 break-words">
                            {article.ShortDescription}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Latest */}
        <section className="flex flex-col gap-12 max-md:gap-8 px-[85px] max-lg:px-0 py-[120px] max-md:py-[60px] w-full max-w-[1540px] self-center max-md:px-2">
          <Typography variant="h3" weight="medium" className="max-lg:!text-2xl">
            {t('latest_title')}
          </Typography>

          <div
            className={cn(
              'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
              isPending && 'pointer-events-none select-none'
            )}>
            {isPending
              ? Array.from({ length: 3 }).map((_, i) => <ArticleCardSkeleton key={i} />)
              : as.map((article) => <ArticleCard key={article.id} a={article} isArabic={isArabic} />)}
          </div>
          <Pagination className="mt-8" current={currentPage} total={totalPages} onPageChange={handlePageChange} />
        </section>
      </section>

      <Footer page="blog" />
    </>
  )
}
