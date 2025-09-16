import { getArticles } from '@/services/getArticles'
import Footer from '@/components/Footer/Footer'
import { Header } from '@/components/Header'
import { Typography } from '@/components/ui'
import { API_URL } from '@/constants/main'
import { getTranslations } from 'next-intl/server'
import { ArticleCard } from '../_components/BlockClient'

import ShareButtons from './_components/ShareButtons'
import { getArticleBySlug } from '@/services/getArticle'
import ArticleBlocksRenderer from './_components/ArticleBlocksRenderer'
import BlogDate from './_components/BlogDate'
import { Metadata } from 'next'

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params

  const article = await getArticleBySlug(slug, false, locale)

  if (!article) {
    return {
      title: 'Coursinity Blog',
      description: 'Latest blog posts and insights'
    }
  }

  const title = article.Share?.ShareTitle || article.Title
  const description = article.Share?.ShareContent || article.ShortDescription || ''
  const image = article?.CoverImage?.formats?.thumbnail?.url
    ? API_URL + article.CoverImage.formats.thumbnail.url
    : undefined

  const canonicalUrl = `https://www.coursinity.com/${locale}/blog/${slug}`

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      url: `https://coursinity-jawr-git-dev-rostiks-projects-68dc3a47.vercel.app/${locale}/blog/${slug}`,
      title,
      description,
      images: image ? [{ url: image }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? image : undefined
    },
    alternates: {
      canonical: canonicalUrl
    }
  }
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params

  const isArabic = locale === 'ar'

  const t = await getTranslations({ locale, namespace: 'BL_BlogPost' })

  const data = await getArticleBySlug(slug, false, locale)
  const blocks = await getArticleBySlug(slug, true, locale)
  const latestArticles = await getArticles({ locale })

  const article = data

  return (
    <>
      <Header />

      <section className="bg-white pt-[176px] pb-[120px] flex flex-col items-center  max-lg:px-6 max-md-px-4">
        <div className="flex flex-col max-w-[976px] max-lg:max-w-[560px] w-full gap-8 pb-[72px] max-lg:pb-[60px]">
          <div className="flex flex-col gap-6 max-lg:gap-4">
            <Typography variant="h3" className="max-lg:text-3xl" weight="medium">
              {article?.Title}
            </Typography>
            <Typography variant="body2" className="max-lg:text-base">
              {article?.ShortDescription}
            </Typography>
          </div>

          <img
            src={API_URL + article?.CoverImage?.formats.large?.url}
            alt={article?.CoverImage?.alternativeText || ''}
            className="rounded-2xl"
          />
          <div className="flex justify-between items-center max-md:flex-col max-md:gap-6 max-md:items-start">
            <div className="flex gap-6 items-center">
              <div className="flex flex-col gap-3">
                <Typography variant="caption" className="text-primary-purple">
                  {t('author')}
                </Typography>
                <Typography
                  variant="body2"
                  className="max-lg:max-w-[126px] max-md:max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {article?.Author ? article?.Author : 'Unknown Author'}
                </Typography>
              </div>
              <div className="flex flex-col gap-3">
                <Typography variant="caption" className="text-primary-purple">
                  {t('published_at')}
                </Typography>
                <Typography variant="body2">
                  <BlogDate iso={article?.publishedAt || ''} />
                </Typography>
              </div>
            </div>
            <ShareButtons
              url={`https://www.coursinity.com/${locale}/blog/${slug}`}
              title={article?.Share?.ShareTitle || ''}
              content={article?.Share?.ShareContent}
            />
          </div>
        </div>
        <section className="flex flex-col w-full max-w-[720px] max-lg:max-w-[460px]">
          <ArticleBlocksRenderer blocks={blocks?.Blocks} assetsBaseUrl={API_URL} />
          <div className="border-t-[1px] border-secondary-400 w-full pt-6 flex items-center justify-between max-md:flex-col max-md:gap-6 max-md:items-start">
            <Typography variant="body3">{t('share_post')}</Typography>
            <ShareButtons
              url={`https://www.coursinity.com/${locale}/blog/${slug}`}
              title={article?.Share?.ShareTitle || ''}
              content={article?.Share?.ShareContent}
            />
          </div>
        </section>
        <section className="flex flex-col gap-12 px-[85px] pt-[120px] max-md:pt-20 max-lg:px-0 w-full max-w-[1540px] self-center ">
          <Typography variant="h3" weight="medium" className="max-lg:!text-2xl">
            {t('latest_title')}
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {latestArticles.data.slice(0, 3).map((article) => (
              <ArticleCard key={article?.id} a={article} isArabic={locale == 'ar'} />
            ))}
          </div>
        </section>
      </section>

      <Footer page="blog" />
    </>
  )
}
