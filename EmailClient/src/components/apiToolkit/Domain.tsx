"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { PencilAltIcon, TrashIcon, PlusCircleIcon, CheckIcon, XIcon } from "@heroicons/react/outline"
import CLIENT_API from "../api/client"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import useToast from "../../hooks/useToast"

interface Domain {
  id: number
  name: string
}

const Domain: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const { showSuccess, showError } = useToast() // Destructure toast functions

  const [domains, setDomains] = useState<Domain[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [newDomain, setNewDomain] = useState("")
  const [editingDomainId, setEditingDomainId] = useState<number | null>(null)
  const [editedDomain, setEditedDomain] = useState("")

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const fetchDomains = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(CLIENT_API.GET_DOMAIN(user.id))
        setDomains(response.data || [])
      } catch (error) {
        console.error("Error fetching domains:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDomains()
  }, [user.id])

  // Focus input when editing a domain
  useEffect(() => {
    if (editingDomainId !== null) {
      inputRef.current?.focus()
    }
  }, [editingDomainId])

  const handleAddDomainClick = () => {
    setIsAdding(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleSaveNewDomain = async () => {
    if (newDomain.trim() === "") return

    try {
      const response = await axios.post(CLIENT_API.ADD_DOMAIN(user.id), { name: newDomain })
      setDomains((prev) => [...prev, response.data])
      setNewDomain("")
      setIsAdding(false)
      showSuccess("Domain added successfully!") // Show success toast
    } catch (error) {
      console.error("Error adding domain:", error)
      showError("Failed to add domain.") // Show error toast
    }
  }

  const handleSaveEdit = async () => {
    if (!editingDomainId || editedDomain.trim() === "") return

    try {
      await axios.put(CLIENT_API.UPDATE_DOMAIN(editingDomainId), { name: editedDomain })
      setDomains((prev) =>
        prev.map((domain) => (domain.id === editingDomainId ? { ...domain, name: editedDomain } : domain)),
      )
      setEditingDomainId(null)
      setEditedDomain("")
      showSuccess("Domain updated successfully!") // Show success toast
    } catch (error) {
      console.error("Error updating domain:", error)
      showError("Failed to update domain.") // Show error toast
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(CLIENT_API.DELETE_DOMAIN(id))
      setDomains((prev) => prev.filter((domain) => domain.id !== id))
      showSuccess("Domain deleted successfully!") // Show success toast
    } catch (error) {
      console.error("Error deleting domain:", error)
      showError("Failed to delete domain.") // Show error toast
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Domain Registration</h1>
        {!isAdding && (
          <button
            onClick={handleAddDomainClick}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Add Domain
          </button>
        )}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-hidden rounded-lg shadow-md">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Domain Name</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {domains.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center text-gray-600">
                    No domains available.
                  </td>
                </tr>
              ) : (
                domains.map((domain) => (
                  <tr
                    key={domain.id}
                    className={`border-b ${
                      editingDomainId === domain.id
                        ? "bg-blue-100 border-blue-400 transition-colors duration-300"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      {editingDomainId === domain.id ? (
                        <input
                          ref={inputRef}
                          type="text"
                          value={editedDomain}
                          onChange={(e) => setEditedDomain(e.target.value)}
                          className="w-full px-4 py-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      ) : (
                        <span className="text-gray-700">{domain.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingDomainId === domain.id ? (
                        <div className="inline-flex items-center space-x-2">
                          <button onClick={handleSaveEdit} className="text-green-600 hover:text-green-800 transition">
                            <CheckIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setEditingDomainId(null)}
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            <XIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center space-x-4">
                          <button
                            onClick={() => {
                              setEditingDomainId(domain.id)
                              setEditedDomain(domain.name)
                            }}
                            className="text-indigo-600 hover:text-indigo-800 transition"
                          >
                            <PencilAltIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(domain.id)}
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
              {isAdding && (
                <tr className="border-b bg-green-100 border-green-400 transition-colors duration-300">
                  <td className="px-6 py-4">
                    <input
                      ref={inputRef}
                      type="text"
                      value={newDomain}
                      onChange={(e) => setNewDomain(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Enter domain name"
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center space-x-2">
                      <button onClick={handleSaveNewDomain} className="text-green-600 hover:text-green-800 transition">
                        <CheckIcon className="w-5 h-5" />
                      </button>
                      <button onClick={() => setIsAdding(false)} className="text-red-600 hover:text-red-800 transition">
                        <XIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Domain
