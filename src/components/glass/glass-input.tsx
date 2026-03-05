import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const glassInputVariants = cva(
  "w-full min-w-0 rounded-lg border border-white/15 bg-white/5 text-white/90 placeholder:text-white/40 outline-none transition-[color,box-shadow,border-color] focus-visible:border-white/30 focus-visible:ring-[3px] focus-visible:ring-white/10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-9 px-3 py-1 text-sm",
        sm: "h-7 px-2 py-0.5 text-xs",
        lg: "h-11 px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function GlassInput({
  className,
  size,
  type,
  style,
  ...props
}: React.ComponentProps<"input"> &
  VariantProps<typeof glassInputVariants>) {
  return (
    <input
      type={type}
      data-slot="glass-input"
      data-size={size ?? "default"}
      className={cn(glassInputVariants({ size }), className)}
      style={{
        backdropFilter:
          "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
        WebkitBackdropFilter:
          "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
        ...style,
      }}
      {...props}
    />
  )
}

export { GlassInput, glassInputVariants }
