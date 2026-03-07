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
  const isPointerDownRef = React.useRef(false)

  React.useEffect(() => {
    const handleGlobalUp = () => {
      isPointerDownRef.current = false
    }
    window.addEventListener("pointerup", handleGlobalUp)
    return () => window.removeEventListener("pointerup", handleGlobalUp)
  }, [])

  return (
    <Slider.Root
      data-slot="glass-slider"
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-disabled:opacity-50",
        className,
      )}
      style={style}
      onPointerDown={() => {
        isPointerDownRef.current = true
      }}
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
        <GlassSliderThumb
          key={i}
          orientation={props.orientation}
          isPointerDownRef={isPointerDownRef}
        />
      ))}
    </Slider.Root>
  )
}

// ─── Thumb ────────────────────────────────────────────────────────────────────
// Slightly more compact pill to better match the Apple reference.
const THUMB_W = 48
const THUMB_H = 28

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
  isPointerDownRef,
  ...props
}: React.ComponentProps<typeof Slider.Thumb> & {
  orientation?: "horizontal" | "vertical"
  isPointerDownRef?: React.RefObject<boolean>
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

  // Store current window listeners so they can be removed on crossover departure
  const moveHandlerRef = React.useRef<((ev: PointerEvent) => void) | null>(null)
  const upHandlerRef = React.useRef<(() => void) | null>(null)

  // ─── Wobble-on-pause system ──────────────────────────────────────────
  //
  // HOW IT WORKS:
  // During drag, each pointermove event resets a 50ms timer. If no more
  // move events arrive within 50ms (user stopped moving but is still
  // holding), the timer fires and plays a "wobble" animation.
  //
  // The wobble transitions the pill from its current squished shape
  // back to the resting scale(1.25), using a damped spring pattern
  // (big bounce → counter-bounce → settle). A subtle skew is layered
  // on top to give the wobble a directional feel — like liquid sloshing
  // in the direction of motion.
  //
  // REFS:
  //   pauseTimerRef  — the 50ms setTimeout ID; cleared on every move
  //   lastVelRef     — signed velocity in px/ms (+right/down, -left/up)
  //   pauseAnimRef   — the running wobble Animation object (cancelable)
  //
  const pauseTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastVelRef = React.useRef(0)
  const pauseAnimRef = React.useRef<Animation | null>(null)

  /** Cancel both the pending timer and any in-flight wobble animation */
  const clearPauseTimer = () => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current)
      pauseTimerRef.current = null
    }
    if (pauseAnimRef.current) {
      pauseAnimRef.current.cancel()
      pauseAnimRef.current = null
    }
  }

  /**
   * Plays the wobble animation when the user pauses mid-drag.
   *
   * Two effects are layered in every keyframe:
   *
   *   1. SQUISH (scaleX / scaleY)
   *      Bounces from the current stretched shape back to round.
   *      Same deformation axis used during drag — horizontal sliders
   *      stretch width (scaleX > 1, scaleY < 1), vertical do the opposite.
   *
   *   2. SKEW (skewY for horizontal / skewX for vertical)
   *      Adds a directional lean so the bounce appears to come from
   *      the drag direction. Think of a jelly cube sliding right and
   *      hitting a wall — the right side bulges forward.
   *
   * INTENSITY:
   *   Raw speed (|velocity|) is normalised to 0..1 via `speed / 1.8`.
   *   Below 0.05 → no visible wobble, early return.
   *   All amplitudes (squish `w` and skew angles `s`) scale linearly
   *   with intensity so slow drags → barely visible, fast → pronounced.
   *
   * SPRING PATTERN (damped oscillation):
   *   Keyframe   Offset   Purpose
   *   ─────────  ──────   ───────────────────────────────────
   *   0 (from)   0%       Current squished shape, no skew
   *   1          30%      Biggest bounce (65% of w, full skew)
   *   2          55%      Counter-bounce (25% of w, 35% skew opposite)
   *   3          78%      Tiny settle    (8% of w, 10% skew)
   *   4 (rest)   100%     scale(1.25), no skew — perfectly round
   */
  const runPauseWobble = (pill: HTMLDivElement) => {
    if (!isDragging.current) return

    // Snapshot the current squish deformation — this is keyframe 0
    const fromSx = currentSx.current
    const fromSy = currentSy.current

    // ── Intensity: normalise speed to 0..1 ──
    const speed = Math.abs(lastVelRef.current)
    const intensity = clamp(speed / 1.8, 0, 1)
    if (intensity < 0.05) return

    // ── Skew direction ──
    // Negative dir → skewY tilts the shape visually toward drag direction
    // (dragging right → dir = -1 → skewY(-4°) leans the shape right)
    const dir = lastVelRef.current >= 0 ? -1 : 1
    const skewAxis = isVertical ? "skewX" : "skewY"

    // ── Skew angles (degrees) — each step is smaller (damped) ──
    const maxSkew = 2
    const s1 = maxSkew * intensity * dir // biggest lean
    const s2 = maxSkew * 0.35 * intensity * -dir // counter-lean (opposite)
    const s3 = maxSkew * 0.1 * intensity * dir // tiny settle

    // ── Squish amplitudes — same damping pattern ──
    // w  = total deformation budget at this intensity (max 0.32)
    // w1 = 65% of w  →  first bounce (most noticeable)
    // w2 = 25% of w  →  counter-bounce
    // w3 =  8% of w  →  settle (barely visible)
    const w = 0.32 * intensity
    const w1 = w * 0.45
    const w2 = w * 0.25
    const w3 = w * 0.08

    // ── Build keyframes ──
    // Vertical: stretches height (scaleY > 1) and compresses width
    // Horizontal: stretches width (scaleX > 1) and compresses height
    const keyframes = isVertical
      ? [
          // Keyframe 0: current squished shape (starting point)
          {
            transform: `scale(1.25) scaleX(${fromSx}) scaleY(${fromSy})`,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          },
          // Keyframe 1 @ 30%: biggest bounce + directional lean
          {
            transform: `scale(1.25) ${skewAxis}(${s1}deg) scaleX(${1 - w1}) scaleY(${1 + w1})`,
            offset: 0.3,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
          // Keyframe 2 @ 55%: counter-bounce + opposite lean
          {
            transform: `scale(1.25) ${skewAxis}(${s2}deg) scaleX(${1 + w2}) scaleY(${1 - w2})`,
            offset: 0.55,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
          // Keyframe 3 @ 78%: subtle settle
          {
            transform: `scale(1.25) ${skewAxis}(${s3}deg) scaleX(${1 - w3}) scaleY(${1 + w3})`,
            offset: 0.78,
            easing: "cubic-bezier(0.33, 0, 0, 1)",
          },
          // Keyframe 4 @ 100%: rest — perfectly round glass thumb
          { transform: "scale(1.25)" },
        ]
      : [
          {
            transform: `scale(1.25) scaleX(${fromSx}) scaleY(${fromSy})`,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          },
          {
            transform: `scale(1.25) ${skewAxis}(${s1}deg) scaleX(${1 + w1}) scaleY(${1 - w1})`,
            offset: 0.3,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
          {
            transform: `scale(1.25) ${skewAxis}(${s2}deg) scaleX(${1 - w2}) scaleY(${1 + w2})`,
            offset: 0.55,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
          {
            transform: `scale(1.25) ${skewAxis}(${s3}deg) scaleX(${1 + w3}) scaleY(${1 - w3})`,
            offset: 0.78,
            easing: "cubic-bezier(0.33, 0, 0, 1)",
          },
          { transform: "scale(1.25)" },
        ]

    pauseAnimRef.current = pill.animate(keyframes, {
      duration: 800,
      easing: "linear",
    })

    // When the animation finishes naturally, lock the pill at scale(1.25)
    // and reset the squish tracking so the next drag starts fresh.
    pauseAnimRef.current.onfinish = () => {
      if (isDragging.current && pillRef.current) {
        pillRef.current.style.transform = "scale(1.25)"
      }
      currentSx.current = 1
      currentSy.current = 1
      pauseAnimRef.current = null
    }
  }

  const applyHoverScale = (pill: HTMLDivElement, scale: number) => {
    pill.style.transition = "transform 160ms cubic-bezier(0.34,1.56,0.64,1)"
    pill.style.transform = scale === 1 ? "" : `scale(${scale})`
  }

  /** Shared release logic — deactivates glass and plays bounce animation */
  const runRelease = () => {
    clearPauseTimer()

    // Remove any active window listeners
    if (moveHandlerRef.current) {
      window.removeEventListener("pointermove", moveHandlerRef.current)
      moveHandlerRef.current = null
    }
    if (upHandlerRef.current) {
      window.removeEventListener("pointerup", upHandlerRef.current)
      upHandlerRef.current = null
    }

    isDragging.current = false

    const pill = pillRef.current
    const filterEl = filterRef.current
    const overlayEl = overlayRef.current
    const specularEl = specularRef.current
    if (!pill || !filterEl || !overlayEl || !specularEl) return

    const fromSx = currentSx.current
    const fromSy = currentSy.current

    setGlassActive(pill, filterEl, overlayEl, specularEl, false)

    const squish = 0.18
    const b1 = squish * 0.7
    const b2 = squish * 0.3
    const b3 = squish * 0.1

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

  /** Create and attach pointermove/pointerup listeners for squish + release */
  const attachDragListeners = (pill: HTMLDivElement) => {
    // Remove any stale listeners first
    if (moveHandlerRef.current) {
      window.removeEventListener("pointermove", moveHandlerRef.current)
    }
    if (upHandlerRef.current) {
      window.removeEventListener("pointerup", upHandlerRef.current)
    }

    const handleMove = (ev: PointerEvent) => {
      if (!isDragging.current) return

      // Cancel any running pause wobble — user is moving again
      if (pauseAnimRef.current) {
        pauseAnimRef.current.cancel()
        pauseAnimRef.current = null
      }

      const dt = ev.timeStamp - prevT.current
      const pos = isVertical ? ev.clientY : ev.clientX
      const delta = pos - prevPos.current
      const vel = dt > 0 ? delta / dt : 0

      prevPos.current = pos
      prevT.current = ev.timeStamp

      const speed = Math.abs(vel)
      lastVelRef.current = vel

      if (isVertical) {
        const sy = 1 + clamp(speed * 0.25, 0, 0.5)
        const sx = 1 - clamp(speed * 0.19, 0, 0.5)
        currentSx.current = sx
        currentSy.current = sy
      } else {
        const sx = 1 + clamp(speed * 0.21, 0, 0.5)
        const sy = 1 - clamp(speed * 0.16, 0, 0.5)
        currentSx.current = sx
        currentSy.current = sy
      }
      pill.style.transition = "background 200ms ease, box-shadow 200ms ease"
      pill.style.transform = `scale(1.25) scaleX(${currentSx.current}) scaleY(${currentSy.current})`

      // Reset pause detection timer
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
      pauseTimerRef.current = setTimeout(() => {
        runPauseWobble(pill)
      }, 50)
    }

    const handleUp = () => {
      runRelease()
    }

    moveHandlerRef.current = handleMove
    upHandlerRef.current = handleUp

    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerup", handleUp)
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

    // Capture pointer on the pill for reliable touch events on mobile
    pill.setPointerCapture(e.pointerId)

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

    attachDragListeners(pill)
  }

  // ─── Crossover handoff via Radix's built-in focus transfer ──────────
  const handleFocus = () => {
    // Radix calls .focus() on the new thumb during a crossover.
    // If pointer is still down and this thumb isn't already dragging,
    // it means we're the incoming thumb in a swap.
    if (!isPointerDownRef?.current || isDragging.current) return

    const pill = pillRef.current
    const filterEl = filterRef.current
    const overlayEl = overlayRef.current
    const specularEl = specularRef.current
    if (!pill || !filterEl || !overlayEl || !specularEl) return

    // Cancel any lingering bounce animation
    if (animRef.current) {
      animRef.current.cancel()
      animRef.current = null
    }

    isDragging.current = true
    currentSx.current = 1
    currentSy.current = 1

    setGlassActive(pill, filterEl, overlayEl, specularEl, true)
    pill.style.transition = "background 200ms ease, box-shadow 200ms ease"
    pill.style.transform = "scale(1.25)"

    // Attach listeners so this thumb properly cleans up on release
    attachDragListeners(pill)
  }

  const handleBlur = () => {
    // If this thumb was dragging and loses focus while the pointer
    // is still down, it's the departing thumb in a crossover.
    if (!isDragging.current || !isPointerDownRef?.current) return

    const pill = pillRef.current
    const filterEl = filterRef.current
    const overlayEl = overlayRef.current
    const specularEl = specularRef.current
    if (!pill || !filterEl || !overlayEl || !specularEl) return

    isDragging.current = false
    clearPauseTimer()

    // Remove this thumb's listeners (incoming thumb will attach its own)
    if (moveHandlerRef.current) {
      window.removeEventListener("pointermove", moveHandlerRef.current)
      moveHandlerRef.current = null
    }
    if (upHandlerRef.current) {
      window.removeEventListener("pointerup", upHandlerRef.current)
      upHandlerRef.current = null
    }

    // Cancel any running squish animation
    if (animRef.current) {
      animRef.current.cancel()
      animRef.current = null
    }

    // Snap back to idle immediately (no bounce on crossover)
    setGlassActive(pill, filterEl, overlayEl, specularEl, false)
    pill.style.transition =
      "background 200ms ease, box-shadow 200ms ease, transform 160ms cubic-bezier(0.34,1.56,0.64,1)"
    pill.style.transform = ""
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
        touchAction: "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
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
          touchAction: "none",
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
