"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"

interface Data {
  id: number
  clientId: string
  apiToken: string
  clientSecret: string
  entityId: string
  createdAt: string
  User: {
    entityName: string
    entityId: string
  }
}

const useClientFetch = (userId: string | null) => {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      if (!userId) {
        setError("No user ID provided")
        return
      }

      const apiUrl = `${import.meta.env.VITE_API_SERVER_URL}/api/entity/clients/${userId}`
      const response = await axios.get(apiUrl)
      setData(response.data)
    } catch (error) {
      setError("Failed to fetch client data")
      console.error("Error fetching client data:", error)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      fetchData()
    }
  }, [userId, fetchData])

  return { data, loading, error, refetch: fetchData }
}

export default useClientFetch
