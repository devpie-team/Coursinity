import { ArticleBlock } from '@/app/[locale]/blog/[slug]/_components/ArticleBlocksRenderer'

export interface ImageFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path?: string | null
  size: number
  width: number
  height: number
}

export interface ImageFormats {
  thumbnail?: ImageFormat
  large?: ImageFormat
  medium?: ImageFormat
  small?: ImageFormat
}

export interface Media {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: ImageFormats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Article {
  id: number
  documentId: string
  Title: string
  Slug: string
  Description?: string
  Featured?: boolean
  Author?: string
  Tags?: { id: number; Tag: string }[]
  CoverImage?: Media
  createdAt: string
  updatedAt: string
  publishedAt: string
  localizations: Article[]
  ShortDescription?: string
  Blocks: ArticleBlock[]
  TimeToRead: string | null

  SEO: {
    id: number
    meta_description: string
    meta_keywords: string
    meta_title: string
  }
  Share: {
    ShareContent: string
    ShareTitle: string
    id: 34
  }
}

export interface Pagination {
  page: number
  pageCount: number
  pageSize: number
  total: number
}

export interface StrapiResponse<T> {
  data: T[]
  meta: {
    pagination: Pagination
  }
}

export interface GetArticleInfo {
  id: number
  documentId: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  FeaturedTitle: string | null
  FeaturedSubtitle: string | null
  LatestTitle: string | null
  LatestSubtitle: string | null
  MainTitle: string | null
  MainSubtitle: string | null
  MainArticle: Article

  category: {
    Name: string
    id: number
  }
}
