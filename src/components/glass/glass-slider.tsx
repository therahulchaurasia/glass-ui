"use client"

import * as React from "react"
import { Slider } from "radix-ui"
import { cn } from "@/lib/utils"

function GlassSlider({
  className,
  style,
  ...props
}: React.ComponentProps<typeof Slider.Root>) {
  const thumbCount = (props.value ?? props.defaultValue ?? [0]).length

  return (
    <Slider.Root
      data-slot="glass-slider"
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-disabled:opacity-50",
        className,
      )}
      style={style}
      {...props}
    >
      <Slider.Track
        data-slot="glass-slider-track"
        className="relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5"
        style={{
          background: "rgba(255,255,255,0.14)",
          boxShadow:
            "inset 0 1px 2px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(0,0,0,0.12)",
        }}
      >
        <Slider.Range
          data-slot="glass-slider-range"
          className="absolute rounded-full data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full data-[orientation=vertical]:left-0"
          style={{
            background:
              props.orientation === "vertical"
                ? "linear-gradient(to top, rgba(255,255,255,0.5), rgba(255,255,255,0.78))"
                : "linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0.78))",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
          }}
        />
      </Slider.Track>

      {Array.from({ length: thumbCount }).map((_, i) => (
        <GlassSliderThumb key={i} orientation={props.orientation} />
      ))}
    </Slider.Root>
  )
}

// ─── Thumb ────────────────────────────────────────────────────────────────────
// Slightly more compact pill to better match the Apple reference.
const THUMB_W = 54
const THUMB_H = 32

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}

function setGlassActive(
  pill: HTMLDivElement,
  filterEl: HTMLDivElement,
  overlayEl: HTMLDivElement,
  specularEl: HTMLDivElement,
  active: boolean,
) {
  if (active) {
    pill.style.background = "transparent"
    pill.style.boxShadow =
      "inset 0 0 0 1px rgba(255,255,255,0.15), inset 0 1px 2px rgba(255,255,255,0.4), 0 12px 40px rgba(0,0,0,0.2)"
    filterEl.style.opacity = "1"
    overlayEl.style.opacity = "0.5"
    specularEl.style.opacity = "1"
  } else {
    pill.style.background = "#fff"
    pill.style.boxShadow =
      "0 1px 8px 0 rgba(0,30,63,0.12), 0 0 2px 0 rgba(0,9,20,0.10)"
    filterEl.style.opacity = "0"
    overlayEl.style.opacity = "0"
    specularEl.style.opacity = "0"
  }
}

