"use client"

import { useState } from "react"

function usePagination<T>(items: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)

  const getCurrentPageItems = (): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }

  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const resetPagination = (): void => {
    setCurrentPage(1)
  }

  return {
    currentPage,
    totalPages,
    getCurrentPageItems,
    handleNextPage,
    handlePrevPage,
    resetPagination,
  }
}

export default usePagination
