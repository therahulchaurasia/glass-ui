"use client"
import { Mail, Loader2, Plus, ChevronRight } from "lucide-react"
import { GlassButton } from "@/components/glass/glass-button"
import { GlassSlider } from "@/components/glass/glass-slider"
import { Slider } from "@/components/ui/slider"
export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0e1a] font-sans antialiased overflow-x-hidden">
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div className="absolute -left-[150px] -top-[100px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,#4c6ef5,#3b5bdb)] opacity-55 blur-[80px]" />
        <div className="absolute -right-[100px] top-[100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,#7950f2,#6741d9)] opacity-55 blur-[80px]" />
        <div className="absolute bottom-0 left-[30%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,#1971c2,#1864ab)] opacity-55 blur-[80px]" />
        <div className="absolute bottom-[100px] right-[20%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,#2f9e44,#2b8a3e)] opacity-55 blur-[80px]" />
      </div>
      <div className="flex flex-col gap-12 pt-24 max-w-6xl mx-auto">
        {/* <GlassButtonShowcase /> */}
        {/* <GlassSliderShowcase /> */}

        <GlassSlider
          defaultValue={[50]}
          max={100}
          step={1}
          onValueChange={(value) => console.log({ value })}
          onValueCommit={(finalValue) => console.log({ finalValue })}
        />

        <GlassSlider
          defaultValue={[50]}
          orientation="vertical"
          max={100}
          step={1}
          onValueChange={(value) => console.log({ value })}
          onValueCommit={(finalValue) => console.log({ finalValue })}
        />

        <Slider defaultValue={[50]} orientation="vertical" max={100} step={1} />
        <Slider
          defaultValue={[50]}
          orientation="horizontal"
          max={100}
          step={1}
        />
      </div>
    </div>
  )
}

function GlassButtonShowcase() {
  return (
    <div className="mx-auto max-w-4xl p-8">
      {/* 3-Column Grid Layout
        Using gap-y-12 for vertical breathing room and items-center to keep 
        everything uniformly aligned in their columns.
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
        {/* --- VARIANTS --- */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
            Default
          </span>
          <GlassButton variant="default">Button</GlassButton>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
            Primary
          </span>
          <GlassButton variant="primary">Button</GlassButton>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
            Outline
          </span>
          <GlassButton variant="outline">Button</GlassButton>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
            Ghost
          </span>
          <GlassButton variant="ghost">Button</GlassButton>
        </div>

        {/* --- STATES & CONTENT --- */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
            With Icon
          </span>
          <GlassButton>
            <Mail /> Login with Email
          </GlassButton>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
            Loading
          </span>
          <GlassButton disabled>
            <Loader2 className="animate-spin" /> Please wait
          </GlassButton>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
            Icon Right
          </span>
          <GlassButton>
            Continue <ChevronRight />
          </GlassButton>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
            Disabled
          </span>
          <GlassButton disabled>Disabled Button</GlassButton>
        </div>

        {/* --- SIZES --- */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
            Size: Small
          </span>
          <GlassButton size="sm">Small Button</GlassButton>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
            Size: Large
          </span>
          <GlassButton size="lg">Large Button</GlassButton>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
            Size: Icon (Default)
          </span>
          <GlassButton size="icon">
            <Plus />
          </GlassButton>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">
            Size: Icon Large
          </span>
          <GlassButton size="icon-lg">
            <Plus />
          </GlassButton>
        </div>
      </div>
    </div>
  )
}

function GlassSliderShowcase() {
  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold text-white tracking-widest drop-shadow-md">
          Glass Slider
        </h2>
        <p className="mt-2 text-sm text-white/60 uppercase tracking-widest">
          Comprehensive showcase of the Glass Slider component
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {/* --- HORIZONTAL VARIANTS --- */}
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Default Value
            </span>
            <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">
              Uncontrolled, single value
            </p>
          </div>
          <div className="h-12 flex items-center px-4">
            <GlassSlider
              defaultValue={[50]}
              max={100}
              step={1}
              onValueChange={(value) => console.log({ value })}
              onValueCommit={(finalValue) => console.log({ finalValue })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Range Values
            </span>
            <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">
              Multiple thumbs [25, 75]
            </p>
          </div>
          <div className="h-12 flex items-center px-4">
            <GlassSlider
              defaultValue={[25, 75]}
              max={100}
              step={1}
              onValueChange={(value) => console.log({ value })}
              onValueCommit={(finalValue) => console.log({ finalValue })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Discrete Steps
            </span>
            <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">
              With step=10, snapping active
            </p>
          </div>
          <div className="h-12 flex items-center px-4">
            <GlassSlider
              defaultValue={[30]}
              min={0}
              max={100}
              step={10}
              onValueChange={(value) => console.log({ value })}
              onValueCommit={(finalValue) => console.log({ finalValue })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Disabled State
            </span>
            <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">
              Non-interactive, reduced opacity
            </p>
          </div>
          <div className="h-12 flex items-center px-4">
            <GlassSlider
              disabled
              defaultValue={[40]}
              max={100}
              step={1}
              onValueChange={(value) => console.log({ value })}
              onValueCommit={(finalValue) => console.log({ finalValue })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Inverted Direction
            </span>
            <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">
              Fills from right to left
            </p>
          </div>
          <div className="h-12 flex items-center px-4">
            <GlassSlider
              inverted
              defaultValue={[60]}
              max={100}
              step={1}
              onValueChange={(value) => console.log({ value })}
              onValueCommit={(finalValue) => console.log({ finalValue })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              High Minimum Value
            </span>
            <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">
              min=50, max=100
            </p>
          </div>
          <div className="h-12 flex items-center px-4">
            <GlassSlider
              defaultValue={[75]}
              min={50}
              max={100}
              step={1}
              onValueChange={(value) => console.log({ value })}
              onValueCommit={(finalValue) => console.log({ finalValue })}
            />
          </div>
        </div>

        {/* --- VERTICAL VARIANTS --- */}
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Vertical Default
            </span>
            <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">
              orientation="vertical"
            </p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <GlassSlider
              orientation="vertical"
              defaultValue={[50]}
              max={100}
              step={1}
              onValueChange={(value) => console.log({ value })}
              onValueCommit={(finalValue) => console.log({ finalValue })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Vertical Range
            </span>
            <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">
              Multiple vertical thumbs
            </p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <GlassSlider
              orientation="vertical"
              defaultValue={[30, 80]}
              max={100}
              step={1}
              onValueChange={(value) => console.log({ value })}
              onValueCommit={(finalValue) => console.log({ finalValue })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