function GlassSliderThumb({
  className,
  orientation,
  ...props
}: React.ComponentProps<typeof Slider.Thumb> & {
  orientation?: "horizontal" | "vertical"
}) {
  const isVertical = orientation === "vertical"
  const pillRef = React.useRef<HTMLDivElement>(null)
  const filterRef = React.useRef<HTMLDivElement>(null)
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const specularRef = React.useRef<HTMLDivElement>(null)
  const animRef = React.useRef<Animation | null>(null)
  const isDragging = React.useRef(false)
  const isHovered = React.useRef(false)

  const prevPos = React.useRef(0)
  const prevT = React.useRef(0)
  const currentSx = React.useRef(1)
  const currentSy = React.useRef(1)

  const applyHoverScale = (pill: HTMLDivElement, scale: number) => {
    pill.style.transition = "transform 160ms cubic-bezier(0.34,1.56,0.64,1)"
    pill.style.transform = scale === 1 ? "" : `scale(${scale})`
  }

  const handlePointerEnter = () => {
    const pill = pillRef.current
    if (!pill || isDragging.current || animRef.current) return
    isHovered.current = true
    applyHoverScale(pill, 1.22)
  }

  const handlePointerLeave = () => {
    const pill = pillRef.current
    if (!pill) return
    isHovered.current = false
    if (isDragging.current || animRef.current) return
    applyHoverScale(pill, 1)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    const pill = pillRef.current
    const filterEl = filterRef.current
    const overlayEl = overlayRef.current
    const specularEl = specularRef.current
    if (!pill || !filterEl || !overlayEl || !specularEl) return

    if (animRef.current) {
      animRef.current.cancel()
      animRef.current = null
    }

    isDragging.current = true
    currentSx.current = 1
    currentSy.current = 1
    prevPos.current = isVertical ? e.clientY : e.clientX
    prevT.current = e.timeStamp

    setGlassActive(pill, filterEl, overlayEl, specularEl, true)

    pill.style.transition =
      "background 200ms ease, box-shadow 200ms ease, transform 180ms cubic-bezier(0.34,1.56,0.64,1)"
    pill.style.transform = "scale(1.25)"

    setTimeout(() => {
      if (isDragging.current && pillRef.current) {
        pillRef.current.style.transition =
          "background 200ms ease, box-shadow 200ms ease"
      }
    }, 220)

    const handleMove = (ev: PointerEvent) => {
      if (!isDragging.current) return

      const dt = ev.timeStamp - prevT.current
      const pos = isVertical ? ev.clientY : ev.clientX
      const delta = pos - prevPos.current
      const vel = dt > 0 ? delta / dt : 0

      prevPos.current = pos
      prevT.current = ev.timeStamp

      const speed = Math.abs(vel)
      if (isVertical) {
        // For vertical: stretch along Y, compress along X
        const sy = 1 + clamp(speed * 0.25, 0, 0.5)
        const sx = 1 - clamp(speed * 0.19, 0, 0.5)
        currentSx.current = sx
        currentSy.current = sy
      } else {
        // For horizontal: stretch along X, compress along Y
        const sx = 1 + clamp(speed * 0.21, 0, 0.5)
        const sy = 1 - clamp(speed * 0.16, 0, 0.5)
        currentSx.current = sx
        currentSy.current = sy
      }
      pill.style.transition = "background 200ms ease, box-shadow 200ms ease"
      pill.style.transform = `scale(1.25) scaleX(${currentSx.current}) scaleY(${currentSy.current})`
    }

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerup", handleUp)
      isDragging.current = false

      if (!pill || !filterEl || !overlayEl || !specularEl) return

      const fromSx = currentSx.current
      const fromSy = currentSy.current

      setGlassActive(pill, filterEl, overlayEl, specularEl, false)

      const squish = 0.18
      const b1 = squish * 0.7
      const b2 = squish * 0.3
      const b3 = squish * 0.1

      // For vertical, swap the bounce axes so the wobble follows the drag direction
      const bounceKeyframes = isVertical
        ? [
            {
              transform: `scale(1.25) scaleX(${fromSx}) scaleY(${fromSy})`,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
            {
              transform: `scaleX(${1 - b1}) scaleY(${1 + b1})`,
              offset: 0.28,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
            {
              transform: `scaleX(${1 + b2}) scaleY(${1 - b2})`,
              offset: 0.52,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
            {
              transform: `scaleX(${1 - b3}) scaleY(${1 + b3})`,
              offset: 0.74,
              easing: "cubic-bezier(0.33, 0, 0, 1)",
            },
            { transform: "scale(1)" },
          ]
        : [
            {
              transform: `scale(1.25) scaleX(${fromSx}) scaleY(${fromSy})`,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
            {
              transform: `scaleX(${1 + b1}) scaleY(${1 - b1})`,
              offset: 0.28,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
            {
              transform: `scaleX(${1 - b2}) scaleY(${1 + b2})`,
              offset: 0.52,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
            {
              transform: `scaleX(${1 + b3}) scaleY(${1 - b3})`,
              offset: 0.74,
              easing: "cubic-bezier(0.33, 0, 0, 1)",
            },
            { transform: "scale(1)" },
          ]

      animRef.current = pill.animate(bounceKeyframes, {
        duration: 700,
        easing: "linear",
      })

      animRef.current.onfinish = () => {
        if (pillRef.current) {
          if (isHovered.current) {
            applyHoverScale(pillRef.current, 1.22)
          } else {
            pillRef.current.style.transform = ""
          }
          pillRef.current.style.transition = ""
        }
        animRef.current = null
      }
    }

    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerup", handleUp)
  }

  return (
    <Slider.Thumb
      data-slot="glass-slider-thumb"
      className={cn(
        "block outline-none! ring-0! disabled:pointer-events-none",
        className,
      )}
      style={{
        width: isVertical ? THUMB_H : THUMB_W,
        height: isVertical ? THUMB_W : THUMB_H,
        overflow: "visible",
      }}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {/* Inner visual pill */}
      <div
        ref={pillRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 9999,
          cursor: "pointer",
          willChange: "transform",
          background: "#fff",
          boxShadow:
            "0 1px 8px 0 rgba(0,30,63,0.12), 0 0 2px 0 rgba(0,9,20,0.10)",
        }}
      >
        {/* Backdrop blur layer */}
        <div
          ref={filterRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            borderRadius: "inherit",
            overflow: "hidden",
            backdropFilter: "blur(0.3px) saturate(180%) brightness(0.9)",
            WebkitBackdropFilter: "blur(0.3px) saturate(180%) brightness(0.9)",
            opacity: 0,
            transition: "opacity 200ms ease",
          }}
        />
        {/* White tint overlay */}
        <div
          ref={overlayRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            borderRadius: "inherit",
            overflow: "hidden",
            backgroundColor: "rgba(255,255,255,0.10)",
            opacity: 0,
            transition: "opacity 200ms ease",
          }}
        />
        {/* Specular / rim highlights */}
        <div
          ref={specularRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            borderRadius: "inherit",
            overflow: "hidden",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.15), inset 0 1px 2px rgba(255,255,255,0.4)",
            opacity: 0,
            transition: "opacity 200ms ease",
          }}
        />
      </div>
    </Slider.Thumb>
  )
}

export { GlassSlider, GlassSliderThumb }
