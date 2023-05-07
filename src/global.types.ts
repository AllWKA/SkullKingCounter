export interface Player {
  name: string,
  skin: string
  bet: number,
  roundsWon: number,
  extraPoints: number,
  totalScore: number,
  scoreRound: Map<number, RoundPlay>
}

export interface RoundPlay {
  bet: number,
  won: number,
  extra: number,
  roundPoints: number
}
