import { useRef } from "react"

export function useElasticDrag() {
  const ref = useRef<HTMLElement>(null)
  const animationRef = useRef<Animation | null>(null)

  const handlePointerDown = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return

    if (animationRef.current) {
      animationRef.current.cancel()
      animationRef.current = null
    }

    el.setPointerCapture(e.pointerId)

    const startX = e.clientX
    const startY = e.clientY
    const resistance = 0.03

    let lastDx = 0
    let lastDy = 0
    let lastSx = 1
    let lastSy = 1

    const handlePointerMove = (e: PointerEvent) => {
      lastDx = (e.clientX - startX) * resistance
      lastDy = (e.clientY - startY) * resistance

      const distance = Math.sqrt(lastDx * lastDx + lastDy * lastDy)
      const squishAmount = Math.min(distance / 60, 0.18)
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

      // Overshoot past origin proportional to displacement
      const ox = lastDx * -0.35
      const oy = lastDy * -0.35

      animationRef.current = el.animate(
        [
          {
            transform: `translate(${lastDx}px,${lastDy}px) scaleX(${lastSx}) scaleY(${lastSy})`,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          },
          {
            transform: `translate(${ox}px,${oy}px) scaleX(1.065) scaleY(0.935)`,
            offset: 0.25,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
          {
            transform: `translate(${ox * -0.35}px,${oy * -0.35}px) scaleX(0.975) scaleY(1.025)`,
            offset: 0.5,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
          {
            transform: `translate(${ox * 0.2}px,${oy * 0.2}px) scaleX(1.008) scaleY(0.992)`,
            offset: 0.72,
            easing: "cubic-bezier(0.33, 0, 0, 1)",
          },
          {
            transform: "translate(0px,0px) scaleX(1) scaleY(1)",
          },
        ],
        {
          duration: 850,
          easing: "linear",
        },
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
