"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ClipboardIcon, CheckIcon } from "@heroicons/react/outline"
import axios from "axios"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"

interface EntityInfoProps {
  copied: string | null
  handleCopyToClipboard: (value: string, field: string) => void
  setEntityId: (id: string) => void // Callback to set entityId in parent
}

const EntityInfo: React.FC<EntityInfoProps> = ({ copied, handleCopyToClipboard, setEntityId }) => {
  const user = useSelector((state: RootState) => state.user)

  const [entityName, setEntityName] = useState<string>("")
  const [entityId, setEntityIdLocal] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch entity data based on userId
  useEffect(() => {
    const fetchEntityData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/api/entity/getEntity/${user?.id}`)
        console.log(response.data)

        setEntityName(response.data.entityName)
        const fetchedEntityId = response.data.entityId
        setEntityIdLocal(fetchedEntityId) // Local state for entityId
        setEntityId(fetchedEntityId) // Send entityId to the parent via callback
      } catch (error) {
        setError("Failed to fetch entity data")
        console.error("Error fetching entity data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEntityData()
  }, [user?.id, setEntityId]) // Run effect when userId changes

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="mb-6 bg-indigo-100 p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-8">
        {/* Entity Name Section */}
        <div>
          <label className="block text-gray-600 font-medium">Entity Name</label>
          <div className="relative">
            <div className="px-4 py-3 border rounded-md bg-gray-50 text-gray-700 shadow-sm hover:bg-indigo-100 transition duration-200">
              {entityName}
            </div>
            <div
              onClick={() => handleCopyToClipboard(entityName, "entity-name")}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {copied === "entity-name" ? (
                <CheckIcon className="w-5 h-5 text-green-500" />
              ) : (
                <ClipboardIcon className="w-5 h-5 text-gray-600 hover:text-indigo-800" />
              )}
            </div>
          </div>
        </div>

        {/* Entity ID Section */}
        <div>
          <label className="block text-gray-600 font-medium">Entity ID</label>
          <div className="relative">
            <div className="px-4 py-3 border rounded-md bg-gray-50 text-gray-700 shadow-sm hover:bg-indigo-100 transition duration-200">
              {entityId}
            </div>
            <div
              onClick={() => handleCopyToClipboard(entityId, "entity-id")}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {copied === "entity-id" ? (
                <CheckIcon className="w-5 h-5 text-green-500" />
              ) : (
                <ClipboardIcon className="w-5 h-5 text-gray-600 hover:text-indigo-800" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntityInfo
