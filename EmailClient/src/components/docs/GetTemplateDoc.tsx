"use client"

import { useState } from "react"
import { FaClipboard, FaCheck } from "react-icons/fa"
import { CopyToClipboard } from "react-copy-to-clipboard"

const GetTemplateDoc = () => {
  const [isCopied, setIsCopied] = useState<string | null>(null)

  // Define your actual placeholder values

  const apiUrl = "http://localhost:3001/api/template/get-templates"

  // Response Example for templates
  const templatesResponse = `{
    "templates": [
      {
        "id": 45,
        "template_name": "Welcome Template",
        "category": "marketing_campaign",
        "placeholders": ["{{clientName}}", "{{User Name}}"]
      },
      {
        "id": 33,
        "template_name": "Appointment Cancellation Notice",
        "category": "dynamic_content",
        "placeholders": []
      },
      // ... other templates
    ]
  }`

  return (
    <div className="bg-gray-900 text-white font-sans max-w-[90vw] overflow-y-auto">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-extrabold text-indigo-400 text-center mb-8">
          Get Email Templates API Integration Guide
        </h1>

        <p className="text-xl text-gray-300 text-center mb-12">
          Learn how to integrate the <strong>TemplatePro API</strong> to fetch email templates for use in your
          application.
        </p>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl mb-12">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">Step 1: Fetch Available Email Templates</h2>
          <p className="text-xl text-gray-300 mb-4">
            To retrieve available email templates from TemplatePro, make a GET request to the endpoint below. This will
            return a list of templates, including their IDs, names, categories, and placeholders.
          </p>
          <p className="text-xl text-gray-300 mb-4">Here is the endpoint URL for making the GET request:</p>
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

          <h3 className="text-2xl font-semibold text-indigo-200 mt-8 mb-4">Step 2: Handle the Response</h3>
          <p className="text-xl text-gray-300 mb-4">
            Once you make the GET request, you will receive a response that contains a list of templates. Here’s an
            example of the response format:
          </p>

          <div className="bg-gray-700 p-4 rounded-lg shadow-md overflow-auto mb-6 relative">
            <pre className="text-lg text-gray-100 whitespace-pre-wrap">{templatesResponse}</pre>
            <CopyToClipboard text={templatesResponse} onCopy={() => setIsCopied("templatesResponse")}>
              <button className="absolute right-0 top-0 flex items-center p-2 bg-slate-600 rounded-md text-gray-300 hover:bg-slate-500 px-5">
                {isCopied === "templatesResponse" ? (
                  <>
                    <FaCheck className="mr-2 text-green-400" />
                    <span className="text-lg text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <FaClipboard className="mr-2" />
                    <span className="text-lg">Copy Response Example</span>
                  </>
                )}
              </button>
            </CopyToClipboard>
          </div>

          <h3 className="text-2xl font-semibold text-indigo-200 mt-8 mb-4">Step 3: Filter Templates by Category</h3>
          <p className="text-xl text-gray-300 mb-4">
            The response includes templates from various categories like `dynamic_content` and `marketing_campaign`. To
            send bulk emails, you can only use templates from the <strong>marketing_campaign</strong> category. Learn
            more about categories refer Template categories documentation.
          </p>
          <p className="text-xl text-gray-300 mb-4">
            Use the template's ID from the response to reference it in your API call for sending emails. For example,
            the template ID for the "Welcome Template" in the `marketing_campaign` category is 45.
          </p>

          <h3 className="text-2xl font-semibold text-indigo-200 mt-8 mb-4">Step 4: Use Placeholders in Templates</h3>
          <p className="text-xl text-gray-300 mb-4">
            Templates in TemplatePro may include placeholders that are dynamically injected with user data when sending
            an email. The placeholders are denoted by double curly braces, like this: {`{{placeholderName}}`}. These
            placeholders are created by clients when they create or clone a template in TemplatePro.
          </p>
          <p className="text-xl text-gray-300 mb-4">
            For example, the "Welcome Template" has the following placeholders:
            <ul className="list-disc pl-6">
              <li>{`{{clientName}}`}</li> {/* Correctly display the dynamic value */}
              <li>{`{{User Name}}`}</li> {/* Correctly display the dynamic value */}
            </ul>
            You need to replace these placeholders with actual data when sending the email.
          </p>
          <p className="text-xl text-gray-300 mb-4">
            Below is an example of how you can use placeholders when sending an email:
          </p>

          <div className="bg-gray-700 p-4 rounded-lg shadow-md overflow-auto mb-6 relative">
            <pre className="text-lg text-gray-100 whitespace-pre-wrap">{`const payload = {
  recipient: { email: 'recipient@example.com' },
  templateId: 45, // ID of the marketing_campaign template
  placeholders: {
    clientName: 'Acme Corp',
    User Name: 'John Doe'
  }
};`}</pre>
            <CopyToClipboard
              text={`const payload = {
  recipient: { email: 'recipient@example.com' },
  templateId: 45,
  placeholders: {
    clientName: 'Acme Corp',
    User Name: 'John Doe'
  }
};`}
              onCopy={() => setIsCopied("placeholderExample")}
            >
              <button className="absolute right-0 top-0 flex items-center p-2 bg-slate-600 rounded-md text-gray-300 hover:bg-slate-500 px-5">
                {isCopied === "placeholderExample" ? (
                  <>
                    <FaCheck className="mr-2 text-green-400" />
                    <span className="text-lg text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <FaClipboard className="mr-2" />
                    <span className="text-lg">Copy Example Code</span>
                  </>
                )}
              </button>
            </CopyToClipboard>
          </div>

          <h3 className="text-2xl font-semibold text-indigo-200 mt-8 mb-4">Important Notes</h3>
          <ul className="text-xl text-gray-300 mb-4 list-disc pl-6">
            <li>Only templates from the `marketing_campaign` category can be used for bulk email campaigns.</li>
            <li>
              Placeholders in templates are created by clients using double curly braces ({`{{placeholderName}}`}).
            </li>{" "}
            {/* Fixed reference to placeholders */}
            <li>Make sure to replace placeholders with real data in the payload before sending emails.</li>
            <li>Use the template IDs from the GET response in the POST request to send emails.</li>
            <li>Clients can clone existing templates to their folders in TemplatePro for customization.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GetTemplateDoc
