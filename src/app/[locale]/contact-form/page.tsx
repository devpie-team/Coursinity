import { Header } from '@/components/Header'
import { ContactForm } from './_components/ContactForm/ContactForm'
import { ContactVisual } from './_components/ContactVisual/ContactVisual'
import Footer from '@/components/Footer/Footer'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

export default function ContactFormPage() {
  const locale = useLocale()
  const isArabic = locale == 'ar'
  return (
    <>
      <Header />
      <main className="flex px-[116px] py-[101px] pb-[148px] bg-white justify-center items-center max-[1100px]:px-6 max-lg:py-20 ">
        <div className="flex border border-black border-opacity-10 rounded-3xl max-md:flex-col ">
          <ContactVisual className="relative z-20  p-8 gap-[120px] flex flex-col justify-between items-center overflow-hidden max-lg:p-4  max-md:gap-12 max-md:pb-9" />

          <ContactForm
            className={cn(
              'p-8 min-w-[466px] max-lg:p-5 max-md:min-w-[343px] order-2 max-md:order-1 z-40',
              isArabic ? 'border-r border-black/10' : ' border-l border-black/10 '
            )}
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
