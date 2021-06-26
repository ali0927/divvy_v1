import { codes } from "../../constants/processed"
import { getDate, getTime } from "../../utils/date"
import { Game } from "../../constants";
import axios from "axios";

export const countryCodeToFlagCode = (countryCode: string) => {
  let code = codes[countryCode].code.toLowerCase();

  if (code === "wl") { // This is a hack for wales smh
    return "gb-wls";
  }
  return code;
}

export const getOdds = async (): Promise<Game[]> => {
  var games: any = {};
  try {
    const moneyLines = await axios.get("https://api.the-odds-api.com/v3/odds/?apiKey=1c1cef445a730e7dd8d5f98395977688&sport=soccer_uefa_european_championship&region=us");
    const spreads = await axios.get("https://api.the-odds-api.com/v3/odds/?apiKey=1c1cef445a730e7dd8d5f98395977688&sport=soccer_uefa_european_championship&region=us&market=spreads");
    const totals = await axios.get("https://api.the-odds-api.com/v3/odds/?apiKey=1c1cef445a730e7dd8d5f98395977688&sport=soccer_uefa_european_championship&region=us&market=totals");
    moneyLines.data.data.forEach((item: any) => {
      if (item.sites.length) {
        const id: string = item.id
        games[id] = ({
          teamA: {
            name: item.teams[0],
            logo: "flag-icon-" + countryCodeToFlagCode(item.teams[0]),
            id: item.teams[0].toLowerCase(),
            favorite: item.teams[0] === item.home_team
          },
          teamB: {
            name: item.teams[1],
            logo: "flag-icon-" + countryCodeToFlagCode(item.teams[1]),
            id: item.teams[1].toLowerCase(),
            favorite: item.teams[1] === item.home_team
          },
          draw: true,
          teamAodds: {
            moneyline: parseFloat(item.sites[0].odds.h2h[0]),
            spread: parseFloat((Math.random() + 1).toFixed(2)),
            total: parseFloat((Math.random() + 1).toFixed(2)),
          },
          teamBodds: {
            moneyline: parseFloat(item.sites[0].odds.h2h[1]),
            spread: parseFloat((Math.random() + 1).toFixed(2)),
            total: parseFloat((Math.random() + 1).toFixed(2)),
          },
          drawodds: {
            moneyline: 1,
            spread: 2.8,
            total: 3,
          },
          spread: 1,
          total: 2,
          id: item.id,
          date: getDate(parseInt(item.commence_time) * 1000),
          time: getTime(parseInt(item.commence_time) * 1000),
          sol: {},
        })
      }
    })
    spreads.data.data.forEach((item: any) => {
      games[item.id].teamAodds.spread = item.sites[0].odds.spreads.odds[0]
      games[item.id].teamBodds.spread = item.sites[0].odds.spreads.odds[1]
      games[item.id].spread = Math.abs(item.sites[0].odds.spreads.points[1])
    })

    totals.data.data.forEach((item: any) => {
      games[item.id].teamAodds.total = item.sites[0].odds.totals.odds[0]
      games[item.id].teamBodds.total = item.sites[0].odds.totals.odds[1]
      games[item.id].total = Math.abs(item.sites[0].odds.totals.points[1])
    })
  } catch (err) {
    console.log(err);
  }
  return Object.values(games);
}
