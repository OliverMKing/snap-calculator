import {Buffer} from 'buffer'

const commentCharacter = '#'

interface Deck {
  Cards: [{CardDefId: string}]
}


export const codeToCards = (code: string): Set<string> => {
  const cleaned = removeCodeComments(code)
  const decoded = Buffer.from(cleaned, 'base64').toString()
  const deck: Deck = parseDeckJson(decoded)
  return deckToCards(deck)
}

export const removeCodeComments = (code: string): string => {
  if (code.length === 0) {
    throw new Error('Code is empty')
  }

  const guess = code
    .split(commentCharacter) // split by each line
    .map((x) => x.trim()) // remove extra whitespace
    .filter((x) => x.length !== 0) // remove blanks
    .filter((x) => !x.includes(' ')) // remove everything other than the code

  if (guess.length !== 1) {
    throw new Error('Parsed code guess must be length 1')
  }

  return guess[0]
}

const parseDeckJson = (str: string): Deck => {
    return JSON.parse(str) as Deck
}

const deckToCards = (deck: Deck): Set<string> => {
    return new Set(deck.Cards.map(card => card.CardDefId))
}

export const urlEncodeCode = (code: string): string => {
  return encodeURIComponent(code)
}

export const urlDecodeCode = (encoded: string): string => {
  return decodeURIComponent(encoded)
}