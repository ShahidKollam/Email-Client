"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { FaUserCircle, FaEnvelope, FaPhone, FaEdit, FaMapMarkerAlt, FaLink } from "react-icons/fa"
import TemplateSidebar from "../components/TemplateList/TemplateSidebar"
import axios from "axios"
import { Link } from "react-router-dom"
import Loading from "../components/general/Loading"
import Error from "../components/general/Error"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import type { UserTypes } from "../types/types"

const UserProfilePage: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user)

  const [user, setUser] = useState<UserTypes>({})
  const avatar = ""

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`${import.meta.env.VITE_API_SERVER_URL}/api/user/${currentUser?.id}`)
        setUser(response.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch user data")
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />

  return (
    <div className="flex">
      <TemplateSidebar />
      <div className="flex-1 min-h-screen bg-gray-50 p-2 flex justify-center items-start pt-20">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-blue-900 to-purple-700 p-6 text-white">
            <div className="flex items-center">
              {avatar ? (
                <img
                  src={avatar}
                  alt={`${user.name}'s avatar`}
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
              ) : (
                <FaUserCircle className="w-24 h-24 rounded-full border-4 border-white" />
              )}
              <div className="ml-4">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-sm text-gray-200">Joined on {user.joinedDate}</p>
              </div>
            </div>
            <button className="absolute top-4 right-4 bg-purple-800 hover:bg-purple-900 px-4 py-2 rounded text-sm">
              <FaEdit className="inline-block mr-2" />
              Edit Profile
            </button>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg">
                <FaEnvelope className="text-blue-500 mr-4" size={24} />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg">
                <FaPhone className="text-green-500 mr-4" size={24} />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">{user.phone}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center bg-gray-100 p-4 rounded-lg md:col-span-2">
                <FaMapMarkerAlt className="text-red-500 mr-4" size={24} />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">{user.address}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <h2 className="text-xl font-semibold mt-6 mb-4">Recent Activity</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-600">No recent activity yet.</p>
            </div>

            {/* Link to API Toolkit */}
            <div className="mt-6">
              <Link
                to="/api-toolkit"
                className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
              >
                <FaLink className="mr-2" />
                Go to API Toolkit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
