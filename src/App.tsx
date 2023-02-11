import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import './App.css'
import DeckCodeComponent from './components/deck_code/deck_code'
import useUrlState from '@ahooksjs/use-url-state'
import {Routes, Route} from 'react-router'
import {codeToCards} from './api/deck_code'
import CalculateComponent from './components/calculate/calculate'

function App() {
  const [urlState, setUrlState] = useUrlState({code: ''})

  const resetCode = () => {
    setUrlState({code: undefined})
  }

  let cards: Set<String> | undefined = undefined
  const deckCodeInvalid = (): boolean => {
    const {code} = urlState
    try {
      cards = codeToCards(code)
      return false
    } catch {
      return true
    }
  }

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
        </div>
      </div>

      {deckCodeInvalid() || typeof cards === 'undefined' ? (
        <DeckCodeComponent setUrlState={(s) => setUrlState(s)} />
      ) : (
        <CalculateComponent cards={cards as unknown as Set<string>} /> // this is guaranteed because we check for undefined
      )}
    </div>
  )
}

const RoutedApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutedApp
