import React, {useState} from 'react'
import {
  calculate,
  MAX_TURN,
  MIN_TURN,
  requirementsFromStrs,
  RequirementStr
} from '../../api/calculate'
import {range} from '../../api/utils'

const blank = ''

const CalculateComponent: React.FC<{cards: Set<string>}> = ({cards}) => {
  const [requirements, setRequirements] = useState<RequirementStr[]>([
    {card: blank, byTurn: blank}
  ])

  const reqs = requirementsFromStrs(requirements)
  const canCalculate = reqs.length !== 0
  let percentage: number | undefined = undefined
  try {
    if (canCalculate) {
      percentage = calculate(reqs, cards)
    }
  } catch (err) {
    console.error('Error calculating: ', err)
  }

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
      <h2 className="text-2xl py-4 pb-8 px-2 md:text-4xl">
        Tell us what you want to calculate
      </h2>

      <div className="flex flex-col">
        {requirements.map((requirement, index) => {
          return (
            <React.Fragment key={'requirement' + index}>
              <div className="pt-1 px-2 flex flex-row gap-2 items-center">
                <span className="text-xl">Draw</span>
                <select
                  value={requirement.card}
                  onChange={(e) => handleRequirementsCardChange(e, index)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-purple-700 focus:border-purple-700 block p-2.5"
                >
                  <option value={blank} disabled />
                  {Array.from(cards.keys())
                    .sort()
                    .map((card) => (
                      <option key={'card' + card} value={card}>
                        {card}
                      </option>
                    ))}
                </select>
                <span className="text-xl">by turn</span>
                <select
                  value={requirement.byTurn}
                  onChange={(e) => handleRequirementsTurnChange(e, index)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-purple-700 focus:border-purple-700 block p-2.5"
                >
                  <option value={blank} disabled />
                  {range(MIN_TURN, MAX_TURN)
                    .map(String)
                    .map((turn) => (
                      <option key={'turn' + turn} value={turn}>
                        {turn}
                      </option>
                    ))}
                </select>
              </div>

              {requirements.length !== index + 1 && (
                <div className="px-2 inline-flex flex-row items-center">
                  <hr className="w-32 h-px my-8 bg-gray-200 border-0" />
                  <span className="px-4">and</span>
                  <hr className="w-32 h-px my-8 bg-gray-200 border-0" />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>

      <button
        onClick={handleAddCondition}
        className="my-8 mx-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Add condition
      </button>

      {canCalculate && percentage && (
        <React.Fragment>
          <h2 className="text-2xl px-2 md:text-4xl">Your chances are</h2>
          <div className="px-2 text-purple-500 pt-2 md:pt-4 text-xl md:text-2xl">
            {percentage}%
          </div>
          <div className="w-72 h-4 mx-2 bg-gray-200 rounded-full mb-8">
            <div
              className="h-4 bg-purple-500 rounded-full shimmer-purple"
              style={{
                width: `${percentage}}%`,
              }}
            ></div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default CalculateComponent
