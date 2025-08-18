"use client"

import type React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPrevPage: () => void
  onNextPage: () => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
  return (
    <div className="flex items-center justify-center gap-10 py-4 px-6 bg-gray-50 rounded-lg shadow-md mt-5">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-all"
      >
        Prev
      </button>

      <span className="text-sm text-gray-700 font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-all"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
