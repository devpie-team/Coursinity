'use client'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'

/**
 * Строго поддерживаемые локали
 */
type Locale = 'en' | 'ar'

const PHONE = '966556583526'

// Сообщения по языкам
const MESSAGES: Record<Locale, string> = {
  en: 'Hello! I would like to know more about your corporate training programs.',
  ar: 'مرحبًا! أود معرفة المزيد عن برامج التدريب الخاصة بكم.'
}

export default function WhatsAppWidget() {
  const rawLocale = useLocale()
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en'

  // Открытие чата
  const openChat = () => {
    const message = MESSAGES[locale]
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <button
      aria-label="Open WhatsApp"
      onClick={openChat}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full 
                 bg-green-500 hover:bg-green-600 
                 flex items-center justify-center 
                 shadow-lg hover:scale-110 transition">
      <svg width="28" height="28" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.75 20.75C16.2729 20.75 20.75 16.2728 20.75 10.75C20.75 5.22715 16.2729 0.75 10.75 0.75C5.22718 0.75 0.750027 5.22715 0.750027 10.75C0.750027 12.2614 1.08535 13.6946 1.68565 14.979L0.973014 19.3745C0.863498 20.05 1.44954 20.6334 2.12452 20.5209L6.47984 19.795C7.77483 20.4075 9.22242 20.75 10.75 20.75Z"
          stroke="#fff"
          stroke-width="1.5"
          stroke-linecap="square"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  )
}
