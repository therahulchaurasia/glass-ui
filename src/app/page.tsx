'use client'
import { Mail, Loader2, Plus, ChevronRight } from 'lucide-react'
import { GlassButton } from '@/components/glass/glass-button'
import { GlassSlider } from '@/components/glass/glass-slider'
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
  GlassCardFooter,
  GlassCardAction,
} from '@/components/glass/glass-card'
import MusicPlayer from '@/components/mock-ui/music-player'
import { Slider } from '@/components/ui/slider'
export default function Home() {
  return (
    <div className='relative min-h-screen bg-[#0a0e1a] font-sans antialiased overflow-x-hidden'>
      <div aria-hidden className='pointer-events-none fixed inset-0'>
        <div className='absolute -left-[150px] -top-[100px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,#4c6ef5,#3b5bdb)] opacity-55 blur-[80px]' />
        <div className='absolute -right-[100px] top-[100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,#7950f2,#6741d9)] opacity-55 blur-[80px]' />
        <div className='absolute bottom-0 left-[30%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,#1971c2,#1864ab)] opacity-55 blur-[80px]' />
        <div className='absolute bottom-[100px] right-[20%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,#2f9e44,#2b8a3e)] opacity-55 blur-[80px]' />
      </div>
      <div className='flex flex-col gap-12 pt-24 max-w-6xl mx-auto'>
        {/* <GlassButtonShowcase /> */}

        {/* <GlassSliderShowcase /> */}

        <GlassCardShowcase />
      </div>
    </div>
  )
}

