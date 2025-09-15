import { cookies } from 'next/headers'
import { getArticles } from '@/services/getArticles'
import { BlogClient } from './_components/BlockClient'

type Search = { page?: string }

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

  const page = Math.max(1, Number(searchPage ?? pageCookie ?? 1))

  const data = await getArticles({ page, pageSize: 9, locale })
  const dataFeatured = await getArticles({ featured: true, page: 1, pageSize: 4, locale })

  return <BlogClient articles={data} featuredArticles={dataFeatured} currentPage={page} />
}
