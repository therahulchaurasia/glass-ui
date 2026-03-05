"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function GlassTabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="glass-tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

const glassTabsListVariants = cva(
  "inline-flex w-fit items-center justify-center gap-1 rounded-xl p-1 text-white/60",
  {
    variants: {
      variant: {
        default: "border border-white/10 bg-white/5",
        line: "rounded-none border-b border-white/10 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function GlassTabsList({
  className,
  variant = "default",
  style,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof glassTabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="glass-tabs-list"
      data-variant={variant}
      className={cn(glassTabsListVariants({ variant }), className)}
      style={
        variant === "default"
          ? {
              backdropFilter:
                "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
              WebkitBackdropFilter:
                "blur(var(--glass-blur)) saturate(var(--glass-saturation))",
              ...style,
            }
          : style
      }
      {...props}
    />
  )
}

function GlassTabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="glass-tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all",
        "text-white/60 hover:text-white/80",
        "focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:outline-hidden",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-white/10 data-[state=active]:text-white/95 data-[state=active]:shadow-sm",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function GlassTabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="glass-tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export {
  GlassTabs,
  GlassTabsList,
  GlassTabsTrigger,
  GlassTabsContent,
  glassTabsListVariants,
}
