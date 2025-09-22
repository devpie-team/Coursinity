import { cookies } from 'next/headers'
import { getArticles } from '@/services/getArticles'
import { Metadata } from 'next'
import { BlogClient } from './_components/NewBlogClient'
import { getArticlesInfo } from '@/services/getArticlesInfo'

type Search = { page?: string }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  return {
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
  const categoryCookie = cookieStore.get('category')?.value

  const page = Math.max(1, Number(searchPage ?? pageCookie ?? 1))

  const data = await getArticles({
    page,
    pageSize: 9,
    locale
  })
  const dataFeatured = await getArticles({ featured: true, page: 1, pageSize: 4, locale })
  const info = await getArticlesInfo(locale)
  const mainArticle = await getArticlesInfo(locale, true)

  console.log(mainArticle, data)

  return <BlogClient articles={data} featuredArticles={dataFeatured} currentPage={page} info={info} />
}
