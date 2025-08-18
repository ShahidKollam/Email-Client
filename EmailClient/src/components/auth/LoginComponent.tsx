"use client"

import React, { useState, ChangeEvent, FormEvent } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../../redux/slice/userSlice"
import AUTH_URL from "../api/authApi"

interface FormData {
  email?: string
  password?: string
  form?: string
}

const LoginComponent: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" })
  const [errors, setErrors] = useState<FormData>({})
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => ({ ...prev, [id]: undefined }))
  }

  const validateForm = (): boolean => {
    const { email, password } = formData
    const newErrors: FormData = {}
    if (!email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email"
    if (!password) newErrors.password = "Password is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    try {
      const response = await axios.post(AUTH_URL.LOGIN, {
        email: formData.email,
        password: formData.password,
      })
      const user = response.data.user
      dispatch(login(user))
      navigate("/")
    } catch (error: any) {
      setErrors({ form: "Login failed. Please check your credentials." })
    } finally {
      setLoading(false)
    }
  }

  // Guest login
  const handleGuestLogin = async () => {
    setLoading(true)
    try {
      const response = await axios.post(AUTH_URL.LOGIN, {
        email: "Guest@yopmail.com",
        password: "Guest12",
      })
      const user = response.data.user
      dispatch(login(user))
      navigate("/")
    } catch {
      setErrors({ form: "Guest login not available. Try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      {/* Left Panel - Guest Login */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center backdrop-blur-xl bg-white/10 p-12 border-r border-white/20 shadow-2xl">
        <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 to-yellow-300 text-transparent bg-clip-text">
          Instant Access 🚀
        </h2>
        <p className="text-gray-200 mb-10 text-center max-w-sm leading-relaxed">
          Not ready to sign up yet?  
          Jump right in and explore the app with our <span className="font-semibold text-yellow-300">Guest Mode</span>.  
          No account needed, just click below!
        </p>
        <button
          onClick={handleGuestLogin}
          disabled={loading}
          className="w-64 py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 
          text-lg font-bold shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 ease-out"
        >
          {loading ? "Loading..." : "✨ Continue as Guest"}
        </button>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h2>
          <p className="text-center text-gray-300 mb-6">Login to your account</p>

          {errors.form && (
            <div className="bg-red-600 text-white p-3 rounded-md mb-4 text-center">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border-2 focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-600"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border-2 focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-600"
                }`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Signup */}
          <p className="mt-6 text-center text-sm text-gray-300">
            Don’t have an account?{" "}
            <a href="/sign-up" className="text-pink-400 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
