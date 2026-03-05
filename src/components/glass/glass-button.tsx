"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"
import { useElasticDrag } from "@/hooks/use-elastic-drag"

const glassButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-all outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "text-white/88 border border-white/15  active:scale-[0.97]",
        primary:
          "bg-white/90 text-black/80 border border-white/60  active:scale-[0.97]",
        outline:
          "border border-white/20 text-white/80 bg-transparent hover:bg-white/5  active:scale-[0.97]",
        ghost:
          "text-white/70 bg-transparent hover:bg-white/10 hover:text-white/90 active:scale-[0.97]",
      },
      size: {
        default: "h-9 px-5 py-2",
        sm: "h-7 gap-1.5 px-3 text-xs",
        lg: "h-11 px-8 text-base",
        icon: "size-9",
        "icon-sm": "size-7",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const glassButtonStyles: Record<string, React.CSSProperties> = {
  default: {
    backdropFilter:
      "blur(var(--glass-blur)) saturate(var(--glass-saturation)) brightness(var(--glass-brightness))",
    WebkitBackdropFilter:
      "blur(var(--glass-blur)) saturate(var(--glass-saturation)) brightness(var(--glass-brightness))",
    boxShadow:
      "inset 0 0 0 1px var(--glass-rim-border), inset 0 1px 2px var(--glass-rim-top), var(--glass-shadow)",
  },
  primary: {
    boxShadow: "inset 0 1px 0 rgba(255,255,255,1), 0 4px 16px rgba(0,0,0,0.22)",
  },
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value)
  else if (ref) (ref as React.MutableRefObject<T | null>).current = value
}

function GlassButton({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  elastic = true,
  style,
  ref,
  onPointerDown,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof glassButtonVariants> & {
    asChild?: boolean
    elastic?: boolean
  }) {
  const drag = useElasticDrag()
  const Comp = asChild ? Slot.Root : "button"

  const mergedRef = (node: HTMLButtonElement | null) => {
    if (elastic) setRef(drag.ref as React.Ref<HTMLButtonElement>, node)
    setRef(ref, node)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (elastic) drag.onPointerDown(e)
    onPointerDown?.(e)
  }

  return (
    <Comp
      ref={mergedRef}
      data-slot="glass-button"
      data-variant={variant}
      data-size={size}
      className={cn(glassButtonVariants({ variant, size }), className)}
      style={{ ...glassButtonStyles[variant ?? "default"], ...style }}
      onPointerDown={handlePointerDown}
      {...props}
    />
  )
}

export { GlassButton, glassButtonVariants }
