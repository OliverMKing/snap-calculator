import React, {useState} from 'react'
import {codeToCards, removeCodeComments} from '../../api/deck_code'
import Video from "./tutorial.mp4"

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
      codeToCards(e.target.value) // just guaranteeing that this fn doesn't throw
      setUrlState({code: removeCodeComments(code)})
      setCodeErr(false)
    } catch (err) {
      setCodeErr(true)
      console.error('Error parsing deck code: ', err)
    }
  }

  return (
    <div>
      <h2 className="text-2xl py-2 md:py-4 px-2 md:text-4xl">Tell us your deck</h2>
      <div className="container bg-purple-500 sm:rounded-md py-8 sm:mb-8 text-center text-white">
        <h3 className="break-normal font-normal text-2xl">
          Enter your deck code
        </h3>
        <div className="mx-3 py-4">
          <div className="max-w-sm mx-auto p-1 bg-white rounded shadow flex items-center">
            <input
              type="text"
              className="flex-auto appearance-none p-3 text-gray-800 focus:ring-purple-500 focus:border-purple-500"
              value={code}
              onChange={handleCodeChange}
            />
          </div>
        </div>
        <p
          className={`font-normal text-yellow-400 text-xl md:text-2xl ${
            !codeErr && 'invisible'
          }`}
        >
          Invalid deck code
        </p>
      </div>
      <h3 className="text-xl py-2 px-2 md:text-2xl">Need Help?</h3>
      <p className="px-2 pb-2 text">
        You can make a deck code online using a builder like{' '}
        <a
          className="text-purple-600 hover:underline"
          href="https://marvelsnapzone.com/deck-builder/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Snap Zone's
        </a>
        .
      </p>
      <p className="px-2 pb-2 text">
        To retrieve your deck code from the game, follow the video below.
      </p>
      <video controls className='md:px-2 w-full mb-4 md:w-80'>
        <source src={Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default DeckCodeComponent
