"use client"

import * as React from "react"
import { GlassButton } from "@/components/glass/glass-button"
import { GlassSlider } from "@/components/glass/glass-slider"
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
  GlassCardFooter,
} from "@/components/glass/glass-card"
import { GlassInput } from "@/components/glass/glass-input"
import { SignUpForm } from "@/components/sign-up-form"
import { Slider } from "radix-ui"
export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0e1a] font-sans antialiased overflow-x-hidden">
      <Content />
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
        <GlassButton
          elastic={false}
          onClick={() => {
            console.log("say hi")
          }}
        >
          Default
        </GlassButton>

        <div className="mx-auto mt-12 flex max-w-2xl items-center justify-center gap-12">
          <div className="h-80">
            <GlassSlider
              orientation="vertical"
              defaultValue={[1]}
              max={100}
              step={1}
            />
          </div>
          <div className="w-full max-w-md">
            <GlassSlider defaultValue={[60]} max={100} step={1} />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-sm text-left">
          <GlassCard elastic className="rounded-2xl">
            <GlassCardHeader>
              <GlassCardTitle>Weekly Forecast</GlassCardTitle>
              <GlassCardDescription>San Francisco, CA</GlassCardDescription>
            </GlassCardHeader>
            <GlassCardContent className="space-y-3">
              {[
                { day: "Mon", temp: "18°", icon: "☀️", desc: "Sunny" },
                { day: "Tue", temp: "16°", icon: "⛅", desc: "Partly cloudy" },
                { day: "Wed", temp: "14°", icon: "🌧️", desc: "Light rain" },
                { day: "Thu", temp: "15°", icon: "⛅", desc: "Partly cloudy" },
                { day: "Fri", temp: "19°", icon: "☀️", desc: "Clear skies" },
              ].map((row) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-2.5"
                >
                  <span className="w-10 text-sm font-medium text-white/70">
                    {row.day}
                  </span>
                  <span className="text-lg">{row.icon}</span>
                  <span className="flex-1 px-3 text-sm text-white/50">
                    {row.desc}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-white/90">
                    {row.temp}
                  </span>
                </div>
              ))}
            </GlassCardContent>
            <GlassCardFooter className="justify-between text-xs text-white/40">
              <span>Updated just now</span>
              <span>5-day outlook</span>
            </GlassCardFooter>
          </GlassCard>
        </div>

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
