// app/[locale]/blog/[slug]/ClientLogger.tsx  (CLIENT)
'use client'

export default function ClientLogger({ slug, locale }: { slug: string; locale: string }) {
  console.log('params in browser:', { slug, locale })
  return null
}
