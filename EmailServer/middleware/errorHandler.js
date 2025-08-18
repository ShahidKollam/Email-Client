// Error handler middleware (unchanged)
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message || "Server Error")
  res.status(err.status || 500).json({ success: false, message: err.message || "Server Error" })
}
