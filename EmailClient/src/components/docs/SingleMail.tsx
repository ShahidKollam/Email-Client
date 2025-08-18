"use client"

import { useState } from "react"
import { FaClipboard, FaCheck } from "react-icons/fa"
import { CopyToClipboard } from "react-copy-to-clipboard"

const SingleMail = () => {
  const [isCopied, setIsCopied] = useState<string | null>(null)

  const apiUrl = "http://localhost:3001/api/sendmail/sendmailbyid"

  // The headers remain the same
  const headersCode = `const headers = {
    'Content-Type': 'application/json',
    'Client-ID': 'your-client-id-1234', 
    'API-Token': 'your-api-token-5678', 
    'Secret-Key': 'your-secret-key-xyz', 
  };`

  // Update the request to reflect how the payload should be structured
  const requestCode = `  
  const payload = { 
    recipient: { email: 'recipient@example.com' }, 
    templateId: 123, 
    placeholders: { 
      keys: 'values',
    }
  };
  const res = await axios.post(API_SEND_MAIL, payload, {
    headers: headers,
  });`

  // Full example including the updated payload structure
  const fullExampleCode = `  
  const apiUrl = "http://localhost:3001/api/sendmail/sendmailbyid";

  const headers = {
    'Content-Type': 'application/json',
    'Client-ID': 'your-client-id-1234',
    'API-Token': 'your-api-token-5678',
    'Secret-Key': 'your-secret-key-xyz',
  };

  const recipient = { email: 'recipient@example.com' };
  const templateId = 123;

  const placeholders = { 
    firstName: 'John', 
    lastName: 'Doe', 
    appointmentDate: '2025-01-20' 
  };

  const payload = { recipient, templateId, placeholders };

  const sendEmail = async () => {
    try {
      const res = await axios.post(apiUrl, payload, { headers: headers });
      console.log("Email sent successfully:", res.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  sendEmail();
  `

  return (
    <div className="bg-gray-900 text-white font-sans max-w-[90vw] overflow-y-auto">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-extrabold text-indigo-400 text-center mb-8">Single Email API Integration Guide</h1>

        <p className="text-xl text-gray-300 text-center mb-12">
          Learn how to integrate the <strong>TemplatePro API</strong> into your app to send a single email.
        </p>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl mb-12">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">Step 1: Make the API Call</h2>
          <p className="text-xl text-gray-300 mb-4">
            To send a single email using the TemplatePro API, use the endpoint provided below. This URL is used for the
            POST request to TemplatePro. Copy the URL below and use it in your API request.
          </p>
          <div className="relative flex items-center space-x-2 mb-6">
            <span className="text-2xl text-gray-50 font-semibold">{apiUrl}</span>
            <CopyToClipboard text={apiUrl} onCopy={() => setIsCopied("apiUrl")}>
              <button className="flex items-center p-2 bg-slate-600 rounded-md text-gray-300 hover:bg-slate-500">
                {isCopied === "apiUrl" ? (
                  <>
                    <FaCheck className="mr-2 text-green-400" />
                    <span className="text-lg text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <FaClipboard className="mr-2" />
                    <span className="text-lg">Copy URL</span>
                  </>
                )}
              </button>
            </CopyToClipboard>
          </div>

          <h3 className="text-2xl font-semibold text-indigo-200 mt-8 mb-4">Step 2: Set Up Your Request</h3>
          <p className="text-xl text-gray-300 mb-4">
            Before you send the request, you need to set up the headers. These headers will ensure that your request is
            authorized and correctly processed by the TemplatePro API. You'll need to include your{" "}
            <strong>Client-ID</strong>, <strong>API-Token</strong>, and <strong>Secret-Key</strong> in the headers.
          </p>
          <p className="text-xl text-gray-300 mb-4">Below is an example of how to define the headers in JavaScript.</p>

          <div className="bg-gray-700 p-4 rounded-lg shadow-md overflow-auto mb-6 relative">
            <pre className="text-lg text-gray-100 whitespace-pre-wrap">{headersCode}</pre>
            <CopyToClipboard text={headersCode} onCopy={() => setIsCopied("headersCode")}>
              <button className="absolute right-0 top-0 flex items-center p-2 bg-slate-600 rounded-md text-gray-300 hover:bg-slate-500 px-5">
                {isCopied === "headersCode" ? (
                  <>
                    <FaCheck className="mr-2 text-green-400" />
                    <span className="text-lg text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <FaClipboard className="mr-2" />
                    <span className="text-lg">Copy</span>
                  </>
                )}
              </button>
            </CopyToClipboard>
          </div>

          <h3 className="text-2xl font-semibold text-indigo-200 mt-8 mb-4">Step 3: Send the Request</h3>
          <p className="text-xl text-gray-300 mb-4">
            After setting up the headers, you need to set up the request body (payload). In this step, you will send the
            payload to the TemplatePro API, which will send a single email to the recipient. The payload includes the
            email recipient, the template ID, and any placeholders to inject dynamic data into the email template.
          </p>
          <p className="text-xl text-gray-300 mb-4">
            Below is an example of how to set up the request body and make the POST request to the API using{" "}
            <strong>axios</strong>.
          </p>

          <div className="bg-gray-700 p-4 rounded-lg shadow-md overflow-auto mb-6 relative">
            <pre className="text-lg text-gray-100 whitespace-pre-wrap">{requestCode}</pre>
            <CopyToClipboard text={requestCode} onCopy={() => setIsCopied("requestCode")}>
              <button className="absolute right-0 top-0 flex items-center p-2 bg-slate-600 rounded-md text-gray-300 hover:bg-slate-500 px-5">
                {isCopied === "requestCode" ? (
                  <>
                    <FaCheck className="mr-2 text-green-400" />
                    <span className="text-lg text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <FaClipboard className="mr-2" />
                    <span className="text-lg">Copy</span>
                  </>
                )}
              </button>
            </CopyToClipboard>
          </div>

          <h3 className="text-2xl font-semibold text-indigo-200 mt-8 mb-4">Full Example Code</h3>
          <p className="text-xl text-gray-300 mb-4">
            Here's an example that combines the API URL, headers, and payload to send a single email. Copy the full code
            below to integrate into your app.
          </p>

          <div className="bg-gray-700 p-4 rounded-lg shadow-md overflow-auto mb-6 relative">
            <pre className="text-lg text-gray-100 whitespace-pre-wrap">{fullExampleCode}</pre>
            <CopyToClipboard text={fullExampleCode} onCopy={() => setIsCopied("fullExampleCode")}>
              <button className="absolute right-0 top-0 flex items-center p-2 bg-slate-600 rounded-md text-gray-300 hover:bg-slate-500 px-5">
                {isCopied === "fullExampleCode" ? (
                  <>
                    <FaCheck className="mr-2 text-green-400" />
                    <span className="text-lg text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <FaClipboard className="mr-2" />
                    <span className="text-lg">Copy Full Code</span>
                  </>
                )}
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleMail
