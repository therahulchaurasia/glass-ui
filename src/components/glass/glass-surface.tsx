"use client"
// components/glass/glass-surface.tsx
import { cn } from "@/lib/utils"

interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  disablePress?: boolean
}

export function GlassSurface({
  children,
  className,
  disablePress = false,
  style,
  ...props
}: GlassSurfaceProps) {
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disablePress) return
    const el = e.currentTarget
    el.style.transform = "scale(0.992)"
    el.style.transition = `transform 80ms var(--ease-snappy)`
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disablePress) return
    const el = e.currentTarget
    el.style.transform = "scale(1)"
    el.style.transition = `transform 400ms var(--ease-spring)`
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        backdropFilter: `blur(var(--glass-blur)) saturate(var(--glass-saturation)) brightness(var(--glass-brightness))`,
        WebkitBackdropFilter: `blur(var(--glass-blur)) saturate(var(--glass-saturation)) brightness(var(--glass-brightness))`,
        ...style,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      {...props}
    >
      {/* Rim + shadow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          boxShadow: `
            inset 0 0 0 1px var(--glass-rim-border),
            inset 0 2px var(--glass-rim-top-spread) var(--glass-rim-top),
            inset 0 -16px var(--glass-rim-bottom-spread) var(--glass-rim-bottom),
            inset 0 8px 24px var(--glass-rim-inner-glow),
            var(--glass-shadow)
          `,
        }}
      />

      {/* Dome glare */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,var(--glass-dome-opacity)) 0%, rgba(255,255,255,0) 60%)`,
        }}
      />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          opacity: "var(--glass-grain-opacity)",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
