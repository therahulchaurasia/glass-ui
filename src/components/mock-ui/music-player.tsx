"use client"
import { useState } from "react"
import { GlassButton } from "../glass/glass-button"
import {
  GlassCard,
  GlassCardContent,
  GlassCardHeader,
  GlassCardTitle,
} from "../glass/glass-card"
import { GlassSlider } from "../glass/glass-slider"
import { cn } from "@/lib/utils"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">
      {children}
    </p>
  )
}

const tracks = [
  { title: "Neon Dissolve", artist: "Glass Animals", duration: "3:47" },
  { title: "Something About Us", artist: "Daft Punk", duration: "4:07" },
  { title: "Midnight City", artist: "M83", duration: "4:03" },
]

function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(34)
  const [volume, setVolume] = useState(72)
  const [liked, setLiked] = useState(false)
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + tracks.length) % tracks.length)
  const next = () => setCurrent((c) => (c + 1) % tracks.length)

  return (
    <div>
      <SectionLabel>Music Player</SectionLabel>
      <div className="flex flex-wrap items-start gap-4">
        {/* Main player card */}
        <GlassCard className="w-[300px]">
          <GlassCardContent className="p-7">
            {/* Album art */}
            <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-violet-700 to-pink-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-3xl">
                  ♪
                </div>
              </div>
              <div className="absolute bottom-3 right-3">
                <GlassButton size="sm" onClick={() => setLiked(!liked)}>
                  {liked ? "♥" : "♡"}
                </GlassButton>
              </div>
            </div>

            {/* Track info */}
            <div className="mb-5">
              <div className="text-[17px] font-semibold leading-tight text-white/92 tracking-tight">
                {tracks[current].title}
              </div>
              <div className="mt-1 text-[13px] text-white/45">
                {tracks[current].artist}
              </div>
            </div>

            {/* Progress slider */}
            <div className="mb-5">
              <GlassSlider
                value={[progress]}
                onValueChange={(v) => setProgress(v[0])}
                min={0}
                max={100}
              />
              <div className="mt-2 flex justify-between">
                <span className="text-[11px] text-white/35">
                  1:{String(Math.floor((progress / 100) * 47)).padStart(2, "0")}
                </span>
                <span className="text-[11px] text-white/35">
                  {tracks[current].duration}
                </span>
              </div>
            </div>

            {/* Playback controls */}
            <div className="flex items-center justify-center gap-3">
              <GlassButton size="sm" onClick={prev}>
                ⏮
              </GlassButton>
              <GlassButton
                size="lg"
                onClick={() => setPlaying(!playing)}
                className="flex h-12 w-12 items-center justify-center !p-0 text-xl"
              >
                {playing ? "⏸" : "▶"}
              </GlassButton>
              <GlassButton size="sm" onClick={next}>
                ⏭
              </GlassButton>
            </div>

            {/* Volume */}
            <div className="mt-5 flex items-center gap-3">
              <span className="text-[13px] text-white/35">🔈</span>
              <div className="flex-1">
                <GlassSlider
                  value={[volume]}
                  onValueChange={(v) => setVolume(v[0])}
                  min={0}
                  max={100}
                />
              </div>
              <span className="text-[13px] text-white/35">🔊</span>
            </div>
          </GlassCardContent>
        </GlassCard>

        {/* Queue card */}
        <GlassCard className="w-[220px]">
          <GlassCardHeader>
            <GlassCardTitle className="text-sm">Up Next</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent className="px-3 py-2">
            {tracks.map((t, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2.5 transition-colors",
                  i === current ? "bg-white/8" : "hover:bg-white/5",
                )}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm"
                  style={{ background: `hsl(${i * 80 + 200},55%,38%)` }}
                >
                  ♪
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className={cn(
                      "truncate text-[13px] font-medium",
                      i === current ? "text-white/92" : "text-white/60",
                    )}
                  >
                    {t.title}
                  </div>
                  <div className="text-[11px] text-white/35">{t.artist}</div>
                </div>
                <div className="shrink-0 text-[11px] text-white/30">
                  {t.duration}
                </div>
              </div>
            ))}
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  )
}

export default MusicPlayer
