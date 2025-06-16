import clsx from 'clsx'
import { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react'
import React from 'react'

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'button'
  | 'caption'
  | 'subtitle'

type Weight = 'regular' | 'medium' | 'semibold' | 'bold'

type TypographyProps<T extends ElementType> = {
  as?: T
  variant?: Variant
  weight?: Weight
  className?: string
  children: ReactNode
} & ComponentPropsWithoutRef<T>

const variantMap: Record<Variant, string> = {
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
  button: 'text-button',
  caption: 'text-caption',
  subtitle: 'text-subtitle'
}

const weightMap: Record<Weight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
}

export const Typography = <T extends ElementType = 'p'>({
  as,
  variant = 'body1',
  weight = 'regular',
  className,
  children,
  ...props
}: TypographyProps<T>) => {
  const Component = as || 'p'
  const combinedClassName = clsx(variantMap[variant], weightMap[weight], 'font-poppins', className)

  return React.createElement(Component, { className: combinedClassName, ...props }, children)
}
