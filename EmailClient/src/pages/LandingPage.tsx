import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { RootState } from "../redux/store"

const LandingPage = () => {
  const user = useSelector((state: RootState) => state.user.name)

  return (
    <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen font-sans">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/80 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-600 tracking-wide hover:text-emerald-700 transition-all duration-300">
            Email Template Pro
          </h1>
          <nav className="space-x-6 text-lg font-medium">
            {!user ? (
              <>
                <Link
                  to="/sign-up"
                  className="text-emerald-600 hover:text-emerald-800 transition duration-200"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 transition duration-200"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-800 font-semibold mx-3">
                  Welcome, {user}!
                </span>
                <Link
                  to="/dashboard"
                  className="text-indigo-700 hover:text-indigo-900 transition duration-200"
                >
                  Home
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white py-32 md:py-40">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Design Stunning Email Templates Effortlessly
          </h2>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            Empower your campaigns with our drag-and-drop builder, bulk mailing,
            and integrated code editor.
          </p>
          <Link
            to="/dashboard"
            className="bg-white text-emerald-600 font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-gray-100 transition-all duration-300"
          >
            🚀 Get Started for Free
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-14">
          Why Choose TemplatePro?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: "fas fa-paint-brush",
              title: "Easy to Use",
              desc: "Intuitive drag-and-drop interface to design email templates instantly.",
              color: "emerald",
            },
            {
              icon: "fas fa-envelope",
              title: "Bulk Mailing",
              desc: "Reach thousands with a single click. Simplify your campaigns.",
              color: "indigo",
            },
            {
              icon: "fas fa-code",
              title: "Code Editor",
              desc: "Seamlessly paste, edit, and preview HTML email templates.",
              color: "teal",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-100 hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-20 h-20 mb-5 flex items-center justify-center bg-${f.color}-100 text-${f.color}-600 rounded-full shadow-md`}
              >
                <i className={`${f.icon} text-3xl`}></i>
              </div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-3">
                {f.title}
              </h4>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-700 via-emerald-600 to-teal-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">
            Supercharge Your Email Marketing
          </h3>
          <p className="text-lg mb-8 opacity-90">
            Start building beautiful, responsive email templates today.
          </p>
          <Link
            to="/dashboard"
            className="bg-white text-indigo-700 font-bold py-4 px-12 rounded-full shadow-2xl hover:bg-gray-100 transition-all duration-300"
          >
            Start Free Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">&copy; 2024 TemplatePro. All Rights Reserved.</p>
          <nav className="space-x-6">
            <Link to="/terms" className="hover:text-white transition duration-300">
              Terms
            </Link>
            <Link
              to="/privacy"
              className="hover:text-white transition duration-300"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
