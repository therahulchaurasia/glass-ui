// components/glass/glass-button.tsx
import { cn } from "@/lib/utils"
import { GlassSurface } from "./glass-surface"

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: "default" | "primary"
}

export function GlassButton({
  children,
  className,
  variant = "default",
  ...props
}: GlassButtonProps) {
  if (variant === "primary") {
    return (
      <button
        className={cn(
          "relative cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium",
          "bg-white/90 text-black/80 border border-white/60",
          "transition-transform duration-150",
          "hover:-translate-y-px active:scale-[0.97]",
          className
        )}
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,1), 0 4px 16px rgba(0,0,0,0.22)",
        }}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    // GlassSurface handles press spring automatically
    <GlassSurface
      as="button"
      className={cn(
        "cursor-pointer rounded-full px-6 py-2.5 text-sm text-white/88",
        "transition-transform duration-200",
        "hover:-translate-y-px",
        className
      )}
      {...(props as any)}
    >
      {children}
    </GlassSurface>
  )
}