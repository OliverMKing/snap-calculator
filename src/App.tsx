import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import './App.css'
import DeckCodeComponent from './components/deck_code/deck_code'
import useUrlState from '@ahooksjs/use-url-state'
import {Routes, Route} from 'react-router'
import {codeToCards, urlDecodeCode} from './api/deck_code'

function App() {
  const [urlState, setUrlState] = useUrlState({code: ''})

  const resetCode = () => {
    setUrlState({code: undefined})
  }

  if (urlState.code.length !== 0)
    console.log(codeToCards(urlDecodeCode(urlState.code)))

  return (
    <div className="w-full container mx-auto">
      <div className="container pt-6 xl:pt-8 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full lg:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1
            onClick={resetCode}
            className="my-4 text-4xl md:text-6xl font-bold leading-tight text-gray-800 leading-tight text-center lg:text-left hover:cursor-pointer"
          >
            Marvel Snap Calculator
          </h1>
          <p className="leading-normal text-gray-800 md:text-4xl text-2xl mb-8 text-center lg:text-left">
            Make every card count for more
          </p>
        </div>
      </div>

      {urlState.code.length == 0 ? (
        <DeckCodeComponent setUrlState={(s) => setUrlState(s)} />
      ) : (
        <div>hello</div>
      )}
    </div>
  )
}

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  )
}
