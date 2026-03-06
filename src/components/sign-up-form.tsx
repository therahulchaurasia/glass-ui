"use client"

import * as React from "react"
import { GlassButton } from "@/components/glass/glass-button"
import { GlassInput } from "@/components/glass/glass-input"
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
  GlassCardFooter,
} from "@/components/glass/glass-card"

export function SignUpForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("form submitted")
  }

  return (
    <GlassCard
      elastic={true}
      className="mx-auto w-full max-w-sm rounded-2xl text-left"
    >
      <form onSubmit={handleSubmit}>
        <GlassCardHeader>
          <GlassCardTitle>Join the waitlist</GlassCardTitle>
          <GlassCardDescription>
            Enter your details to get early access
          </GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium text-white/70">
              Name
            </label>
            <GlassInput id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-white/70"
            >
              Email
            </label>
            <GlassInput
              id="email"
              type="email"
              placeholder="john@example.com"
            />
          </div>
        </GlassCardContent>
        <GlassCardFooter>
          <GlassButton
            type="submit"
            elasticOptions={{ resistance: 0.01 }}
            className="w-full"
            variant="primary"
          >
            Join Waitlist
          </GlassButton>
        </GlassCardFooter>
      </form>
    </GlassCard>
  )
}
