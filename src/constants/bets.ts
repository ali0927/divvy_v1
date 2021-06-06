export enum BetType {
    Pending = "PENDING",
    Current = "CURRENT"
}
export interface Team {
    name: string,
    logo: string,
    id: string,
    favorite: boolean
}
export interface Odds {
    moneyline: number,
    spread: number,
    total: number,
}
export enum OddsType {
    moneyline = "Money Line",
    spread = "Points Spread",
    total = "Total Score",
}
export interface Game {
    teamA: Team,
    teamB: Team,
    draw: boolean,
    teamAodds: Odds,
    teamBodds: Odds,
    drawodds: Odds,
    spread: number,
    total: number
}
export interface BetSlip {
    publicAddress: string,
    gameId: string,
    hash: string,
    teams: Game,
    selectionTeam: Team,
    otherTeam: Team,
    odds: number,
    oddsType: OddsType
    type: BetType,
    betAmount: number,
    id: string,
    spread: number,
    total: number
}