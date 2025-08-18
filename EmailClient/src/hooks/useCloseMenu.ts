"use client"

import type React from "react"

import { useEffect } from "react"

function useCloseMenu(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    // The function to handle click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside)

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, callback]) // Only re-run the effect if ref or callback changes
}

export default useCloseMenu
