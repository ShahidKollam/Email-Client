"use client"

import type React from "react"
import { useState } from "react"
import { CheckIcon, ClipboardIcon, EyeIcon, EyeOffIcon, TrashIcon } from "@heroicons/react/outline"
import axios from "axios"
import useToast from "../../hooks/useToast"
// import useClientFetch from "../../hooks/fetchHooks/useClientFetch";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";

interface Client {
  clientId: string
  clientName: string // Add clientName to the interface
  apiToken: string
  clientSecret: string
  createdAt: string
  id: string
}

const ClientsTable: React.FC<{ clients: Client[] }> = ({ clients }) => {
  // const user = useSelector((state: RootState) => state.user);

  const [copied, setCopied] = useState<{ clientId: string; field: string } | null>(null)
  const [showSecretKey, setShowSecretKey] = useState<Record<string, boolean>>({})
  const { showSuccess, showError } = useToast()

  const [clientsState, setClientsState] = useState<Client[]>(clients)

  const handleCopyToClipboard = (value: string, clientId: string, field: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied({ clientId, field })

      setTimeout(() => {
        setCopied(null)
      }, 2000)
    })
  }

  const handleToggleSecretKey = (clientId: string) => {
    setShowSecretKey((prevState) => ({
      ...prevState,
      [clientId]: !prevState[clientId],
    }))
  }

  const handleDeleteClient = async (clientId: string) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_SERVER_URL}/api/entity/clients/${clientId}`)
      if (response.status === 200) {
        showSuccess("Client deleted successfully!")
        // Update state to remove deleted client
        setClientsState((prevState) => prevState.filter((client) => client.id !== clientId))
      } else {
        showError(`Failed to delete client: ${response.data?.message || response.statusText}`)
      }
    } catch (error) {
      console.error("Error while deleting client:", error)
      showError("An error occurred while deleting the client. Please try again.")
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">Client Name</th>{" "}
            {/* New column for Client Name */}
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">Client ID</th>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">API Token</th>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">Client Secret</th>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">Created At</th>
            <th className="px-6 py-3 text-left text-gray-600 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clientsState.map((client) => (
            <tr key={client.clientId} className="border-t">
              <td className="px-6 py-4 text-gray-700">{client.clientName}</td> {/* Display Client Name */}
              {["clientId", "apiToken", "clientSecret"].map((field, index) => {
                const isSecret = field === "clientSecret"
                const value = client[field as keyof Client] || (isSecret ? "N/A" : "")

                return (
                  <td key={index} className="px-6 py-4 text-gray-700 relative">
                    <div className="flex items-center">
                      <input
                        type={isSecret && !showSecretKey[client.clientId] ? "password" : "text"}
                        value={value}
                        readOnly
                        className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-400"
                      />
                      {field !== "createdAt" && (
                        <div className="flex items-center ml-2">
                          <button
                            onClick={() => handleCopyToClipboard(value, client.clientId, field)}
                            className="text-gray-600 hover:text-indigo-800"
                          >
                            {copied?.clientId === client.clientId && copied?.field === field ? (
                              <CheckIcon className="w-5 h-5 text-green-500" />
                            ) : (
                              <ClipboardIcon className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      )}
                      {isSecret && (
                        <div className="flex items-center ml-2">
                          <button
                            onClick={() => handleToggleSecretKey(client.clientId)}
                            className="text-gray-600 hover:text-indigo-800"
                          >
                            {showSecretKey[client.clientId] ? (
                              <EyeOffIcon className="w-5 h-5" />
                            ) : (
                              <EyeIcon className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                )
              })}
              <td className="px-6 py-4 text-gray-700">
                {new Date(client.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-6 py-4 text-gray-700">
                <div className="flex justify-center">
                  <button onClick={() => handleDeleteClient(client.id)} className="text-red-600 hover:text-red-800">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ClientsTable
