import { GlassButton } from "@/components/glass/glass-button"

export default function Home() {
  return (
    <div className="relative min-h-[200vh] bg-[#0a0e1a] font-sans antialiased overflow-x-hidden">
      <Content />
    </div>
  )
}

function GlassCard() {
  return (
    <div
      className="fixed left-1/2 top-8 z-50 w-full max-w-sm -translate-x-1/2 overflow-hidden rounded-[2rem]"
      style={{
        // 1. Standard, highly performant CSS blur
        backdropFilter: "blur(4px) saturate(180%) brightness(0.9)",
        WebkitBackdropFilter: "blur(4px) saturate(180%) brightness(0.9)",
      }}
    >
      {/* Layer 1: The "Thick Lens" Rim & Shadow Engine */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          boxShadow: `
					/* 1. The sharp outer glass edge */
					inset 0 0 0 1px rgba(255, 255, 255, 0.15),
					/* 2. The bright top rim light where light hits the curve */
					inset 0 2px 4px rgba(255, 255, 255, 0.4),
					/* 3. A deep, dark inner shadow at the bottom to create 3D volume/thickness */
					inset 0 -16px 24px rgba(0, 0, 0, 0.15),
					/* 4. A soft inner glow to simulate the interior of the glass */
					inset 0 8px 24px rgba(255, 255, 255, 0.1),
					/* 5. The drop shadow */
					0 12px 40px rgba(0, 0, 0, 0.2)
				`,
        }}
      />

      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, rgba(180, 210, 255, 0.1) 0%, transparent 70%)`,
        }}
      />

      {/* Layer 2: The Dome Surface Glare */}
      {/* Instead of a flat gradient, we use a radial gradient to make the surface look convex (bulging outward like a lens) */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 0%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 60%)",
        }}
      />

      {/* Layer 3: The Performant Static Noise */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 text-center">
        <h1 className="mb-2 text-2xl font-bold tracking-wide text-white drop-shadow-sm">
          Volumetric UI
        </h1>
        <p className="text-sm text-white/70">
          Pure CSS performance. Zero SVG math.
        </p>
      </div>
    </div>
  )
}

function Content() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div className="absolute -left-[150px] -top-[100px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,#4c6ef5,#3b5bdb)] opacity-55 blur-[80px]" />
        <div className="absolute -right-[100px] top-[100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,#7950f2,#6741d9)] opacity-55 blur-[80px]" />
        <div className="absolute bottom-0 left-[30%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,#1971c2,#1864ab)] opacity-55 blur-[80px]" />
        <div className="absolute bottom-[100px] right-[20%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,#2f9e44,#2b8a3e)] opacity-55 blur-[80px]" />
      </div>
      {/* Centered container */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Glass UI · Design Systems
          </p>
          <h1 className="text-5xl font-light leading-none tracking-tight text-white/90">
            The Art of
            <br />
            Glass Morphism
          </h1>
        </header>
        <GlassButton>Default</GlassButton>
        <p className="mx-auto mt-10 max-w-lg text-base leading-relaxed text-white/60">
          Glass morphism distills interface design to its purest essence — light
          refracting through virtual matter, depth without weight, and
          translucency layered with intention.
        </p>

        <figure className="mt-16 overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1706720094773-d91e070e4b90?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Photo by Neeqolah Creative Works on Unsplash"
            className="h-[320px] w-full object-cover"
          />
        </figure>

        <h2 className="mt-20 text-2xl font-light text-white/85">
          Backdrop Filters & Saturation
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/60">
          The secret weapon of glass morphism is{" "}
          <code className="rounded bg-white/8 px-1.5 py-0.5 text-sm text-white/80">
            backdrop-filter: saturate()
          </code>
          . Cranking saturation to 180–200% before applying the blur transforms
          a muddy frosted-glass look into something that feels alive. Colors
          behind the surface amplify rather than wash out.
        </p>

        <figure className="mt-16 overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1734606901283-489b25f7aa9b?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Photo by Neeqolah Creative Works on Unsplash"
            className="h-[320px] w-full object-cover"
          />
        </figure>

        <h2 className="mt-20 text-2xl font-light text-white/85">
          Animation as a Material Property
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/60">
          Glass surfaces should animate the way real glass moves — with inertia
          and spring. An overshoot easing (
          <code className="rounded bg-white/8 px-1.5 py-0.5 text-sm text-white/80">
            cubic-bezier(0.34, 1.56, 0.64, 1)
          </code>
          ) makes elements feel like they have mass.
        </p>

        <figure className="mt-16 overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1706720094773-d91e070e4b90?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Photo by Neeqolah Creative Works on Unsplash"
            className="h-[320px] w-full object-cover"
          />
        </figure>

        <h2 className="mt-20 text-2xl font-light text-white/85">
          Designing the Highlight Band
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/60">
          Every glass surface has a specular highlight — a bright band where
          light bounces off at an angle. Simulate this with an{" "}
          <code className="rounded bg-white/8 px-1.5 py-0.5 text-sm text-white/80">
            inset box-shadow
          </code>{" "}
          at the top-left edge, or a CSS pseudo-element with a linear gradient
          fading from white/25% to transparent.
        </p>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/60">
          Pair the highlight with a thin border at roughly 20–25% white opacity
          and the illusion of physical thickness snaps into place. The border
          catches ambient light from every direction while the highlight
          simulates a dominant directional source — together they sell the
          depth.
        </p>

        <figure className="mt-16 overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1734606901283-489b25f7aa9b?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Photo by Neeqolah Creative Works on Unsplash"
            className="h-[320px] w-full object-cover"
          />
        </figure>

        <div className="pb-20" />
      </div>
    </>
  )
}
