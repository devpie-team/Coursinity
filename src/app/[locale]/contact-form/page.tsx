'use client'

import { Header } from '@/components/Header'
import { ContactForm } from './_components/ContactForm/ContactForm'
import { ContactVisual } from './_components/ContactVisual/ContactVisual'
import Footer from '@/components/Footer/Footer'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import { SuccessModal } from '@/components/SuccessModal'
import { useState } from 'react'

export default function ContactFormPage() {
  const locale = useLocale()
  const isArabic = locale == 'ar'
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const handleFormSuccess = () => {
    setShowSuccessModal(true)
    setTimeout(() => {
      setShowSuccessModal(false)
    }, 5000)
  }

  return (
    <>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={isArabic ? 'تم إرسال النموذج بنجاح!' : 'Form submitted successfully!'}
      />
      <Header />
      <main className="flex px-[116px] py-[101px] pb-[148px] bg-contact-gradient  justify-center items-center max-[1100px]:px-6 max-lg:py-20 ">
        <div className="flex border border-black border-opacity-10 rounded-3xl max-md:flex-col ">
          <ContactVisual
            className={cn(
              'relative z-10  p-8  flex flex-col justify-between items-center overflow-hidden max-lg:p-4  max-md:gap-12 max-md:pb-9',
              isArabic ? 'gap-[80px]' : 'gap-[120px]'
            )}
          />

          <ContactForm
            className={cn(
              'p-8 min-w-[720px] max-lg:p-5 max-md:min-w-[343px] max-md:max-w-full order-2 max-md:order-1 z-10 bg-white rounded-e-3xl  max-md:rounded-3xl max-1250:min-w-[450px] max-1250:max-w-[450px]',
              isArabic ? 'border-r border-black/10' : ' border-l border-black/10 '
            )}
            onSuccess={handleFormSuccess}
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
