"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const [_scrolling, setScrolling] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolling(window.scrollY > 10)
    }

    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div className="bg-gradient-to-t from-gray-950 via-gray-900 to-gray-800 text-white w-[83vw] overflow-  font-sans">
      {/* Template Store Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-700 text-white relative">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-5xl font-extrabold mb-6 drop-shadow-md">
            Discover Our Free Template Store
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Explore a curated library of professionally crafted email templates.
            Clone, customize, and launch captivating campaigns effortlessly.
          </p>
          <Link
            to="/general-templates"
            className="bg-white text-indigo-700 text-lg font-semibold py-4 px-10 rounded-full shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            🚀 Explore Templates
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-12">What Our Users Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                text: `"This platform completely changed our approach to email marketing. Stunning templates + effortless automation!"`,
                author: "Sarah J., Marketing Director",
              },
              {
                text: `"The analytics dashboard is a powerhouse. Real-time insights that keep us ahead every campaign."`,
                author: "John D., Senior Developer",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                <p className="text-lg mb-4 italic opacity-90">{t.text}</p>
                <p className="font-semibold text-emerald-400">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 text-white text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-6">
          Ready to Create Stunning Email Templates?
        </h3>
        <p className="text-lg mb-8 opacity-90">
          Sign up today and take your email marketing to the next level 🚀
        </p>
        <Link
          to="/sign-up"
          className="bg-white text-indigo-700 font-bold py-4 px-10 rounded-full shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300"
        >
          Get Started Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="text-center text-gray-400">
          <p className="mb-3">&copy; 2024 EmailTemplatePro. All rights reserved.</p>
          <nav className="space-x-6">
            <Link
              to="/terms"
              className="hover:text-white transition duration-300"
            >
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

export default Home
