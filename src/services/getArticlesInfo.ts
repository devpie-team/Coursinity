import { GetArticleInfo, StrapiResponse } from './types'
import { API_URL } from '@/constants/main'

export async function getArticlesInfo(locale?: string, mainArticle?: boolean): Promise<StrapiResponse<GetArticleInfo>> {
  const url = new URL(`${API_URL}/api/index-blog-pages`)

  if (mainArticle) {
    url.searchParams.append('populate[MainArticle]', '*')
  } else {
    url.searchParams.append('populate', '*')
  }

  // 👇 добавляем локаль если передана
  if (locale) {
    url.searchParams.append('locale', locale)
  }
  console.log(url.toString())

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${process.env.STRAPI_READONLY_TOKEN}` },
    next: { revalidate: 60 }
  })

  const json = (await res.json()) as StrapiResponse<GetArticleInfo>
  return json
}
