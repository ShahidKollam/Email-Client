"use client"

// hooks/useTemplates.ts
import { useState, useEffect } from "react"
import axios from "axios"
import type { Template } from "../types/types"

const useTemplates = () => {
  const [customeTemplate, setCustomeTemplate] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchCustomTemplates = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get<Template[]>(`http://localhost:3001/api/sendmail/Customtemplate`)
      setCustomeTemplate(response.data)
    } catch (error) {
      console.error("Error fetching templates:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomTemplates()
  }, [])

  return { customeTemplate, isLoading, fetchCustomTemplates }
}

export default useTemplates
