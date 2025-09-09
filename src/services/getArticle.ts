import { Article, StrapiResponse } from './types'

export async function getArticleBySlug(slug: string, blocks: boolean, locale?: string): Promise<Article | null> {
  const base = 'http://185.254.96.236:1337/api/articles'
  const url = new URL(base)

  url.searchParams.append('filters[Slug][$eq]', slug)

  if (locale) {
    url.searchParams.append('locale', locale)
  }

  if (blocks) {
    url.searchParams.append('populate[Blocks][populate]', '*')
  } else {
    url.searchParams.append('populate', '*')
  }

  const headers: Record<string, string> = {}
  if (process.env.STRAPI_READONLY_TOKEN) {
    headers.Authorization = `Bearer ${process.env.STRAPI_READONLY_TOKEN}`
  }

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: 60 }
  })

  if (!res.ok) {
    console.error('Strapi error:', res.status, await res.text())
  }

  const json = (await res.json()) as StrapiResponse<Article>
  return json?.data?.[0] ?? null
}
