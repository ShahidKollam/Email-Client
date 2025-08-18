"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const useFetch = (userId: string | null) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_SERVER_URL}/api/subscription/${userId}`
        const response = await axios.get(apiUrl)
        setData(response.data)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return { data, loading, error }
}

export default useFetch
