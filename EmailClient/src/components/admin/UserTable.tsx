"use client"

// src/components/UserTable.tsx
import type React from "react"
import { useEffect, useState } from "react"
import { FaEllipsisH } from "react-icons/fa"
import Loading from "../general/Loading"
import Error from "../general/Error"
import axios from "axios"

interface User {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/api/user/userList`)
        setUsers(response.data)
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching users")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-4 text-left">User ID</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Date Created</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-100">
              <td className="px-6 py-4">{user.id}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-center">
                <button className="text-gray-800 hover:text-red-700">
                  <FaEllipsisH size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
