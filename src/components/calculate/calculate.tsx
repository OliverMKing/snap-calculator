import React, {useState} from 'react'
import {MAX_TURN, MIN_TURN, RequirementStrs} from '../../api/calculate'
import {range} from '../../api/utils'

const blank = ''

const CalculateComponent: React.FC<{cards: Set<string>}> = ({cards}) => {
  const [requirements, setRequirements] = useState<RequirementStrs[]>([
    {card: blank, byTurn: blank}
  ])

  console.log(requirements)

  const handleRequirementsCardChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const copy = [...requirements]
    copy[index].card = e.target.value
    setRequirements(copy)
  }

  const handleRequirementsTurnChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const copy = [...requirements]
    copy[index].byTurn = e.target.value
    setRequirements(copy)
  }

  const handleAddCondition = () => {
    setRequirements([...requirements, {card: '', byTurn: ''}])
  }

  return (
    <div>
      <h2 className="text-2xl py-4 pl-2 md:text-4xl">
        Tell us what you want to calculate
      </h2>

      <div className="flex flex-col">
        {requirements.map((requirement, index) => {
          return (
            <div
              key={index}
              className="pt-4 pl-2 flex flex-row gap-2 items-center"
            >
              <span className="text-xl">Draw</span>
              <select
                value={requirement.card}
                onChange={(e) => handleRequirementsCardChange(e, index)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={blank} disabled />
                {Array.from(cards.keys())
                  .sort()
                  .map((card) => (
                    <option key={card} value={card}>
                      {card}
                    </option>
                  ))}
              </select>
              <span className="text-xl">by turn</span>
              <select
                value={requirement.byTurn}
                onChange={(e) => handleRequirementsTurnChange(e, index)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={blank} disabled />
                {range(MIN_TURN, MAX_TURN)
                  .map(String)
                  .map((turn) => (
                    <option key={turn} value={turn}>
                      {turn}
                    </option>
                  ))}
              </select>
            </div>
          )
        })}
      </div>

      <button
        onClick={handleAddCondition}
        className="mt-8 ml-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Add condition
      </button>
    </div>
  )
}

export default CalculateComponent
