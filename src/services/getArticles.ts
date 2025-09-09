import { Article, StrapiResponse } from './types'
import { API_URL } from '@/constants/main'

type GetArticlesOptions = {
  slug?: string
  featured?: boolean
  page?: number
  pageSize?: number
  sort?: string
  publicationState?: 'live' | 'preview'
  populate?: string | '*' | string[]
  fields?: string[]
  locale?: string
}

function append(qs: URLSearchParams, key: string, value?: string | number | boolean | null) {
  if (value === undefined || value === null) return
  qs.append(key, String(value))
}

export async function getArticles(opts: GetArticlesOptions = {}): Promise<StrapiResponse<Article>> {
  const {
    slug,
    featured,
    page = 1,
    pageSize = 10,
    sort = 'createdAt:desc',
    publicationState = 'live',
    populate = '*',
    fields,
    locale // ✅ destructure locale
  } = opts

  const url = new URL(`${API_URL}/api/articles`)
  const qs = new URLSearchParams()

  // populate
  if (populate === '*') {
    append(qs, 'populate', '*')
  } else if (Array.isArray(populate)) {
    populate.forEach((p, i) => append(qs, `populate[${i}]`, p))
  } else if (typeof populate === 'string') {
    append(qs, 'populate', populate)
  }

  // fields
  if (fields?.length) {
    fields.forEach((f, i) => append(qs, `fields[${i}]`, f))
  }

  // filters
  if (slug) append(qs, 'filters[Slug][$eq]', slug)
  if (typeof featured === 'boolean') append(qs, 'filters[Featured][$eq]', featured)

  // locale
  if (locale) append(qs, 'locale', locale)

  // pagination & sorting
  append(qs, 'sort', sort)
  append(qs, 'pagination[page]', page)
  append(qs, 'pagination[pageSize]', pageSize)
  append(qs, 'publicationState', publicationState)

  url.search = qs.toString()

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${process.env.STRAPI_READONLY_TOKEN}` },
    next: { revalidate: 60 }
  })

  return res.json()
}

export const getFeaturedArticles = (opts: Omit<GetArticlesOptions, 'featured'> = {}) =>
  getArticles({ featured: true, ...opts })

export const getArticleBySlug = (slug: string, opts: Omit<GetArticlesOptions, 'slug' | 'page' | 'pageSize'> = {}) =>
  getArticles({ slug, page: 1, pageSize: 1, ...opts }).then((r) => ({
    ...r,
    data: r.data.slice(0, 1)
  }))
