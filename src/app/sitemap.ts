import type { MetadataRoute } from 'next'
import { getArticles } from '@/services/getArticles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.coursinity.com'
  const lastModified = new Date('2025-01-30')
  const locales = ['en', 'ar']

  const blogPosts: MetadataRoute.Sitemap = []
  const blogSlugsMap = new Map<string, { en?: string; ar?: string; updatedAt?: string }>()

  for (const locale of locales) {
    try {
      const articlesResponse = await getArticles({
        locale,
        page: 1,
        pageSize: 1000,
        publicationState: 'live'
      })

      if (articlesResponse?.data) {
        for (const article of articlesResponse.data) {
          if (article.Slug) {
            const key = article.documentId || article.id.toString()
            const existing = blogSlugsMap.get(key) || {}
            blogSlugsMap.set(key, {
              ...existing,
              [locale]: article.Slug,
              updatedAt: article.updatedAt || existing.updatedAt
            })
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching blog posts for locale ${locale}:`, error)
    }
  }

  for (const [key, slugs] of blogSlugsMap.entries()) {
    const enSlug = slugs.en || slugs.ar
    const arSlug = slugs.ar || slugs.en
    const updatedAt = slugs.updatedAt
    const isSameSlug = enSlug === arSlug

    if (enSlug) {
      blogPosts.push({
        url: `${baseUrl}/en/blog/${enSlug}`,
        lastModified: updatedAt ? new Date(updatedAt) : lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${enSlug}`,
            ar: arSlug ? `${baseUrl}/ar/blog/${arSlug}` : `${baseUrl}/ar/blog/${enSlug}`,
            'x-default': `${baseUrl}/en/blog/${enSlug}`
          }
        }
      })
    }

    if (arSlug && !isSameSlug) {
      blogPosts.push({
        url: `${baseUrl}/ar/blog/${arSlug}`,
        lastModified: updatedAt ? new Date(updatedAt) : lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: {
            en: enSlug ? `${baseUrl}/en/blog/${enSlug}` : `${baseUrl}/en/blog/${arSlug}`,
            ar: `${baseUrl}/ar/blog/${arSlug}`,
            'x-default': `${baseUrl}/en/blog/${enSlug || arSlug}`
          }
        }
      })
    }
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ar: `${baseUrl}/ar`,
          'x-default': `${baseUrl}/en`
        }
      }
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ar: `${baseUrl}/ar`,
          'x-default': `${baseUrl}/en`
        }
      }
    },
    {
      url: `${baseUrl}/ar`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ar: `${baseUrl}/ar`,
          'x-default': `${baseUrl}/en`
        }
      }
    },
    {
      url: `${baseUrl}/en/contact-form`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/contact-form`,
          ar: `${baseUrl}/ar/contact-form`,
          'x-default': `${baseUrl}/en/contact-form`
        }
      }
    },
    {
      url: `${baseUrl}/ar/contact-form`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/contact-form`,
          ar: `${baseUrl}/ar/contact-form`,
          'x-default': `${baseUrl}/en/contact-form`
        }
      }
    },
    {
      url: `${baseUrl}/en/academy`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/academy`,
          ar: `${baseUrl}/ar/academy`,
          'x-default': `${baseUrl}/en/academy`
        }
      }
    },
    {
      url: `${baseUrl}/ar/academy`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/academy`,
          ar: `${baseUrl}/ar/academy`,
          'x-default': `${baseUrl}/en/academy`
        }
      }
    },
    {
      url: `${baseUrl}/en/solutions`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/solutions`,
          ar: `${baseUrl}/ar/solutions`,
          'x-default': `${baseUrl}/en/solutions`
        }
      }
    },
    {
      url: `${baseUrl}/ar/solutions`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/solutions`,
          ar: `${baseUrl}/ar/solutions`,
          'x-default': `${baseUrl}/en/solutions`
        }
      }
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog`,
          ar: `${baseUrl}/ar/blog`,
          'x-default': `${baseUrl}/en/blog`
        }
      }
    },
    {
      url: `${baseUrl}/ar/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog`,
          ar: `${baseUrl}/ar/blog`,
          'x-default': `${baseUrl}/en/blog`
        }
      }
    },
    {
      url: `${baseUrl}/en/cookie-policy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/en/cookie-policy`,
          ar: `${baseUrl}/ar/cookie-policy`,
          'x-default': `${baseUrl}/en/cookie-policy`
        }
      }
    },
    {
      url: `${baseUrl}/ar/cookie-policy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/en/cookie-policy`,
          ar: `${baseUrl}/ar/cookie-policy`,
          'x-default': `${baseUrl}/en/cookie-policy`
        }
      }
    },
    {
      url: `${baseUrl}/en/privacy-policy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/en/privacy-policy`,
          ar: `${baseUrl}/ar/privacy-policy`,
          'x-default': `${baseUrl}/en/privacy-policy`
        }
      }
    },
    {
      url: `${baseUrl}/ar/privacy-policy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/en/privacy-policy`,
          ar: `${baseUrl}/ar/privacy-policy`,
          'x-default': `${baseUrl}/en/privacy-policy`
        }
      }
    },
    {
      url: `${baseUrl}/en/terms-of-use`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/en/terms-of-use`,
          ar: `${baseUrl}/ar/terms-of-use`,
          'x-default': `${baseUrl}/en/terms-of-use`
        }
      }
    },
    {
      url: `${baseUrl}/ar/terms-of-use`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: {
          en: `${baseUrl}/en/terms-of-use`,
          ar: `${baseUrl}/ar/terms-of-use`,
          'x-default': `${baseUrl}/en/terms-of-use`
        }
      }
    }
  ]

  return [...staticPages, ...blogPosts]
}
