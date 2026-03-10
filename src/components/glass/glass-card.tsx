'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  useElasticDrag,
  type ElasticDragOptions,
} from '@/hooks/use-elastic-drag'
import usePrefersReducedMotion from '@/hooks/use-prefers-reduced-motion'

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value)
  else if (ref) (ref as React.MutableRefObject<T | null>).current = value
}

function GlassCard({
  className,
  style,
  elastic = false,
  elasticOptions,
  ref,
  onPointerDown,
  ...props
}: React.ComponentProps<'div'> & {
  elastic?: boolean
  elasticOptions?: ElasticDragOptions
}) {
  const drag = useElasticDrag({
    threshold: 8,
    squish: 0.08,
    squishOnDrag: false,
    elasticity: 0.05,
    ...elasticOptions,
  })

  const prefersReducedMotion = usePrefersReducedMotion()

  const mergedRef = (node: HTMLDivElement | null) => {
    if (elastic) setRef(drag.ref as React.Ref<HTMLDivElement>, node)
    setRef(ref, node)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (elastic) drag.onPointerDown(e)
    onPointerDown?.(e)
  }

  return (
    <div
      ref={mergedRef}
      data-slot='glass-card'
      className={cn(
        'flex flex-col gap-6 rounded-2xl border border-white/15 py-6 text-white/90',
        elastic && 'touch-pan-y',
        elastic &&
          !prefersReducedMotion &&
          'cursor-grab active:cursor-grabbing',
        className,
      )}
      style={{
        backdropFilter:
          'blur(var(--glass-blur)) saturate(var(--glass-saturation)) brightness(var(--glass-brightness))',
        WebkitBackdropFilter:
          'blur(var(--glass-blur)) saturate(var(--glass-saturation)) brightness(var(--glass-brightness))',
        boxShadow:
          'inset 0 0 0 1px var(--glass-rim-border), inset 0 2px var(--glass-rim-top-spread) var(--glass-rim-top), inset 0 -16px var(--glass-rim-bottom-spread) var(--glass-rim-bottom), var(--glass-shadow)',
        ...style,
      }}
      onPointerDown={handlePointerDown}
      {...props}
    />
  )
}

function GlassCardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='glass-card-header'
      className={cn(
        'grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=glass-card-action]:grid-cols-[1fr_auto]',
        className,
      )}
      {...props}
    />
  )
}

function GlassCardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='glass-card-title'
      className={cn('leading-none font-semibold text-white/95', className)}
      {...props}
    />
  )
}

function GlassCardDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='glass-card-description'
      className={cn('text-sm text-white/60', className)}
      {...props}
    />
  )
}

function GlassCardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='glass-card-action'
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function GlassCardContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='glass-card-content'
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function GlassCardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='glass-card-footer'
      className={cn('flex items-center px-6', className)}
      {...props}
    />
  )
}

export {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardAction,
  GlassCardContent,
  GlassCardFooter,
}
