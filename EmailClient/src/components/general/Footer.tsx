// src/components/Footer.tsx
import type React from "react"
import { Link } from "react-router-dom"

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-800 text-gray-400 py-8 z-50">
      <div className="text-center">
        <p>&copy; 2024 TemplatePro. All Rights Reserved.</p>
        <nav className="space-x-6 mt-4">
          <Link to="/terms" className="hover:text-white transition duration-300">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-white transition duration-300">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
