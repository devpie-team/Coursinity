import { cookies } from 'next/headers'
import { getArticles } from '@/services/getArticles'
import { Metadata } from 'next'
import { BlogClient } from './_components/NewBlogClient'
import { getArticlesInfo } from '@/services/getArticlesInfo'
import { getArticleBySlug } from '@/services/getArticle'

type Search = { page?: string }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  const meta = {
    en: {
      title: 'Corporate Training Insights & Strategies Blog | Coursinity',
      description:
        'Explore expert articles on workforce development, learning strategies, and employee training to boost performance. Read now at Coursinity Blog.'
    },
    ar: {
      title: 'مدونة التدريب المؤسسي وتطوير الكفاءات في السعودية | كورسينتي',
      description:
        'اكتشف أحدث المقالات والرؤى حول التدريب المؤسسي وتطوير الكفاءات لرفع إنتاجية الشركات مع كورسينتي. تصفح الآن وتعرّف على طرق تحسين الأداء.'
    }
  }

  const { title, description } = meta[locale as 'en' | 'ar']

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.coursinity.com/${locale}/blog`
    }
  }
}

export default async function BlogPage({
  searchParams,
  params
}: {
  searchParams: Promise<Search>
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { page: searchPage } = await searchParams

  const cookieStore = await cookies()
  const pageCookie = cookieStore.get('blog_page')?.value
  const searchCookie = cookieStore.get('search')?.value
  console.log(searchCookie)
  const categoryCookie = cookieStore.get('category')?.value

  const page = Math.max(1, Number(searchPage ?? pageCookie ?? 1))

  const data = await getArticles({
    page,
    pageSize: 9,
    locale,
    search: searchCookie
  })
  const dataFeatured = await getArticles({ featured: true, page: 1, pageSize: 4, locale })
  const info = await getArticlesInfo(locale)
  const mainArticle = await getArticleBySlug(info.data?.[0]?.MainArticle?.Slug, false, locale)

  return (
    <BlogClient
      articles={data}
      featuredArticles={dataFeatured}
      currentPage={page}
      info={info}
      mainArticle={mainArticle}
    />
  )
}
