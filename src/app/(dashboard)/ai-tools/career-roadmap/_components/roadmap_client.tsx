"use client"

import { useState, useCallback, useEffect, useRef } from 'react'
import { Node, Edge, NodeChange, EdgeChange, Connection, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react'
import { RoadmapInput } from './roadmap-input'
import RoadmapFlow from './roadmap-flow'

interface Props {
  roadmapId: string
  initialStatus: string
  initialNodes: Node[]
  initialEdges: Edge[]
  title: string | null
  initialUserInput: string | null
}

export function RoadmapClient({ 
  roadmapId, 
  initialStatus, 
  initialNodes, 
  initialEdges, 
  title: initialTitle,
  initialUserInput
}: Props) {
  const [status, setStatus] = useState(initialStatus)
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)
  const [title, setTitle] = useState(initialTitle)
  const [userInput, setUserInput] = useState<string | null>(initialUserInput)
  
  // Guard state to prevent auto-loading on empty new roadmaps
  const [hasStarted, setHasStarted] = useState(false)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // We are generating ONLY if the user clicked start AND the status is pending
  const isGenerating = hasStarted && status === 'pending'

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes(nds => applyNodeChanges(changes, nds)), [])
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges(eds => applyEdgeChanges(changes, eds)), [])
  const onConnect = useCallback((params: Connection) => setEdges(eds => addEdge(params, eds)), [])

  const startPolling = useCallback(() => {
    setHasStarted(true) // Triggers the loading UI
    setStatus('pending')
    
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/roadmap/${roadmapId}/status`)
        const data = await res.json()

        if (data.status === 'completed') {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setStatus('completed')
          setUserInput(data.userInput)
          setTitle(data.title)
          setNodes(data.nodes ?? [])
          setEdges(data.edges ?? [])
        } else if (data.status === 'failed') {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setStatus('failed')
        }
      } catch (err) {
        console.error("Polling error:", err)
      }
    }, 3000)
  }, [roadmapId])

  // Cleanup
  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <RoadmapInput 
        roadmapId={roadmapId} 
        onStartPolling={startPolling} 
        isGenerating={isGenerating} 
        title={title}
        userInput={userInput}
      />
      
      <section className="flex-1 relative bg-background">
        {/* Loading overlay - Only shows if hasStarted is true */}
        {isGenerating && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm border-l border-border">
            <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
            <p className="font-mono text-sm text-primary animate-pulse tracking-[0.2em] uppercase">
              Generating Your Personalized Roadmap
            </p>
          </div>
        )}

        {/* Empty State Placeholder */}
        {!hasStarted && nodes.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <div className="p-8 border border-dashed border-primary/20 rounded-2xl flex flex-col items-center gap-2">
              <p className="font-mono text-sm text-white uppercase tracking-widest">
               Your generated Roadmap here
              </p>
              <p className="font-mono text-[10px] text-muted-foreground">
                Enter the roadmap details in the panel and get your personalized roadmap
              </p>
            </div>
          </div>
        )}

        <RoadmapFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange} 
          onEdgesChange={onEdgesChange} 
          onConnect={onConnect} 
        />
      </section>
    </div>
  )
}