import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  const [original, solution, academy] = await Promise.all([
    import(`../../messages/${locale}.json`),
    import(`../../messages/${locale}/solution.json`),
    import(`../../messages/${locale}/academy.json`)
  ])

  return {
    locale,
    messages: {
      ...solution.default,
      ...original.default,
      ...academy.default
    }
  }
})
