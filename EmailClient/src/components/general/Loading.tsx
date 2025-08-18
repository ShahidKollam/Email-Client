const Loading = () => {
  return (
    <div className="flex items-center justify-center text-black">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-900 border-dashed rounded-full animate-spin"></div>
        <p className="text-4xl font-bold">Loading ...</p>
      </div>
    </div>
  )
}

export default Loading
