const HeaderAutomate = () => {
  return (
    <header className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-8 overflow-hidden">
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{ backgroundImage: "url(/header-pattern.svg)" }}
      ></div>
      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold leading-tight">Automate Your Emails Effortlessly</h1>
        <p className="mt-4 text-lg">
          Leverage the power of scheduling your email campaigns effortlessly. Stay on top of your email automation with
          easy management.
        </p>
        {/* <button
            className="mt-6 inline-flex items-center px-5 py-3 bg-white text-indigo-600 font-medium rounded-lg shadow hover:bg-indigo-50"
        >
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            Add New Template
        </button> */}
      </div>
    </header>
  )
}

export default HeaderAutomate
