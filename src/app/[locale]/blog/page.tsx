import { cookies } from 'next/headers'
import { getArticles } from '@/services/getArticles'
import { BlogClient } from './_components/BlockClient'

type Search = { page?: string }

export default async function BlogPage(_props: { searchParams: Search; params: { locale: string } }) {
  const cookieStore = await cookies()
  const pageCookie = cookieStore.get('blog_page')?.value

  const page = Math.max(1, Number(pageCookie ?? 1))

  const data = await getArticles({ page, pageSize: 9, locale: _props.params.locale })
  const dataFeatured = await getArticles({ featured: true, page: 1, pageSize: 4, locale: _props.params.locale })

  return <BlogClient articles={data} featuredArticles={dataFeatured} currentPage={page} />
}
