"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"

export function NewRoadmapButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleCreate() {
    setLoading(true)
    try {
      const { data } = await axios.post<{ roadmapId: string }>('/api/roadmap/create')
      router.push(`/ai-tools/career-roadmap/${data.roadmapId}`)
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      console.log("STATUS:", error.response?.status)
      console.log("DATA:", error.response?.data)
      console.log("REQUEST:", error.request)
      console.log("MESSAGE:", error.message)

      if (error.response) {
        // Server responded with error status
        switch (error.response.status) {
          case 401:
            toast.error("Session expired. Please sign in again.")
            router.push('/login')
            break
          case 403:
            toast.error(error.response.data?.message ?? "Roadmap limit reached. Delete one to continue.")
            break
          case 429:
            toast.error("Too many requests. Please wait a moment.")
            break
          case 500:
            toast.error("Server error. Please try again later.")
            break
          default:
            toast.error(error.response.data?.message ?? "Something went wrong.")
        }
      } else if (error.request) {
        // Request made but no response — network issue
        toast.error("No internet connection. Please check your network.")
      } else {
        toast.error("Unexpected error. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleCreate} disabled={loading}>
      {loading
        ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</>
        : <>New Roadmap <Plus className="mr-2 h-4 w-4" /></>
      }
    </Button>
  )
}