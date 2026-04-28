"use client"
import { useState, useEffect, useRef } from 'react'
import { Node, Edge } from '@xyflow/react'

interface RoadmapResult {
  status: 'idle' | 'pending' | 'completed' | 'error'
  nodes: Node[]
  edges: Edge[]
  title: string
  description: string
  duration: string
  error?: string
}

export function useRoadmapPolling(roadmapId: string) {
  const [state, setState] = useState<RoadmapResult>({
    status: 'idle', nodes: [], edges: [], title: '', description: '', duration: ''
  })
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startPolling = () => {
    setState(s => ({ ...s, status: 'pending' }))

    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/roadmap/${roadmapId}/status`)
        const data = await res.json()

        if (data.status === 'completed') {
          clearInterval(intervalRef.current!)
          setState({
            status: 'completed',
            nodes: data.nodes,
            edges: data.edges,
            title: data.title,
            description: data.description,
            duration: data.duration,
          })
        } else if (data.status === 'error') {
          clearInterval(intervalRef.current!)
          setState(s => ({ ...s, status: 'error', error: data.error }))
        }
        // else still 'pending', keep polling
      } catch {
        clearInterval(intervalRef.current!)
        setState(s => ({ ...s, status: 'error', error: 'Network error' }))
      }
    }, 3000) // poll every 3s
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  return { ...state, startPolling }
}