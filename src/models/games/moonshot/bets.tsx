import {CommonResponse} from "./common";

export interface Bet {
    bet: number,
    userPubkey: string,
    payout: number,
    status: number,
    placedOn: string
}

export interface PostBetsResponse extends CommonResponse {
    bet: Bet
}

export interface MultiplierGraphModel {
    multiplier: number,
    time: number
}
