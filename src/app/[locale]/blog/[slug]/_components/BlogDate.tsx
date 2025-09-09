import { useLocale } from 'next-intl'

function BlogDate({ iso }: { iso: string }) {
  if (!iso) return '-'

  const locale = useLocale()
  const isArabic = locale?.startsWith('ar')
  const d = new Date(iso)

  const formatted = new Intl.DateTimeFormat(
    // для арабської примусово вмикаємо арабські цифри
    isArabic ? 'ar-EG-u-nu-arab' : 'en-GB',
    {
      day: '2-digit',
      month: isArabic ? 'long' : 'short', // "يناير" vs "Jan"
      year: 'numeric',
      calendar: 'gregory'
    }
  ).format(d)

  return (
    <time dateTime={d.toISOString()} lang={isArabic ? 'ar' : locale} dir={isArabic ? 'rtl' : 'ltr'}>
      {formatted}
    </time>
  )
}
export default BlogDate
