import React from 'react'

interface PageProps {
  params: Promise<{ resumeId: string }>
}

export default async function ResumeIdPage({ params }: PageProps) {
  const { resumeId } = await params
  
  return (
    <div>Resume ID: {resumeId}</div>
  )
}