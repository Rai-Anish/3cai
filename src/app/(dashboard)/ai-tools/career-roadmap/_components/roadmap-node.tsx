"use client"

import { Handle, Position } from '@xyflow/react'

export type RoadmapNodeData = {
  title?: string
  label?: string
  description?: string
  link?: string
}

export function RoadmapNode({ data }: { data: RoadmapNodeData }) {
  return (
    <div className="min-w-50 max-w-65 rounded-lg border border-primary/40 bg-card px-4 py-3 shadow-[0_0_12px_rgba(233,255,185,0.08)] font-mono">
      <Handle 
        type="target" 
        position={Position.Top} 
        className="bg-primary! border-none! w-2! h-2!" 
      />
      
      <p className="text-xs font-bold text-primary leading-snug mb-1 uppercase tracking-tight">
        {data.title || data.label}
      </p>

      {data.description && (
        <p className="text-[10px] text-muted-foreground leading-relaxed mb-2">
          {data.description}
        </p>
      )}

      {data.link && (
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] text-primary/60 hover:text-primary underline underline-offset-2 transition-colors inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          Documentation →
        </a>
      )}
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="bg-primary! border-none! w-2! h-2!" 
      />
    </div>
  )
}