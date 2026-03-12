'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import { cn } from '@/lib/utils'
import {
	useElasticDrag,
	type ElasticDragOptions,
} from '@/hooks/use-elastic-drag'

const glassButtonVariants = cva(
	"inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-all outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: 'text-white/88 border border-white/15 ',
				primary: 'bg-white/90 text-black/80 border border-white/60 ',
				outline:
					'border border-white/20 text-white/80 bg-transparent hover:bg-white/5 ',
				ghost:
					'text-white/70 bg-transparent hover:bg-white/10 hover:text-white/90',
			},
			size: {
				default: 'h-9 px-5 py-2',
				sm: 'h-7 gap-1.5 px-3 text-xs',
				lg: 'h-11 px-8 text-base',
				icon: 'size-9',
				'icon-sm': 'size-7',
				'icon-lg': 'size-11',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

const glassButtonStyles: Record<string, React.CSSProperties> = {
	default: {
		backdropFilter:
			'blur(var(--glass-blur)) saturate(var(--glass-saturation)) brightness(var(--glass-brightness))',
		WebkitBackdropFilter:
			'blur(var(--glass-blur)) saturate(var(--glass-saturation)) brightness(var(--glass-brightness))',
		boxShadow:
			'inset 0 0 0 1px var(--glass-rim-border), inset 0 1px 2px var(--glass-rim-top), var(--glass-shadow)',
	},
	primary: {
		boxShadow: 'inset 0 1px 0 rgba(255,255,255,1), 0 4px 16px rgba(0,0,0,0.22)',
	},
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
	if (typeof ref === 'function') ref(value)
	else if (ref) (ref as React.MutableRefObject<T | null>).current = value
}

function GlassButton({
	className,
	variant = 'default',
	size = 'default',
	asChild = false,
	elastic = true,
	elasticOptions,
	style,
	ref,
	onPointerDown,
	onClick,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof glassButtonVariants> & {
		asChild?: boolean
		elastic?: boolean
		elasticOptions?: ElasticDragOptions
	}) {
	const drag = useElasticDrag({ ...elasticOptions })
	const buttonRef = React.useRef<HTMLButtonElement | null>(null)
	const Comp = asChild ? Slot.Root : 'button'

	const mergedRef = (node: HTMLButtonElement | null) => {
		buttonRef.current = node
		if (elastic) setRef(drag.ref as React.Ref<HTMLButtonElement>, node)
		setRef(ref, node)
	}

	const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
		if (elastic) drag.onPointerDown(e)
		onPointerDown?.(e)
	}

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const el = buttonRef.current
		if (el && !elastic) {
			el.animate(
				[
					{ transform: 'scale(1)', easing: 'ease-out' },
					{
						transform: 'scale(0.93)',
						offset: 0.25,
						easing: 'cubic-bezier(0.22,1,0.36,1)',
					},
					{
						transform: 'scale(1.04)',
						offset: 0.55,
						easing: 'cubic-bezier(0.4,0,0.2,1)',
					},
					{
						transform: 'scale(0.985)',
						offset: 0.78,
						easing: 'cubic-bezier(0.33,0,0,1)',
					},
					{ transform: 'scale(1)' },
				],
				{ duration: 500, easing: 'linear' }
			)
		}
		onClick?.(e)
	}

	return (
		<Comp
			ref={mergedRef}
			data-slot='glass-button'
			data-variant={variant}
			data-size={size}
			data-no-parent-drag={elastic ? '' : undefined}
			className={cn(
				glassButtonVariants({ variant, size }),
				elastic && 'touch-pan-y',
				className,
			)}
			style={{ ...glassButtonStyles[variant ?? 'default'], ...style }}
			onPointerDown={handlePointerDown}
			onClick={handleClick}
			{...props}
		/>
	)
}

export { GlassButton, glassButtonVariants }
