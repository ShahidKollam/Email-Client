const EditorDoc = () => {
  return (
    <div className="bg-zinc-900 text-white text-xl font-sans max-w-[90vw] overflow-y-auto">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-center text-indigo-400 mb-8">
          Email Template Editor Documentation
        </h1>

        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl mb-12">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">Overview</h2>
          <p className="text-lg text-gray-300 mb-4">
            Our Email Template Editor allows you to create professional and fully-customizable email templates in two
            simple ways:
          </p>
          <ol className="list-decimal pl-6 text-gray-400">
            <li className="mb-3">Drag and Drop prebuilt blocks to design your email template.</li>
            <li>Paste your custom HTML code into the built-in code editor for advanced customization.</li>
          </ol>
        </div>

        {/* Section: Drag and Drop Blocks */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl mb-12">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">1. Drag and Drop Prebuilt Blocks</h2>
          <p className="text-lg text-gray-300 mb-6">
            With the drag-and-drop functionality, you can create stunning email templates effortlessly. Simply drag the
            prebuilt blocks from the sidebar onto the canvas and customize them according to your needs.
          </p>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Features</h3>
            <ul className="list-disc pl-6 text-gray-400">
              <li>Prebuilt blocks for headers, footers, text, images, and buttons.</li>
              <li>Customizable block settings to adjust padding, fonts, colors, and more.</li>
              <li>Responsive templates that adjust to both mobile and desktop views.</li>
              <li>Preview mode to see changes live as you design.</li>
            </ul>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Getting Started</h3>
            <ol className="list-decimal pl-6 text-gray-400">
              <li>Start by selecting a block from the sidebar (e.g., "Header").</li>
              <li>Drag the block onto the canvas.</li>
              <li>Click on the block to customize its properties (text, background color, padding, etc.).</li>
              <li>Repeat the process to build your template using various blocks (e.g., Text, Button, Footer).</li>
            </ol>
          </div>
        </div>

        {/* Section: Code Editor */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl mb-12">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">2. Custom HTML Code Editor</h2>
          <p className="text-lg text-gray-300 mb-6">
            If you prefer to write your own code or make advanced customizations, use our built-in code editor. It
            allows you to directly edit the HTML of your email template.
          </p>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Features</h3>
            <ul className="list-disc pl-6 text-gray-400">
              <li>Code highlighting for better readability and easier editing.</li>
              <li>Live preview to see how your code renders in real-time.</li>
              <li>Option to paste and edit your custom HTML code.</li>
              <li>Advanced functionality for developers, including custom classes, IDs, and inline styles.</li>
            </ul>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">Getting Started</h3>
            <ol className="list-decimal pl-6 text-gray-400">
              <li>Click on the "Code Editor" tab to switch to the HTML editor view.</li>
              <li>Paste your custom HTML code into the editor or modify the existing template.</li>
              <li>Preview the template on the right side to check the output of your HTML code.</li>
              <li>Save your changes when you're satisfied with the design.</li>
            </ol>
          </div>
        </div>

        {/* Final Notes */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-semibold text-indigo-200 mb-6">Final Notes</h2>
          <p className="text-lg text-gray-300 mb-4">
            Whether you prefer to use prebuilt blocks or write custom code, our email template editor is designed to
            offer maximum flexibility. It's user-friendly for beginners while providing advanced features for
            experienced developers.
          </p>
          <p className="text-lg text-gray-300">
            Start creating your email templates today, and enjoy a seamless design experience!
          </p>
        </div>
      </div>
    </div>
  )
}

export default EditorDoc
