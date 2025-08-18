"use client"

import type React from "react"
import { useState, type ChangeEvent, type FormEvent } from "react"
import axios from "axios"
import AUTH_URL from "../api/authApi"
import OTPModal from "../modals/OTPModal"

interface FormData {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  mobileNumber?: string
  entityName?: string
  form?: string
}

const SignUpComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    entityName: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<FormData>({})
  const [showOTPModal, setShowOTPModal] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => ({ ...prev, [id]: undefined }))
  }

  const validateForm = (): boolean => {
    const { name, email, password, confirmPassword, mobileNumber, entityName } = formData
    const newErrors: FormData = {}

    if (!name) newErrors.name = "Name is required"
    if (!email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email"

    if (!password) newErrors.password = "Password is required"
    else if (password.length < 6) newErrors.password = "Min 6 characters"

    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don’t match"

    if (!mobileNumber) newErrors.mobileNumber = "Mobile number required"
    else if (!/^\d{10}$/.test(mobileNumber)) newErrors.mobileNumber = "Invalid number"

    if (!entityName) newErrors.entityName = "Entity name required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)

    try {
      const response = await axios.post(AUTH_URL.REGISTER, {
        ...formData,
      })
      if (response.status === 201) setShowOTPModal(true)
    } catch (error: any) {
      setErrors({ form: error.response?.data?.message || "Signup failed" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 p-6">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-white text-center mb-3">Create Account</h2>
        <p className="text-gray-300 text-center mb-8">Sign up to get started 🚀</p>

        {errors.form && (
          <div className="bg-red-600 text-white p-3 rounded-md mb-6 text-center">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border-2 ${
                errors.name ? "border-red-500" : "border-gray-600"
              } focus:ring-2 focus:ring-purple-500`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border-2 ${
                errors.email ? "border-red-500" : "border-gray-600"
              } focus:ring-2 focus:ring-purple-500`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="mobileNumber" className="block text-sm text-gray-300 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="9876543210"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border-2 ${
                errors.mobileNumber ? "border-red-500" : "border-gray-600"
              } focus:ring-2 focus:ring-purple-500`}
            />
            {errors.mobileNumber && <p className="text-red-500 text-xs">{errors.mobileNumber}</p>}
          </div>

          {/* Entity */}
          <div>
            <label htmlFor="entityName" className="block text-sm text-gray-300 mb-1">
              Entity Name
            </label>
            <input
              type="text"
              id="entityName"
              value={formData.entityName}
              onChange={handleChange}
              placeholder="Company / Org"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border-2 ${
                errors.entityName ? "border-red-500" : "border-gray-600"
              } focus:ring-2 focus:ring-purple-500`}
            />
            {errors.entityName && <p className="text-red-500 text-xs">{errors.entityName}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border-2 ${
                errors.password ? "border-red-500" : "border-gray-600"
              } focus:ring-2 focus:ring-purple-500`}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••"
              className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white border-2 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-600"
              } focus:ring-2 focus:ring-purple-500`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold text-white shadow-lg hover:scale-105 transition-transform disabled:bg-gray-500"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="text-gray-300 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-pink-400 hover:underline">
            Login
          </a>
        </p>
      </div>

      {/* OTP Modal */}
      {showOTPModal && (
        <OTPModal
          closeModal={() => setShowOTPModal(false)}
          email={formData.email}
          mobileNumber={formData.mobileNumber}
        />
      )}
    </div>
  )
}

export default SignUpComponent
