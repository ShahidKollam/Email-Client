const TemplateCategoryDoc = () => {
  return (
    <div className="bg-zinc-900 text-white text-xl font-sans max-w-[90vw] overflow-y-auto">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-center text-indigo-400 mb-8">Template Categories Documentation</h1>

        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl mb-12">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">Overview</h2>
          <p className="text-lg text-gray-300 mb-6">
            Our email template system offers four main categories to structure your templates, each designed for
            specific use cases. Below is a detailed explanation of each category's intended usage, and how to customize
            them.
          </p>
        </div>

        {/* Section: Dynamic Content */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl mb-12">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">1. Dynamic Content</h2>
          <p className="text-lg text-gray-300 mb-6">
            The 'Dynamic Content' category is perfect for sending single, individualized emails. With this category, you
            can inject an unlimited amount of dynamic data into the email template using placeholders that are declared
            by the client beforehand. This makes it ideal for personalized emails.
          </p>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Features</h3>
            <ul className="list-disc pl-6 text-gray-400">
              <li>
                Inject unlimited dynamic data via placeholders (e.g., {`{{clientName}}`}, {`{{clientAddress}}`}).
              </li>
              <li>Custom placeholders can be declared by the client before email sending.</li>
              <li>Best suited for one-to-one communication or highly personalized email messages.</li>
            </ul>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">How to Use</h3>
            <p className="text-gray-400 mb-4">
              To use this category, simply select 'Dynamic Content' from the templates menu and start inserting
              placeholders into your email content. The system will replace these placeholders with the corresponding
              data when the email is sent.
            </p>
          </div>
        </div>

        {/* Section: Marketing Campaign */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl mb-12">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">2. Marketing Campaign</h2>
          <p className="text-lg text-gray-300 mb-6">
            The 'Marketing Campaign' category is tailored for sending bulk emails. Unlike dynamic content, you can
            inject only a limited set of data—specifically the client's name using the placeholder {`{{clientName}}`}.
            This is great for mass marketing campaigns with personalized greetings.
          </p>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Features</h3>
            <ul className="list-disc pl-6 text-gray-400">
              <li>Inject limited dynamic data (only {`{{clientName}}`} placeholder).</li>
              <li>Ideal for bulk email campaigns where personalization is focused on the recipient's name.</li>
              <li>Simple and effective for marketing purposes, delivering personalized yet scalable messages.</li>
            </ul>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">How to Use</h3>
            <p className="text-gray-400 mb-4">
              To use this category, choose 'Marketing Campaign' from the templates menu. Then, insert the{" "}
              {`{{clientName}}`} placeholder in your email where you want the recipient’s name to appear.
            </p>
          </div>
        </div>

        {/* Section: Static Content */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl mb-12">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">3. Static Content</h2>
          <p className="text-lg text-gray-300 mb-6">
            The 'Static Content' category is designed for fixed, non-personalized emails. It’s ideal when you need to
            send the same email to multiple recipients without any need for data insertion. All content remains the same
            for every recipient.
          </p>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Features</h3>
            <ul className="list-disc pl-6 text-gray-400">
              <li>No dynamic placeholders, content remains identical for all recipients.</li>
              <li>Perfect for notifications, newsletters, or emails with generic content.</li>
              <li>Simple, straightforward templates without any customization or dynamic data.</li>
            </ul>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">How to Use</h3>
            <p className="text-gray-400 mb-4">
              Select 'Static Content' from the templates menu. There are no placeholders to insert, and the content will
              be sent as-is to all recipients.
            </p>
          </div>
        </div>

        {/* Section: General */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl mb-12">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">4. General</h2>
          <p className="text-lg text-gray-300 mb-6">
            The 'General' category is a flexible option that allows for a combination of static content and limited
            dynamic data. This can be useful for sending emails that don’t fit strictly into the other categories but
            may include some personalization or dynamic content.
          </p>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Features</h3>
            <ul className="list-disc pl-6 text-gray-400">
              <li>Combination of static and limited dynamic content (e.g., {`{{clientName}}`}).</li>
              <li>Flexibility to include placeholders in specific sections of your email.</li>
              <li>Best for sending moderately personalized content without heavy customization.</li>
            </ul>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">How to Use</h3>
            <p className="text-gray-400 mb-4">
              Choose 'General' from the templates menu. You can add a mix of static and dynamic content, like{" "}
              {`{{clientName}}`}, in the appropriate sections of your template.
            </p>
          </div>
        </div>

        {/* Final Notes */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">Changing Categories</h2>
          <p className="text-lg text-gray-300 mb-4">
            You can easily change the category of your template from the templates menu. Simply select the desired
            category (e.g., Dynamic Content, Marketing Campaign, Static Content, or General) from the dropdown, and the
            appropriate template settings will be applied.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TemplateCategoryDoc
