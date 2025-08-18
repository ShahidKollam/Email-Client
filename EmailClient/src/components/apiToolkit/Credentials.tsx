"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import Loading from "../general/Loading"
import Error from "../general/Error"
import useClientFetch from "../../hooks/fetchHooks/useClientFetch"
import useToast from "../../hooks/useToast"
import axios from "axios"
import EntityInfo from "./EntityInfo"
import ClientsTable from "./ClientsTable"
import GenerateClientModal from "../modals/GenerateClientModal"

const Credentials = () => {
  const user = useSelector((state: RootState) => state.user)
  const userId = user?.id
  const [copied, setCopied] = useState<string | null>(null)
  const { data, loading, error, refetch } = useClientFetch(userId)
  const { showSuccess, showError } = useToast()
  const [showModal, setShowModal] = useState<boolean>(false)

  const [entityId, setEntityId] = useState<string>("") // State to store entityId

  const clientData = Array.isArray(data) && data.length > 0 ? data[0] : data
  const entity = clientData?.User || "N/A"

  const handleCopyToClipboard = (value: string, field: string) => {
    navigator.clipboard.writeText(value)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleGenerateNewClient = async (clientName: string) => {
    try {
      if (!entityId) {
        showError("Entity ID is missing")
        return
      }

      const payload = {
        userId: userId,
        entityId: entityId, // Pass the entityId in the payload
        clientName: clientName,
      }

      const res = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/api/entity/createClient`, payload)
      if (res.status === 201) {
        showSuccess("New Client Generated")
        refetch()
      }
    } catch (error) {
      console.log(error)
      showError("Failed to generate client")
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} />

  const clients = Array.isArray(data) ? data : []

  return (
    <div className="p-4 space-y-6 max-w-6xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Entity - Clients</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out"
        >
          Generate New Client Credential
        </button>
      </div>

      {entity && (
        <EntityInfo
          copied={copied}
          handleCopyToClipboard={handleCopyToClipboard}
          // Pass the callback function to set entityId in the parent
          setEntityId={setEntityId}
        />
      )}

      <ClientsTable clients={clients} />

      <GenerateClientModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onGenerate={handleGenerateNewClient}
      />
    </div>
  )
}

export default Credentials
