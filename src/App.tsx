import React from 'react'
import './App.css'

function App() {
  return (
    <div className="w-full container mx-auto">
      <div className="container pt-6 xl:pt-8 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full lg:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-4xl md:text-6xl font-bold leading-tight text-gray-800 leading-tight text-center lg:text-left">
            Marvel Snap Calculator
          </h1>
          <p className="leading-normal text-gray-800 md:text-4xl text-2xl mb-8 text-center lg:text-left">
            Make every card count for more
          </p>
        </div>
      </div>

      <div className="container bg-purple-600 sm:rounded-md py-8 sm:mb-8 text-center">
        <h2 className="break-normal font-normal text-white text-4xl">
          Enter your deck code
        </h2>
        <div className="mx-3 text-center pt-4">
          <div className="max-w-sm mx-auto p-1 bg-white rounded shadow flex items-center">
            <input
              type="text"
              className="flex-auto appearance-none p-3 text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
