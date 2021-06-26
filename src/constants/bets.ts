import { PublicKey } from "@solana/web3.js";

export enum BetType {
    Pending = "PENDING",
    Current = "CURRENT"
}
export interface Team {
    name: string,
    logo: string,
    homeTeam: boolean
}
export interface Odds {
    moneyline: number,
    spread: number,
    spreadPoints: number,
    total: number,
    totalPoints: number,
    sol: {
        moneylineFeedPubkey: PublicKey,
        spreadPointsFeedPubkey: PublicKey,
        spreadFeedPubkey: PublicKey
        totalFeedPubkey: PublicKey,
        totalPointsFeedPubkey: PublicKey,
    }
}
export enum OddsType {
    moneyline = "Money Line",
    spread = "Points Spread",
    total = "Total Score",
}
export enum MarketSide {
    teamA = "Team A",
    teamB = "Team B",
    draw = "Draw"
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export namespace MarketSide {
    export function toIndex(marketSide: MarketSide): number {
        return marketSide === MarketSide.teamA ? 0 :
            marketSide === MarketSide.teamB ? 1 :
                marketSide === MarketSide.draw ? 2 :
                    -1;
        ;
    }
    export function fromIndex(index: number): MarketSide {
        return index === 0 ? MarketSide.teamA :
            index === 1 ? MarketSide.teamB :
                index === 2 ? MarketSide.draw :
                    MarketSide.teamA;
    }
}
export interface Seasons {

}
export interface Season {
    season: {
        seasonId: number,
        sportId: number,
        seasonName: string,
        seasonActive: number
    },
    games: Game[],
}
export interface Game {
    teamA: Team,
    teamB: Team,
    teamAodds: Odds,
    teamBodds: Odds,
    drawOddsMoneyLine: number,
    marketId: string,
    commenceTimestamp: number,
    commenceDate: string,
    commenceTime: string,
    sol: {
        drawOddsMoneylineFeedPubkey: PublicKey,
        winnerFeedPubkey: PublicKey,
        teamAScoreFeedPubkey: PublicKey,
        teamBScoreFeedPubkey: PublicKey,
    }
}
export interface Bet {
    publicAddress: string,
    gameId: string,
    hash: string,
    game: Game,
    selectionTeam: Team,
    otherTeam: Team,
    odds: number,
    oddsType: OddsType,
    marketSide: MarketSide,
    type: BetType,
    risk: number,
    id: string,
    spreadPoints: number,
    totalPoints: number,
    betTokenAccount?: PublicKey
    sol: {
        oddsFeed: PublicKey
    }
}