function GlassButtonShowcase() {
  return (
    <div className='mx-auto max-w-4xl p-8'>
      {/* 3-Column Grid Layout
        Using gap-y-12 for vertical breathing room and items-center to keep 
        everything uniformly aligned in their columns.
      */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12'>
        {/* --- VARIANTS --- */}
        <div className='flex flex-col items-center gap-4'>
          <span className='text-xs font-medium uppercase tracking-wider text-white/50'>
            Default
          </span>
          <GlassButton variant='default'>Button</GlassButton>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <span className='text-xs font-medium uppercase tracking-wider text-white/50'>
            Primary
          </span>
          <GlassButton variant='primary'>Button</GlassButton>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <span className='text-xs font-medium uppercase tracking-wider text-white/50'>
            Outline
          </span>
          <GlassButton variant='outline'>Button</GlassButton>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <span className='text-xs font-medium uppercase tracking-wider text-white/50'>
            Ghost
          </span>
          <GlassButton variant='ghost'>Button</GlassButton>
        </div>

        {/* --- STATES & CONTENT --- */}
        <div className='flex flex-col items-center gap-4'>
          <span className='text-xs font-medium uppercase tracking-wider text-white/50'>
            With Icon
          </span>
          <GlassButton>
            <Mail /> Login with Email
          </GlassButton>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <span className='text-xs font-medium uppercase tracking-wider text-white/50'>
            Loading
          </span>
          <GlassButton disabled>
            <Loader2 className='animate-spin' /> Please wait
          </GlassButton>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <span className='text-xs font-medium uppercase tracking-wider text-white/50'>
            Icon Right
          </span>
          <GlassButton>
            Continue <ChevronRight />
          </GlassButton>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <span className='text-xs font-medium uppercase tracking-wider text-white/50'>
            Disabled
          </span>
          <GlassButton disabled>Disabled Button</GlassButton>
        </div>

        {/* --- SIZES --- */}
        <div className='flex flex-col items-center gap-4'>
          <span className='text-xs font-medium uppercase tracking-wider text-white/50'>
            Size: Small
          </span>
          <GlassButton size='sm'>Small Button</GlassButton>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <span className='text-xs font-medium uppercase tracking-wider text-white/50'>
            Size: Large
          </span>
          <GlassButton size='lg'>Large Button</GlassButton>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <span className='text-xs font-medium uppercase tracking-wider text-white/50'>
            Size: Icon (Default)
          </span>
          <GlassButton size='icon'>
            <Plus />
          </GlassButton>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <span className='text-xs font-medium uppercase tracking-wider text-white/50'>
            Size: Icon Large
          </span>
          <GlassButton size='icon-lg'>
            <Plus />
          </GlassButton>
        </div>
      </div>
    </div>
  )
}

function GlassSliderShowcase() {
  return (
    <div className='mx-auto max-w-4xl p-8'>
      <div className='mb-12 text-center'>
        <h2 className='text-2xl font-bold text-white tracking-widest drop-shadow-md'>
          Glass Slider
        </h2>
        <p className='mt-2 text-sm text-white/60 uppercase tracking-widest'>
          Comprehensive showcase of the Glass Slider component
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12'>
        {/* --- HORIZONTAL VARIANTS --- */}
        <div className='flex flex-col gap-6'>
          <div className='text-center'>
            <span className='text-xs font-semibold uppercase tracking-widest text-white/70'>
              Default Value
            </span>
            <p className='text-[10px] text-white/40 mt-1 uppercase tracking-wider'>
              Uncontrolled, single value
            </p>
          </div>
          <div className='h-12 flex items-center px-4'>
            <GlassSlider
              defaultValue={[50]}
              max={100}
              step={1}
              onValueChange={(value) => console.log({ value })}
              onValueCommit={(finalValue) => console.log({ finalValue })}
            />
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='text-center'>
            <span className='text-xs font-semibold uppercase tracking-widest text-white/70'>
              Default Value
            </span>
            <p className='text-[10px] text-white/40 mt-1 uppercase tracking-wider'>
              Uncontrolled, single value
            </p>
          </div>
          <div className='h-12 flex items-center px-4'>
            {/* // Circle thumb (28×28) */}
            <GlassSlider
              thumbShape='circle'
              defaultValue={[50]}
              thumbHeight={20}
              thumbWidth={20}
            />
            {/* // Pill with custom dimensions */}
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='text-center'>
            <span className='text-xs font-semibold uppercase tracking-widest text-white/70'>
              Range Values
            </span>
            <p className='text-[10px] text-white/40 mt-1 uppercase tracking-wider'>
              Multiple thumbs [25, 75]
            </p>
          </div>
          <div className='h-12 flex items-center px-4'>
            <GlassSlider
              defaultValue={[25, 75]}
              max={100}
              step={1}
              onValueChange={(value) => console.log({ value })}
              onValueCommit={(finalValue) => console.log({ finalValue })}
            />
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='text-center'>
            <span className='text-xs font-semibold uppercase tracking-widest text-white/70'>
              Discrete Steps
            </span>
            <p className='text-[10px] text-white/40 mt-1 uppercase tracking-wider'>
              With step=10, snapping active
            </p>
          </div>
          <div className='h-12 flex items-center px-4'>
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

        <div className='flex flex-col gap-6'>
          <div className='text-center'>
            <span className='text-xs font-semibold uppercase tracking-widest text-white/70'>
              Disabled State
            </span>
            <p className='text-[10px] text-white/40 mt-1 uppercase tracking-wider'>
              Non-interactive, reduced opacity
            </p>
          </div>
          <div className='h-12 flex items-center px-4'>
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

        <div className='flex flex-col gap-6'>
          <div className='text-center'>
            <span className='text-xs font-semibold uppercase tracking-widest text-white/70'>
              Inverted Direction
            </span>
            <p className='text-[10px] text-white/40 mt-1 uppercase tracking-wider'>
              Fills from right to left
            </p>
          </div>
          <div className='h-12 flex items-center px-4'>
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

        <div className='flex flex-col gap-6'>
          <div className='text-center'>
            <span className='text-xs font-semibold uppercase tracking-widest text-white/70'>
              High Minimum Value
            </span>
            <p className='text-[10px] text-white/40 mt-1 uppercase tracking-wider'>
              min=50, max=100
            </p>
          </div>
          <div className='h-12 flex items-center px-4'>
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
        <div className='flex flex-col gap-6'>
          <div className='text-center'>
            <span className='text-xs font-semibold uppercase tracking-widest text-white/70'>
              Vertical Default
            </span>
            <p className='text-[10px] text-white/40 mt-1 uppercase tracking-wider'>
              orientation="vertical"
            </p>
          </div>
          <div className='h-64 flex items-center justify-center'>
            <GlassSlider
              orientation='vertical'
              defaultValue={[50]}
              max={100}
              step={1}
              onValueChange={(value) => console.log({ value })}
              onValueCommit={(finalValue) => console.log({ finalValue })}
            />
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='text-center'>
            <span className='text-xs font-semibold uppercase tracking-widest text-white/70'>
              Vertical Range
            </span>
            <p className='text-[10px] text-white/40 mt-1 uppercase tracking-wider'>
              Multiple vertical thumbs
            </p>
          </div>
          <div className='h-64 flex items-center justify-center'>
            <GlassSlider
              orientation='vertical'
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

function GlassCardShowcase() {
  return (
    <div className='mx-auto w-full max-w-5xl p-4 md:p-8'>
      <div className='mb-12 text-center'>
        <h2 className='text-2xl font-bold text-white tracking-widest drop-shadow-md'>
          Glass Card
        </h2>
        <p className='mt-2 text-sm text-white/60 uppercase tracking-widest'>
          Examples of the Glass Card component and its compositions
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
        {/* --- DEFAULT CARD --- */}
        <div className='flex flex-col gap-6 items-center'>
          <div className='text-center'>
            <span className='text-xs font-semibold uppercase tracking-widest text-white/70'>
              Default Card
            </span>
            <p className='text-[10px] text-white/40 mt-1 uppercase tracking-wider'>
              Standard layout slots
            </p>
          </div>

          <GlassCard className='w-full max-w-sm'>
            <GlassCardHeader>
              <GlassCardTitle>Project Settings</GlassCardTitle>
              <GlassCardDescription>
                Manage your repository configuration and access controls.
              </GlassCardDescription>
            </GlassCardHeader>
            <GlassCardContent>
              <div className='flex flex-col gap-4 text-sm text-white/70'>
                <div className='flex justify-between border-b border-white/10 pb-2'>
                  <span>Visibility</span>
                  <span className='text-white'>Private</span>
                </div>
                <div className='flex justify-between border-b border-white/10 pb-2'>
                  <span>Branch Protection</span>
                  <span className='text-emerald-400'>Enabled</span>
                </div>
                <div className='flex justify-between'>
                  <span>Deployments</span>
                  <span className='text-white'>Active</span>
                </div>
              </div>
            </GlassCardContent>
            <GlassCardFooter className='justify-end gap-3 mt-4'>
              <GlassButton variant='ghost' size='sm'>
                Cancel
              </GlassButton>
              <GlassButton variant='primary' size='sm'>
                Save
              </GlassButton>
            </GlassCardFooter>
          </GlassCard>
        </div>

        {/* --- ELASTIC CARD --- */}
        <div className='flex flex-col gap-6 items-center'>
          <div className='text-center'>
            <span className='text-xs font-semibold uppercase tracking-widest text-white/70'>
              Elastic Card
            </span>
            <p className='text-[10px] text-white/40 mt-1 uppercase tracking-wider'>
              Interactive drag & squish physics
            </p>
          </div>

          <GlassCard
            elastic
            className='w-full max-w-sm'
          >
            <GlassCardHeader>
              <GlassCardTitle>Drag Me Around</GlassCardTitle>
              <GlassCardDescription>
                Interact with this card to see the custom physics and
                elasticity.
              </GlassCardDescription>
            </GlassCardHeader>
            <GlassCardContent>
              <div className='flex h-32 items-center justify-center rounded-xl bg-white/5 border border-white/10'>
                <span className='text-4xl opacity-50'>✨</span>
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>

        {/* --- EVENT CARD --- */}
        <div className='flex flex-col gap-6 items-center'>
          <div className='text-center'>
            <span className='text-xs font-semibold uppercase tracking-widest text-white/70'>
              Event Card
            </span>
            <p className='text-[10px] text-white/40 mt-1 uppercase tracking-wider'>
              With edge-to-cover image
            </p>
          </div>

          <GlassCard
            className='w-full max-w-sm overflow-hidden p-0 gap-0'
            elastic={true}
          >
            {/* Top Image Area */}
            <div className='h-48 w-full bg-white/5' />

            {/* Content Area */}
            <div className='flex flex-col gap-4 p-6'>
              <GlassCardHeader className='p-0'>
                <GlassCardTitle className='text-lg'>
                  Design systems meetup
                </GlassCardTitle>
                <GlassCardAction>
                  <span className='inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/90'>
                    Featured
                  </span>
                </GlassCardAction>
                <GlassCardDescription className='text-sm text-white/60 leading-relaxed max-w-[240px]'>
                  A practical talk on component APIs, accessibility, and
                  shipping faster.
                </GlassCardDescription>
              </GlassCardHeader>

              <GlassCardFooter className='p-0 mt-2'>
                <GlassButton
                  elasticOptions={{
                    resistance: 0.005,
                  }}
                  variant='primary'
                  className='w-full justify-center bg-white/90 text-black hover:bg-white text-sm font-medium'
                >
                  View Event
                </GlassButton>
              </GlassCardFooter>
            </div>
          </GlassCard>
        </div>
      </div>

      <div className='mt-16 text-center'>
        <span className='text-xs font-semibold uppercase tracking-widest text-white/70'>
          Complex Compositions
        </span>
        <p className='text-[10px] text-white/40 mt-1 uppercase tracking-wider'>
          Mock UI built with cards, sliders, and buttons
        </p>
      </div>

      <div className='mt-8 flex justify-center w-full'>
        <MusicPlayer />
      </div>
    </div>
  )
}
