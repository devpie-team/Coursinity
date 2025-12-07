'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl'

/**
 * Список поддерживаемых локалей
 * ДОЛЖЕН СООТВЕТСТВОВАТЬ routing.locales
 */
type Locale = 'en' | 'ar'

const PHONE = '966556583526'
const OPEN_DELAY = 2500

// Тексты сообщений по локалям
const MESSAGES: Record<Locale, string> = {
  en: 'Hello! I would like to know more about your corporate training programs.',
  ar: 'مرحبًا! أود معرفة المزيد عن برامج التدريب الخاصة بكم.'
}

export default function WhatsAppWidget() {
  const rawLocale = useLocale()
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en' // <- гарантируем тип

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), OPEN_DELAY)
    return () => clearTimeout(timer)
  }, [])

  const openChat = () => {
    const message = MESSAGES[locale]
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const isArabic = locale === 'ar'

  return (
    <div
      className="fixed bottom-6 z-50 flex items-end gap-3"
      style={{
        right: isArabic ? 'unset' : '24px',
        left: isArabic ? '24px' : 'unset'
      }}>
      {open && (
        <div
          dir={isArabic ? 'rtl' : 'ltr'}
          className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-4 w-64 animate-fade-in cursor-pointer"
          onClick={openChat}>
          <div className="flex justify-between items-start">
            <p className="text-sm font-semibold">WhatsApp</p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setOpen(false)
              }}
              className="text-gray-500 dark:text-gray-400 text-xs">
              ✕
            </button>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
            {isArabic ? 'نحن هنا للمساعدة 👋' : 'We are here to help 👋'}
          </p>

          <div className="mt-2 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-2 rounded-md text-center transition">
            {isArabic ? 'افتح الدردشة' : 'Open Chat'}
          </div>
        </div>
      )}

      <button
        onClick={() => (open ? openChat() : setOpen(true))}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg hover:scale-110 transition">
        <svg width="38px" height="38px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
            fill="#0F0F0F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
            fill="#0F0F0F"
          />
        </svg>
      </button>
    </div>
  )
}
