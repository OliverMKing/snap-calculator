import React, {useState} from 'react'
import {codeToCards, removeCodeComments} from '../../api/deck_code'
import selectDeckImg from './select_deck.png'

const DeckCodeComponent: React.FC<{
  setUrlState: (
    s: React.SetStateAction<
      Partial<{
        code: string | undefined
      }>
    >
  ) => void
}> = ({setUrlState}) => {
  const [code, setCode] = useState('')
  const [codeErr, setCodeErr] = useState(false)

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const code = e.target.value
      setCode(code)
      const cards = codeToCards(e.target.value)
      setUrlState({code: removeCodeComments(code)})
      setCodeErr(false)
    } catch (err) {
      setCodeErr(true)
      console.error('Error parsing deck code: ', err)
    }
  }

  return (
    <div>
      <h2 className="text-2xl py-4 pl-2 md:text-4xl">Tell us your deck</h2>
      <div className="container bg-purple-500 sm:rounded-md py-8 sm:mb-8 text-center text-white">
        <h3 className="break-normal font-normal text-2xl">
          Enter your deck code
        </h3>
        <div className="mx-3 py-4">
          <div className="max-w-sm mx-auto p-1 bg-white rounded shadow flex items-center">
            <input
              type="text"
              className="flex-auto appearance-none p-3 text-gray-800"
              value={code}
              onChange={handleCodeChange}
            />
          </div>
        </div>
        <p
          className={`font-normal text-yellow-400 text-3xl ${
            !codeErr && 'invisible'
          }`}
        >
          Invalid deck code
        </p>
      </div>
      <h3 className="text-xl py-2 pl-2 md:text-2xl">Need Help?</h3>
      <p className="pl-2">To retrieve your deck code, follow these steps.</p>
      <img className="object-scale-down w-96" src={selectDeckImg} />
    </div>
  )
}

export default DeckCodeComponent
