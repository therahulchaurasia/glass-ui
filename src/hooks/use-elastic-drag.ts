import { useRef } from "react"

export interface ElasticDragOptions {
  /** How far the element follows your pointer (0 = fixed, 1 = tracks exactly). Default 0.03 */
  resistance?: number
  /** Maximum jelly deformation during drag (0 = rigid, 1 = extreme). Default 0.18 */
  squish?: number
  /** Spring bounce intensity past rest position (0 = no overshoot, 1 = dramatic). Default 0.35 */
  overshoot?: number
  /** Spring settle duration in ms. Default 850 */
  duration?: number
}

export function useElasticDrag({
  resistance = 0.03,
  squish = 0.18,
  overshoot = 0.35,
  duration = 850,
}: ElasticDragOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const animationRef = useRef<Animation | null>(null)

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const handlePointerDown = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    if (animationRef.current) {
      animationRef.current.cancel()
      animationRef.current = null
    }

    el.setPointerCapture(e.pointerId)

    const startX = e.clientX
    const startY = e.clientY

    let lastDx = 0
    let lastDy = 0
    let lastSx = 1
    let lastSy = 1

    const handlePointerMove = (e: PointerEvent) => {
      lastDx = (e.clientX - startX) * resistance
      lastDy = (e.clientY - startY) * resistance

      const distance = Math.sqrt(lastDx * lastDx + lastDy * lastDy)
      const squishAmount = Math.min(distance / (squish * 333), squish)
      const angle = Math.atan2(lastDy, lastDx)

      const cosA = Math.abs(Math.cos(angle))
      const sinA = Math.abs(Math.sin(angle))

      lastSx = 1 + cosA * squishAmount - sinA * squishAmount * 0.4
      lastSy = 1 + sinA * squishAmount - cosA * squishAmount * 0.4

      el.style.transition = "none"
      el.style.transform = `translate(${lastDx}px, ${lastDy}px) scaleX(${lastSx}) scaleY(${lastSy})`
    }

    const handlePointerUp = () => {
      el.style.transform = "translate(0px,0px) scaleX(1) scaleY(1)"

      const ox = lastDx * -overshoot
      const oy = lastDy * -overshoot

      const b1 = squish * 0.36
      const b2 = squish * 0.14
      const b3 = squish * 0.045

      animationRef.current = el.animate(
        [
          {
            transform: `translate(${lastDx}px,${lastDy}px) scaleX(${lastSx}) scaleY(${lastSy})`,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          },
          {
            transform: `translate(${ox}px,${oy}px) scaleX(${1 + b1}) scaleY(${1 - b1})`,
            offset: 0.25,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
          {
            transform: `translate(${ox * -overshoot}px,${oy * -overshoot}px) scaleX(${1 - b2}) scaleY(${1 + b2})`,
            offset: 0.5,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
          {
            transform: `translate(${ox * overshoot * 0.5}px,${oy * overshoot * 0.5}px) scaleX(${1 + b3}) scaleY(${1 - b3})`,
            offset: 0.72,
            easing: "cubic-bezier(0.33, 0, 0, 1)",
          },
          {
            transform: "translate(0px,0px) scaleX(1) scaleY(1)",
          },
        ],
        {
          duration,
          easing: "linear",
        }
      )

      animationRef.current.onfinish = () => {
        el.style.transform = ""
        el.style.transition = ""
        animationRef.current = null
      }

      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
  }

  return { ref, onPointerDown: handlePointerDown }
}
