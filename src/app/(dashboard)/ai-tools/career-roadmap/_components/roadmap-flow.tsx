"use client"

import { useMemo } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { RoadmapNode } from './roadmap-node'

interface RoadmapFlowProps {
  nodes: Node[]
  edges: Edge[]
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
}

const proOptions = { hideAttribution: true }

export default function RoadmapFlow({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect
}: RoadmapFlowProps) {
  
  //  custom types within the flow component
  const nodeTypes = useMemo(() => ({
    roadmap: RoadmapNode
  }), [])

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        colorMode="dark"
        proOptions={proOptions}
      >
        <Background color="#e9ffb9" variant={BackgroundVariant.Dots} gap={20} />
        <Controls />
        <MiniMap 
          nodeColor="var(--primary)" 
          maskColor="rgba(0,0,0,0.6)" 
          className="bg-card/50! border-border!" 
        />
      </ReactFlow>
    </div>
  )
}