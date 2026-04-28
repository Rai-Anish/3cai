import { Node, Edge } from "@xyflow/react"

interface RoadmapData {
  roadmapTitle: string
  description: string
  duration: string
  initialNodes: Node[]
  initialEdges: Edge[]
}

export function parseRoadmapOutput(output: any[]): RoadmapData {
  const lastMessage = output[output.length - 1]
  if (!lastMessage?.content) throw new Error("No content in AI output")

  const raw = lastMessage.content
  const jsonMatch = raw.match(/```json\s*([\s\S]*?)\s*```/)
  const jsonStr = jsonMatch ? jsonMatch[1] : raw.trim()
  const parsed = JSON.parse(jsonStr)

  if (!parsed.initialNodes || !parsed.initialEdges) {
    throw new Error("Invalid roadmap structure from AI")
  }

  const cleanNodes = parsed.initialNodes.map((node: any) => ({
  ...node,
  type: 'roadmap',  
  data: {
    ...node.data,
    label: node.data?.title ?? node.data?.label ?? 'Untitled',
  },
}))

  const cleanEdges = parsed.initialEdges
    .filter((edge: any) => edge.source && edge.target)
    .map((edge: any) => ({
      ...edge,
      sourceHandle: edge.sourceHandle ?? undefined,
      targetHandle: edge.targetHandle ?? undefined,
    }))

  return {
    ...parsed,
    initialNodes: cleanNodes,
    initialEdges: cleanEdges,
  }
}