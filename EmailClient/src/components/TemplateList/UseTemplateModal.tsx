"use client"

import type React from "react"

import axios from "axios"
import { useState } from "react"
import useToast from "../../hooks/useToast"
import type { Template } from "../../types/types"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  templateData: Template | null // Update the type based on actual data structure
}

interface EmailData {
  recipient: string
  subject: string
  message: string
  appointmentDate: string
  appointmentTime: string
  patientName: string
  doctorName: string
  modeOfVisit: string
  location: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, templateData }) => {
  const { showSuccess, showError } = useToast()

  // State for form data
  const [emailData, setEmailData] = useState<EmailData>({
    recipient: "",
    subject: "",
    message: "",
    appointmentDate: "",
    appointmentTime: "",
    patientName: "",
    doctorName: "Dr. John Doe",
    modeOfVisit: "",
    location: "",
  })

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSendEmail = async () => {
    const { recipient, subject, appointmentDate, appointmentTime, patientName, modeOfVisit, location } = emailData

    if (!recipient || !subject || !appointmentDate || !appointmentTime || !patientName || !modeOfVisit || !location) {
      alert("Please fill in all fields.")
      return
    }

    try {
      const response = await axios.post("http://localhost:3000/api/sendmail/send_email", {
        template: templateData,
        recipient,
        subject,
        message: emailData.message,
        appointmentDate,
        appointmentTime,
        patientName,
        doctorName: emailData.doctorName,
        modeOfVisit,
        location,
      })

      if (response.data.success) {
        showSuccess("Emails sent successfully!")
      } else {
        showError("Error sending emails")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      showError("Error sending email. Please try again later.")
    }

    onClose()
  }

  if (!isOpen) return null // Don't render the modal if it's closed

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Template Email</h2>

        {/* Patient Name Field */}
        <div className="mb-4">
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
            Patient's Name
          </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={emailData.patientName}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter patient's name"
          />
        </div>

        {/* Recipient's Email Field */}
        <div className="mb-4">
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
            Recipient's Email
          </label>
          <input
            type="email"
            id="recipient"
            name="recipient"
            value={emailData.recipient}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter recipient's email"
          />
        </div>

        {/* Subject Field */}
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailData.subject}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter email subject"
          />
        </div>

        {/* Appointment Date and Time */}
        <div className="mb-4">
          <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
            Appointment Date
          </label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={emailData.appointmentDate}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">
            Appointment Time
          </label>
          <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={emailData.appointmentTime}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Mode of Visit */}
        <div className="mb-4">
          <label htmlFor="modeOfVisit" className="block text-sm font-medium text-gray-700">
            Mode of Visit
          </label>
          <select
            id="modeOfVisit"
            name="modeOfVisit"
            value={emailData.modeOfVisit}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Mode of Visit</option>
            <option value="In-Person">In-Person</option>
            <option value="Walk-in Visit">Walk-in Visit</option>
            <option value="Referral Visit">Referral Visit</option>
            <option value="Emergency Visit">Emergency Visit</option>
          </select>
        </div>

        {/* Location Field */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={emailData.location}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter the location"
          />
        </div>

        {/* Modal Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-300"
          >
            Close
          </button>
          <button
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
            onClick={handleSendEmail}
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
