"use client"

import { useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Loader2, ArrowLeft, Rocket, Cpu } from "lucide-react"
import Link from 'next/link'

interface RoadmapInputProps {
  roadmapId: string
  onStartPolling: () => void
  isGenerating: boolean
  title: string | null
  userInput: string | null
}

export const RoadmapInput = ({ roadmapId, onStartPolling, isGenerating, title, userInput }: RoadmapInputProps) => {
  const [prompt, setPrompt] = useState(userInput || '')
  const [selectedModel, setSelectedModel] = useState<'gemini' | 'groq'>('gemini') 
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    if (!prompt.trim() || isGenerating) return
    setError(null)

    try {
      const res = await fetch(`/api/roadmap/generate`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userInput: prompt, 
          roadmapId, 
          model: selectedModel 
        })
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.message || "Generation failed")
        return
      }

      onStartPolling()
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <aside className="w-100 shrink-0 flex flex-col border-r border-border bg-background/50 backdrop-blur-sm">
      <div className="px-6 pt-5 pb-2">
        <Link href="/ai-tools/career-roadmap" className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> ALL ROADMAPS
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground uppercase italic">
            Trajectory <span className="text-primary not-italic">Engine</span>
          </h2>
          {title && <p className="text-[10px] font-mono text-muted-foreground truncate">{title}</p>}
          {error && <p className="text-[10px] text-red-400 font-mono uppercase">Error: {error}</p>}
        </div>

        {/* Tactical Model Selector */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-mono text-primary uppercase tracking-widest">
            <Cpu className="h-3 w-3" /> Select Model
          </div>
          <Tabs 
            value={selectedModel} 
            onValueChange={(v) => setSelectedModel(v as 'gemini' | 'groq')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-primary/20 h-9 p-1">
              <TabsTrigger 
                value="gemini" 
                disabled={isGenerating}
                className="text-[10px] font-mono uppercase data-[state=active]:bg-primary data-[state=active]:text-black"
              >
                Gemini
              </TabsTrigger>
              <TabsTrigger 
                value="groq" 
                disabled={isGenerating}
                className="text-[10px] font-mono uppercase data-[state=active]:bg-primary data-[state=active]:text-black"
              >
                Groq
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2 flex-1 flex flex-col">
          <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Input Mission Parameters</label>
          <Textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={isGenerating}
            placeholder="Describe your current skills and target role..."
            className="flex-1 min-h-75 text-white bg-card/50 border-primary/50 focus:border-primary font-mono text-sm leading-relaxed p-4 resize-none"
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating || !prompt.trim()} 
          className="bg-primary hover:bg-primary/90 text-black font-bold shadow-[0_0_15px_rgba(233,255,185,0.2)] w-full py-6 cursor-pointer group"
        >
          {isGenerating ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> SYNTHESIZING...</>
          ) : (
            <span className="flex items-center gap-2">
               Generate Roadmap <Rocket className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          )}
        </Button>
      </div>
    </aside>
  )
}