export const MIN_TURN = 1
export const MAX_TURN = 7

interface Requirement {
  card: string
  byTurn: number
}

export interface RequirementStr {
  card: string
  byTurn: string
}

export const calculate = (requirements: Requirement[], cards: Set<string>): number => {
  return 100.0
}

export const requirementsFromStrs = (strs: RequirementStr[]): Requirement[] => {
  return strs
    .filter((r) => r.card.length !== 0)
    .filter((r) => r.byTurn.length !== 0)
    .filter((r) => !Number.isNaN(parseInt(r.byTurn)))
    .map((r) => ({card: r.card, byTurn: parseInt(r.byTurn)}))
}
