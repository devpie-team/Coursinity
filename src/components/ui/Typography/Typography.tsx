import clsx from 'clsx'

type TypographyProps = {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4'
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'body3' | 'body4' | 'button' | 'caption'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  children: React.ReactNode
  className?: string
}

const variantMap = {
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  h5: 'text-h5',
  h6: 'text-h6',
  body1: 'text-body1',
  body2: 'text-body2',
  body3: 'text-body3',
  body4: 'text-body4',
  button: 'button',
  caption: 'text-caption'
} as const

const weightMap = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
}

export const Typography = ({
  as: Component = 'p',
  variant = 'body1',
  weight = 'regular',
  children,
  className = ''
}: TypographyProps) => {
  return <Component className={clsx(variantMap[variant], weightMap[weight], className)}>{children}</Component>
}
