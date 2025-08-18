"use client"

import axios from "axios"
import type React from "react"
import { useState, useEffect } from "react"
import AUTH_URL from "../api/authApi"
import { useNavigate } from "react-router-dom"

interface OTPModalProps {
  closeModal: () => void
  email?: string
  mobileNumber?: string
}

const OTPModal: React.FC<OTPModalProps> = ({ closeModal, email, mobileNumber }) => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string>("")
  const [otpMethod, setOtpMethod] = useState<"email" | "mobile" | null>(null)
  const [timer, setTimer] = useState<number>(30)
  const [timerActive, setTimerActive] = useState<boolean>(false)
  const [otpSent, setOtpSent] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setOtpMethod(null)
      setOtpSent(false)
      setTimerActive(false)
    }
    return () => clearInterval(interval)
  }, [timerActive, timer])

  const handleOtpMethodSelect = (method: "email" | "mobile") => {
    setOtpMethod(method)
    sendOtp(method)
  }

  const sendOtp = async (method: "email" | "mobile") => {
    try {
      setError("")
      const response = await axios.post(AUTH_URL.SEND_OTP, { method, email, mobileNumber })
      if (response.status === 200) {
        setOtpSent(true)
        setTimer(30) // Reset the timer to 30 seconds
        setTimerActive(true)
      } else {
        setError("Failed to send OTP. Please try again.")
      }
    } catch (error: any) {
      console.error("Error sending OTP:", error)
      setError(error.response ? error.response.data.message : "Network error")
    }
  }

  const handleSubmitOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setError("")

      const response = await axios.post(AUTH_URL.VERIFY_OTP, { otp, email })
      if (response.status === 200) {
        closeModal()
        navigate("/login")
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error)
      setError(error.response ? error.response.data.message : "Network error")
    }
  }

  // const handleResendOtp = () => {
  //     if (otpMethod) {
  //         sendOtp(otpMethod);
  //     }
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[40%] relative ">
        {!otpSent && (
          <div className="h-[27vh]">
            <h3 className="text-2xl font-semibold mb-6">Select OTP Method</h3>
            <p className="text-lg text-gray-900 mb-4">
              Please choose the method through which you'd like to receive your OTP.
            </p>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              onClick={() => handleOtpMethodSelect("email")}
              className=" mt-5 mr-4 bg-blue-500 text-white px-10 py-3 mb-4 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Send OTP via Email
            </button>
            {/* <button
              onClick={() => handleOtpMethodSelect("mobile")}
              className=" mt-10 bg-green-500 text-white px-10 py-3 rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Send OTP via Mobile
            </button> */}
          </div>
        )}

        {otpSent && (
          <div className="h-[30vh]">
            <h3 className="text-2xl font-semibold mb-6">Enter OTP</h3>
            <p className="text-sm text-gray-500 mb-4">
              We have sent the OTP to your {otpMethod}. Please enter it below to proceed.
            </p>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmitOTP}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full px-6 py-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                aria-label="Enter OTP"
              />
              <button
                type="submit"
                className="w-full bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 focus:outline-none"
              >
                Submit OTP
              </button>
            </form>
            <div className="text-center mt-6">
              {timer > 0 ? (
                <p className="text-sm text-gray-500">OTP expires in: {timer} seconds</p>
              ) : (
                <p className="text-sm text-gray-500">OTP expired</p>
              )}
            </div>
          </div>
        )}

        <button
          onClick={closeModal}
          className="absolute top-2 right-5 text-2xl text-red-500 hover:text-gray-800"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default OTPModal
