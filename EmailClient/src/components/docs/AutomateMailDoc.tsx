"use client"

import { useState } from "react"
import { FaClipboard, FaCheck } from "react-icons/fa"
import { CopyToClipboard } from "react-copy-to-clipboard"

const AutomateMailDoc = () => {
  const [isCopied, setIsCopied] = useState<string | null>(null)

  const apiUrl = "http://localhost:3001/api/sendmail/automate-email"

  // Updated to use 24-hour format for timeInput
  const examplePayload = `{
    "templateId": 45,
    "timeInput": "16:57",
    "dateInput": "2025-01-25",
    "recipient": ["recipient@example.com"],
    "placeholders": {
      "clientName": "Acme Corp",
      "User Name": "John Doe"
    }
  }`

  const postRequestExample = `const sendAutomatedEmail = async () => {
    const payload = {
      templateId: 45,
      timeInput: "16:57", // 24-hour format time
      dateInput: "2025-01-25",
      recipient: ["recipient@example.com"],
      placeholders: {
        "clientName": "Acme Corp",
        "User Name": "John Doe"
      }
    };

    const headers = {
      'Content-Type': 'application/json',
      'Client-ID': 'your-client-id-1234',
      'API-Token': 'your-api-token-5678',
      'Secret-Key': 'your-secret-key-xyz',
    };

    const response = await fetch("${apiUrl}", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });
  };`

  const placeholdersExample = `"placeholders": {
    "clientName": "Acme Corp",
    "User Name": "John Doe"
  }`

  return (
    <div className="bg-gray-900 text-white font-sans max-w-[90vw] overflow-y-auto">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-extrabold text-indigo-400 text-center mb-8">
          Automate Email Sending API Integration Guide
        </h1>

        <p className="text-xl text-gray-300 text-center mb-12">
          Learn how to integrate the <strong>TemplatePro API</strong> to automate email sending using your custom
          templates.
        </p>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl mb-12">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">Step 1: API Endpoint and Request Payload</h2>

          <p className="text-xl text-gray-300 mb-4">
            To send an automated email, you need to make a **POST** request to the following API endpoint:
          </p>

          <div className="relative flex items-center space-x-2 mb-6">
            <span className="text-2xl text-gray-50 font-semibold">{apiUrl}</span>
            <CopyToClipboard text={apiUrl} onCopy={() => setIsCopied("apiUrl")}>
              <button className="flex items-center p-2 bg-slate-600 rounded-md text-gray-300">
                {isCopied === "apiUrl" ? <FaCheck className="mr-2 text-green-400" /> : <FaClipboard className="mr-2" />}
                <span className="text-lg">{isCopied === "apiUrl" ? "Copied" : "Copy URL"}</span>
              </button>
            </CopyToClipboard>
          </div>

          <p className="text-xl text-gray-300 mb-4">
            The payload for the request should include the following parameters:
          </p>

          <ul className="text-xl text-gray-300 mb-4 list-disc pl-6">
            <li>
              <strong>timeInput</strong>: The time when you want the email to be sent (e.g., `16:57` for 4:57 PM in
              24-hour format).
            </li>
            <li>
              <strong>dateInput</strong>: The date for sending the email (e.g., `2025-01-25`).
            </li>
            <li>
              <strong>recipient</strong>: A list of email addresses (e.g., `["recipient@example.com"]`).
            </li>
            <li>
              <strong>placeholders</strong>: A set of key-value pairs where:
              <ul className="pl-6">
                <li>
                  Keys are placeholders defined in your template (e.g., {`{clientName}`}, {`{UserName}`}).
                </li>
                <li>
                  Values are the dynamic content to be injected into those placeholders (e.g.,{" "}
                  {`{"clientName": "Acme Corp", "UserName": "John Doe"}`}).
                </li>
              </ul>
            </li>
          </ul>

          <div className="bg-gray-700 p-4 rounded-lg shadow-md overflow-auto mb-6 relative">
            <pre className="text-lg text-gray-100 whitespace-pre-wrap">{examplePayload}</pre>
            <CopyToClipboard text={examplePayload} onCopy={() => setIsCopied("examplePayload")}>
              <button className="absolute right-0 top-0 flex items-center p-2 bg-slate-600 rounded-md text-gray-300">
                {isCopied === "examplePayload" ? (
                  <FaCheck className="mr-2 text-green-400" />
                ) : (
                  <FaClipboard className="mr-2" />
                )}
                <span className="text-lg">{isCopied === "examplePayload" ? "Copied" : "Copy Example Payload"}</span>
              </button>
            </CopyToClipboard>
          </div>

          <h3 className="text-2xl font-semibold text-indigo-200 mt-8 mb-4">
            Step 2: Handling Time and Date for Email Sending
          </h3>
          <p className="text-xl text-gray-300 mb-4">
            The **timeInput** and **dateInput** fields in the payload determine when the email will be sent. You should
            provide:
            <ul className="list-disc pl-6">
              <li>Time in 24-hour format (e.g., `16:57`).</li>
              <li>Date in the format `YYYY-MM-DD` (e.g., `2025-01-25`).</li>
            </ul>
          </p>

          <h3 className="text-2xl font-semibold text-indigo-200 mt-8 mb-4">Step 3: Handling Placeholders</h3>
          <p className="text-xl text-gray-300 mb-4">
            Templates may include placeholders like <code>{`{clientName}`}</code> and <code>{`{User Name}`}</code>.
          </p>

          <div className="bg-gray-700 p-4 rounded-lg shadow-md overflow-auto mb-6 relative">
            <pre className="text-lg text-gray-100 whitespace-pre-wrap">{placeholdersExample}</pre>
            <CopyToClipboard text={placeholdersExample} onCopy={() => setIsCopied("placeholdersExample")}>
              <button className="absolute right-0 top-0 flex items-center p-2 bg-slate-600 rounded-md text-gray-300">
                {isCopied === "placeholdersExample" ? (
                  <FaCheck className="mr-2 text-green-400" />
                ) : (
                  <FaClipboard className="mr-2" />
                )}
                <span className="text-lg">
                  {isCopied === "placeholdersExample" ? "Copied" : "Copy Placeholders Example"}
                </span>
              </button>
            </CopyToClipboard>
          </div>

          <h3 className="text-2xl font-semibold text-indigo-200 mt-8 mb-4">Step 4: Make the POST Request</h3>
          <p className="text-xl text-gray-300 mb-4">
            Now, you can send the POST request with the payload prepared in Step 1. Below is an example of how you can
            send the request using JavaScript:
          </p>

          <div className="bg-gray-700 p-4 rounded-lg shadow-md overflow-auto mb-6 relative">
            <pre className="text-lg text-gray-100 whitespace-pre-wrap">{postRequestExample}</pre>
            <CopyToClipboard text={postRequestExample} onCopy={() => setIsCopied("sendEmailExample")}>
              <button className="absolute right-0 top-0 flex items-center p-2 bg-slate-600 rounded-md text-gray-300">
                {isCopied === "sendEmailExample" ? (
                  <FaCheck className="mr-2 text-green-400" />
                ) : (
                  <FaClipboard className="mr-2" />
                )}
                <span className="text-lg">{isCopied === "sendEmailExample" ? "Copied" : "Copy Example Code"}</span>
              </button>
            </CopyToClipboard>
          </div>

          <h3 className="text-2xl font-semibold text-indigo-200 mt-8 mb-4">Important Notes</h3>
          <ul className="text-xl text-gray-300 mb-4 list-disc pl-6">
            <li>Make sure to replace placeholders with the actual values before sending emails.</li>
            <li>Clients can clone and customize existing templates to fit their needs.</li>
            <li>Only valid email addresses should be passed in the `recipient` field.</li>
            <li>Ensure that you handle responses and errors effectively for smooth operations.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AutomateMailDoc
