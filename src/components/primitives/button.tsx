import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { useLocale } from 'next-intl'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  ' inline-flex items-center justify-center rounded-full leading-4 font-medium transition-all duration-300 ',
  {
    variants: {
      variant: {
        primary:
          'flex button-gradient h-[56px] rounded-full px-6 py-4 text-center items-center justify-center text-white !bg-black disabled:pointer-events-none disabled:bg-opacity-20 disabled:text-opacity-90',
        secondary:
          'btn-gradient-secondary bg-white backdrop-blur-[40px] text-black hover:text-primary-purple hover:shadow-[0px_12px_40px_0px_#A578F240] hover:bg-[#F6F1FE] active:text-[#8759D5] disabled:pointer-events-none disabled:bg-opacity-30 disabled:text-opacity-40 disabled:text-white',
        purple:
          'btn-gradient-purple bg-primary-purple text-white hover:bg-secondary-purple hover:shadow-[0px_12px_30px_0px_#A578F240] active:bg-none active:bg-primary-purple active:shadow-none disabled:pointer-events-none disabled:bg-opacity-20 disabled:text-opacity-90',
        hero: 'bg-white text-primary-purple border border-secondary-400 hover:bg-primary-purple hover:text-white hover:shadow-[0px_12px_30px_0px_#A578F240] active:bg-none active:bg-secondary-purple active:shadow-none disabled:pointer-events-none disabled:bg-opacity-20 disabled:text-opacity-90',
        academy:
          'h-[56px] px-8 py-4 rounded-full text-primary-green bg-light-green hover:bg-[#0EC2B4] hover:text-white active:bg-[#05A59A] active:text-white disabled:bg-[#D7DCE3] disabled:text-white/70  disabled:pointer-events-none'
      },
      size: {
        md: 'h-14 px-6 py-5',
        lg: 'h-16 px-8 py-5'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

type PolymorphicProps<E extends React.ElementType> = {
  as?: E
  asChild?: boolean
  href?: string
  disabled?: boolean
  className?: string
} & VariantProps<typeof buttonVariants> &
  // важливо: уникаємо конфліктів типів з базовими пропами елемента
  Omit<React.ComponentPropsWithoutRef<E>, 'className' | 'href' | 'disabled'>

type ButtonType = (<E extends React.ElementType = 'button'>(
  props: PolymorphicProps<E>
) => React.ReactElement | null) & {
  displayName?: string
}

export const Button: ButtonType = (props) => {
  const { as, asChild = false, href, disabled, className, variant, size, ...rest } = props as PolymorphicProps<any>

  const locale = useLocale()
  const isArabic = locale === 'ar'
  const fontClass = isArabic ? 'font-kanun-ar' : 'font-poppins'

  // якщо є href — рендеримо <a>, інакше <button> (або те, що передали в as)
  const Comp = asChild ? Slot : as ?? (href ? 'a' : 'button')

  const classes = cn(buttonVariants({ variant, size }), fontClass, className)

  // коректна поведінка disabled для <a>
  const linkDisableProps =
    href && disabled
      ? {
          'aria-disabled': true,
          tabIndex: -1,
          onClick: (e: React.MouseEvent) => {
            e.preventDefault()
          }
        }
      : {}

  return (
    <Comp
      href={href}
      disabled={Comp === 'button' ? disabled : undefined}
      type={Comp === 'button' ? (rest as any).type ?? 'button' : undefined}
      className={classes}
      {...linkDisableProps}
      {...(rest as any)}
    />
  )
}

Button.displayName = 'Button'

export { buttonVariants }
