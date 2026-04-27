import { Article, StrapiResponse } from './types'

export async function getArticleBySlug(slug: string, blocks: boolean, locale?: string): Promise<Article | null> {
  const base = 'https://strapi.fearart.dev/api/articles'
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

  if (!slug) return null

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
    return null
  }

  const json = (await res.json()) as StrapiResponse<Article>
  return json?.data?.[0] ?? null
}
