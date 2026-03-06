import { Mail, Loader2, Plus, ChevronRight } from "lucide-react"
import { GlassButton } from "@/components/glass/glass-button"
export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0e1a] font-sans antialiased overflow-x-hidden">
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div className="absolute -left-[150px] -top-[100px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,#4c6ef5,#3b5bdb)] opacity-55 blur-[80px]" />
        <div className="absolute -right-[100px] top-[100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,#7950f2,#6741d9)] opacity-55 blur-[80px]" />
        <div className="absolute bottom-0 left-[30%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,#1971c2,#1864ab)] opacity-55 blur-[80px]" />
        <div className="absolute bottom-[100px] right-[20%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,#2f9e44,#2b8a3e)] opacity-55 blur-[80px]" />
      </div>
      <GlassButtonShowcase />
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
