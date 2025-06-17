'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

type FadeVariant = 'fade' | 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'zoom'

const variantMap: Record<FadeVariant, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  'fade-down': {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 }
  },
  'slide-left': {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  },
  'slide-right': {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }
}

type Props = {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  variant?: FadeVariant
}

export const FadeInOnView = ({ children, delay = 0.1, duration = 0.7, className = '', variant = 'fade' }: Props) => {
  const variants = variantMap[variant]

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      transition={{ duration, delay }}
      variants={variants}>
      {children}
    </motion.div>
  )
}
