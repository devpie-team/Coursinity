import { redirect } from 'next/navigation'
import { getLocale } from 'next-intl/server'

export default async function NotFound() {
  try {
    const locale = await getLocale()
    redirect(`/${locale}`)
  } catch {
    redirect('/')
  }
}
