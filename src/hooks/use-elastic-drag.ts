import { useRef } from 'react'
import usePrefersReducedMotion from './use-prefers-reduced-motion'

export interface ElasticDragOptions {
	/** How far the element follows your pointer (0 = fixed, 1 = tracks exactly). Default 0.03 */
	elasticity?: number
	/** Maximum jelly deformation during drag (0 = rigid, 1 = extreme). Default 0.18 */
	squish?: number
	/** Spring bounce intensity past rest position (0 = no overshoot, 1 = dramatic). Default 0.35 */
	overshoot?: number
	/** Spring settle duration in ms. Default 850 */
	duration?: number
	/** Minimum pointer travel (px) before the elastic effect activates. Default 0 (immediate) */
	threshold?: number
	/** Whether to apply scale deformation while dragging. Default true */
	squishOnDrag?: boolean
}

export function useElasticDrag({
	elasticity = 0.03,
	squish = 0.18,
	overshoot = 0.35,
	duration = 850,
	threshold = 0,
	squishOnDrag = true,
}: ElasticDragOptions = {}) {
	const ref = useRef<HTMLElement>(null)
	const animationRef = useRef<Animation | null>(null)

	const prefersReducedMotion = usePrefersReducedMotion()

	const handlePointerDown = (e: React.PointerEvent) => {
		const el = ref.current
		if (!el || prefersReducedMotion) return

		if (animationRef.current) {
			animationRef.current.cancel()
			animationRef.current = null
		}

		const target = e.target as HTMLElement

		const isInteractive = target.closest(
			'button, a, input, select, textarea, label'
		)
		// Skip capture only when the interactive element is a *child* of the
		// drag target (e.g. a button inside a card) so its click isn't swallowed.
		// When the drag target itself is the interactive element (e.g. GlassButton
		// with elastic), we still need capture for mobile drag to work.
		if (!isInteractive || isInteractive === el) {
			el.setPointerCapture(e.pointerId)
		}

		const startX = e.clientX
		const startY = e.clientY

		let activated = threshold === 0
		let lastDx = 0
		let lastDy = 0
		let lastSx = 1
		let lastSy = 1

		const handlePointerMove = (e: PointerEvent) => {
			const rawDx = e.clientX - startX
			const rawDy = e.clientY - startY

			if (!activated) {
				if (Math.sqrt(rawDx * rawDx + rawDy * rawDy) < threshold) return
				activated = true
			}

			lastDx = rawDx * elasticity
			lastDy = rawDy * elasticity

			if (squishOnDrag) {
				const distance = Math.sqrt(lastDx * lastDx + lastDy * lastDy)
				const squishAmount = Math.min(distance / (squish * 333), squish)
				const angle = Math.atan2(lastDy, lastDx)

				const cosA = Math.abs(Math.cos(angle))
				const sinA = Math.abs(Math.sin(angle))

				lastSx = 1 + cosA * squishAmount - sinA * squishAmount * 0.4
				lastSy = 1 + sinA * squishAmount - cosA * squishAmount * 0.4
			}

			el.style.transition = 'none'
			el.style.transform = `translate(${lastDx}px, ${lastDy}px) scaleX(${lastSx}) scaleY(${lastSy})`
		}

		const handlePointerUp = (e: Event) => {
			window.removeEventListener('pointermove', handlePointerMove)
			window.removeEventListener('pointerup', handlePointerUp)
			window.removeEventListener('pointercancel', handlePointerUp)

			if (!activated) {
				el.style.transform = ''
				el.style.transition = ''
				return
			}

			el.style.transform = 'translate(0px,0px) scaleX(1) scaleY(1)'

			if (e.type === 'pointercancel') {
				animationRef.current = el.animate(
					[
						{
							transform: `translate(${lastDx}px,${lastDy}px) scaleX(${lastSx}) scaleY(${lastSy})`,
						},
						{
							transform: 'translate(0px,0px) scaleX(1) scaleY(1)',
						},
					],
					{
						duration: 150,
						easing: 'ease-out',
					}
				)

				animationRef.current.onfinish = () => {
					el.style.transform = ''
					el.style.transition = ''
					animationRef.current = null
				}
				return
			}

			const ox = lastDx * -overshoot
			const oy = lastDy * -overshoot

			const b1 = squish * 0.36
			const b2 = squish * 0.14
			const b3 = squish * 0.045

			animationRef.current = el.animate(
				[
					{
						transform: `translate(${lastDx}px,${lastDy}px) scaleX(${lastSx}) scaleY(${lastSy})`,
						easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
					},
					{
						transform: `translate(${ox}px,${oy}px) scaleX(${1 + b1}) scaleY(${1 - b1})`,
						offset: 0.25,
						easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
					},
					{
						transform: `translate(${ox * -overshoot}px,${oy * -overshoot}px) scaleX(${1 - b2}) scaleY(${1 + b2})`,
						offset: 0.5,
						easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
					},
					{
						transform: `translate(${ox * overshoot * 0.5}px,${oy * overshoot * 0.5}px) scaleX(${1 + b3}) scaleY(${1 - b3})`,
						offset: 0.72,
						easing: 'cubic-bezier(0.33, 0, 0, 1)',
					},
					{
						transform: 'translate(0px,0px) scaleX(1) scaleY(1)',
					},
				],
				{
					duration,
					easing: 'linear',
				}
			)

			animationRef.current.onfinish = () => {
				el.style.transform = ''
				el.style.transition = ''
				animationRef.current = null
			}
		}

		window.addEventListener('pointermove', handlePointerMove)
		window.addEventListener('pointerup', handlePointerUp)
		window.addEventListener('pointercancel', handlePointerUp)
	}

	return { ref, onPointerDown: handlePointerDown }
}
