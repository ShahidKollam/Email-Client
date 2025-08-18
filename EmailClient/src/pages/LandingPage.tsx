import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { RootState } from "../redux/store"

const LandingPage = () => {
  const user = useSelector((state: RootState) => state.user.name)

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-200 min-h-screen ">
      {/* Header */}
      <header className="bg-white shadow-lg py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-blue-600 transition-all duration-300 hover:text-blue-800">
            Email Template Pro
          </h1>
          <nav className="space-x-6 text-lg">
            {!user ? (
              <>
                <Link to="/sign-up" className="text-blue-600 hover:text-blue-800 transition duration-200">
                  Sign Up
                </Link>
                <Link to="/login" className="text-gray-600 hover:text-gray-800 transition duration-200">
                  Login
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-800 font-semibold mx-3">Welcome, {user}!</span>
                <Link to="/dashboard" className="text-blue-900 hover:text-blue-800 transition duration-200">
                  Home
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-40">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl font-extrabold leading-tight mb-6">
            Create Stunning Email Templates & Reach Your Audience
          </h2>
          <p className="text-xl mb-8">
            Effortlessly design, edit, and send bulk emails with ease. Empower your campaigns with our advanced tools.
          </p>
          <Link
            to="/dashboard"
            className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full shadow-xl hover:bg-blue-100 transition duration-300"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-10">Why Choose TemplatePro?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-20 h-20 mb-4 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow-lg">
              <i className="fas fa-paint-brush text-3xl"></i>
            </div>
            <h4 className="text-2xl font-semibold text-gray-800 mb-2">Easy to Use</h4>
            <p className="text-gray-600">Intuitive drag-and-drop interface to design email templates in no time.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-20 h-20 mb-4 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full shadow-lg">
              <i className="fas fa-envelope text-3xl"></i>
            </div>
            <h4 className="text-2xl font-semibold text-gray-800 mb-2">Bulk Mailing</h4>
            <p className="text-gray-600">
              Reach thousands of users with a single click. Simplify your email campaigns.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-20 h-20 mb-4 flex items-center justify-center bg-green-100 text-green-600 rounded-full shadow-lg">
              <i className="fas fa-code text-3xl"></i>
            </div>
            <h4 className="text-2xl font-semibold text-gray-800 mb-2">Code Editor</h4>
            <p className="text-gray-600">
              Paste, edit, and customize your HTML templates seamlessly with our integrated editor.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-10">Transform Your Email Campaigns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-start text-left bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-2xl font-semibold text-blue-600 mb-4">Bulk Emailing Made Easy</h4>
              <p className="text-gray-600 mb-6">
                Our bulk email feature lets you reach your audience in one go. Customize your recipient list, track
                performance, and deliver personalized messages with just a few clicks.
              </p>
              <Link to="/bulk-email" className="text-blue-600 font-bold hover:underline transition duration-300">
                Learn More &rarr;
              </Link>
            </div>
            <div className="flex flex-col items-start text-left bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-2xl font-semibold text-purple-600 mb-4">Integrated Code Editor</h4>
              <p className="text-gray-600 mb-6">
                Use our in-app code editor to paste, tweak, and preview your HTML templates. Perfect for developers and
                marketers who demand full control.
              </p>
              <Link to="/editor" className="text-purple-600 font-bold hover:underline transition duration-300">
                Explore the Editor &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-4">Join TemplatePro Today</h3>
          <p className="text-lg mb-6">Start creating professional email templates and sending bulk emails now!</p>
          <Link
            to="/dashboard"
            className="bg-white text-blue-600 font-bold py-4 px-12 rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">&copy; 2024 TemplatePro. All Rights Reserved.</p>
          <nav className="space-x-6">
            <Link to="/terms" className="hover:text-white transition duration-300">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-white transition duration-300">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
