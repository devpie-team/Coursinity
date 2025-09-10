// components/ArticleBlocksRenderer.tsx
'use client'

import React, { Fragment, memo, useEffect, useState } from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import { Typography } from '@/components/ui'
import AOS from 'aos'

// ===== Types (адаптуй під свою схему Strapi, якщо поля відрізняються)
type BaseBlock = {
  id: number | string
  __component:
    | 'article-blocks.text'
    | 'article-blocks.conclusion'
    | 'article-blocks.image'
    | 'article-blocks.quote'
    | 'article-blocks.subtitle'
}

type TextBlock = BaseBlock & {
  __component: 'article-blocks.text'
  Paragraph: string // markdown + (допускаємо інлайн HTML)
}

type ConclusionBlock = BaseBlock & {
  __component: 'article-blocks.conclusion'
  ConclusionText: string
}

type QuoteBlock = BaseBlock & {
  __component: 'article-blocks.quote'
  QuoteText: string
  Author?: string | null
}

type SubtitleBlock = BaseBlock & {
  __component: 'article-blocks.subtitle'
  SubtitleText: string
}

type ImageFile = {
  url: string // абсолютний або відносний
  alternativeText?: string | null
  caption?: string | null
  width?: number
  height?: number
}

type ImageBlock = BaseBlock & {
  __component: 'article-blocks.image'
  // Підлаштуй під свою Strapi відповідь (може бути data: { attributes: {...} })
  image?: ImageFile | null
}

export type ArticleBlock = TextBlock | ConclusionBlock | ImageBlock | QuoteBlock | SubtitleBlock

export type ArticleBlocksRendererProps = {
  blocks?: ArticleBlock[] | null
  // якщо твій API віддає base URL окремо — передай, щоб зшивати відносні url з бекенду
  assetsBaseUrl?: string
  isTablet?: boolean
  isMobile?: boolean
  isDesktop?: boolean
}

// Дозволяємо інлайн <u>, <br>, <mark> тощо, але все одно санітизуємо
const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'u', 'mark', 'figure', 'figcaption']
}

function buildSrc(src?: string, base?: string) {
  if (!src) return ''
  try {
    // якщо вже абсолютний — повертаємо як є
    const u = new URL(src, 'http://dummy')
    if (src.startsWith('http://') || src.startsWith('https://')) return src
  } catch (_) {
    // ignore
  }
  if (base && !src.startsWith('http')) {
    return `${base.replace(/\/$/, '')}/${src.replace(/^\//, '')}`
  }
  return src
}

const ArticleBlocksRenderer = memo(function ArticleBlocksRenderer({
  blocks,
  assetsBaseUrl
}: ArticleBlocksRendererProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    AOS.init({ once: false, duration: 700, offset: 100, easing: 'ease-in-out', mirror: true })

    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width <= 1024)
      setIsDesktop(width > 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (!blocks?.length) return null

  const conclusions: ConclusionBlock[] = []
  const theRest: ArticleBlock[] = []

  for (const b of blocks) {
    if (b.__component === 'article-blocks.conclusion') conclusions.push(b as ConclusionBlock)
    else theRest.push(b)
  }
  const ordered = [...theRest, ...conclusions]

  return (
    <Fragment>
      {ordered.map((block, i) => {
        const key = `${block.__component}-${block.id}-${i}`

        switch (block.__component) {
          case 'article-blocks.text': {
            const { Paragraph } = block as TextBlock

            return (
              <div key={key} className="mb-12 text-description text-lg max-lg:text-base">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
                  components={{
                    p: ({ node, ...props }) => <p className="leading-7" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                    em: ({ node, ...props }) => <em className="italic" {...props} />,
                    u: ({ node, ...props }) => <u {...props} />,
                    h1: (p) => <h1 className="text-3xl font-bold mt-8 mb-3" {...p} />,
                    h2: (p) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...p} />,
                    ul: (p) => <ul className="list-disc pl-6" {...p} />,
                    ol: (p) => <ol className="list-decimal pl-6" {...p} />,
                    a: (p) => (
                      <a className="underline hover:no-underline" target="_blank" rel="noopener noreferrer" {...p} />
                    ),
                    code: (p) => <code className="rounded bg-muted px-1 py-0.5" {...p} />
                  }}>
                  {Paragraph || ''}
                </ReactMarkdown>
              </div>
            )
          }

          case 'article-blocks.subtitle': {
            const { SubtitleText } = block as SubtitleBlock
            return (
              <Typography variant={isDesktop ? 'h4' : 'h6'} weight="medium" key={key} className="mb-4">
                {SubtitleText}
              </Typography>
            )
          }

          case 'article-blocks.quote': {
            const { QuoteText, Author } = block as QuoteBlock
            return (
              <figure key={key} className="flex flex-col gap-8 mb-12 border-l-2 border-primary-purple pl-4 italic">
                <Typography variant={isDesktop ? 'h6' : 'body2'} weight="medium">
                  “{QuoteText}”
                </Typography>
                {Author ? (
                  <Typography variant="body3" className="text-description">
                    — {Author}
                  </Typography>
                ) : null}
              </figure>
            )
          }

          case 'article-blocks.image': {
            const { image } = block as ImageBlock
            if (!image?.url) return null

            const src = buildSrc(image.url, assetsBaseUrl)
            const alt = image.alternativeText || ''
            // Якщо немає width/height — фолбек на fill-контейнер
            return (
              <div key={key} className="w-full mb-12">
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
                  <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" priority={i < 2} />
                </div>
                {image.caption ? <p className="mt-2 text-sm text-center opacity-75">{image.caption}</p> : null}
              </div>
            )
          }

          case 'article-blocks.conclusion': {
            const { ConclusionText } = block as ConclusionBlock
            return (
              <section
                key={key}
                className="flex flex-col gap-5 rounded-2xl p-8 max-lg:p-5 bg-secondary-300 mb-12"
                aria-label="Conclusion">
                <Typography variant={isDesktop ? 'h5' : 'body1'} weight="medium">
                  Conclusion
                </Typography>
                <Typography className="text-description" variant={isDesktop ? 'body2' : 'body3'}>
                  <ReactMarkdown rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}>
                    {ConclusionText || ''}
                  </ReactMarkdown>
                </Typography>
              </section>
            )
          }

          default:
            return null
        }
      })}
    </Fragment>
  )
})

export default ArticleBlocksRenderer
