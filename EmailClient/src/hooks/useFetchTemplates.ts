"use client"

import { useState, useEffect } from "react"
import axios from "axios"

interface Template {
  id: string
  category: string
  [key: string]: any // Add other properties as needed
}

const useFetchTemplates = (userId?: string | null) => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true)
      setError(null) // Reset error state

      const url = userId
        ? `${import.meta.env.VITE_API_SERVER_URL}/api/template/custom-template/${userId}`
        : `${import.meta.env.VITE_API_SERVER_URL}/api/template/templateList`

      try {
        const response = await axios.get(url)

        if (response.status === 200) {
          const fetchedTemplates = response.data
          setTemplates(fetchedTemplates)
        } else {
          throw new Error("Failed to fetch templates")
        }
      } catch (err: any) {
        console.error("Error fetching templates:", err)
        setError(err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [userId])

  return { templates, setTemplates, loading, error }
}

export default useFetchTemplates
