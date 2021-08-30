import { SeasonHeader } from "../SingleMarket/SeasonHeader"
import { HomeCarousel } from "./HomeCarousel"
import { SeasonGames } from "../SingleMarket/SeasonGames";
import { useGetSeasonsQuery } from "../../store/seasons";
import { SportContext } from "../../contexts/sport";
import { useContext, useState } from "react"
import { LABELS } from "../../constants";
import { Loader } from "../Loader";
import { LiveMarkets } from "./LiveMarkets";
import { SportsList } from "./SportsList";

export const SeasonsView = () => {
    const { sport, changeSport } = useContext(SportContext)
    const { data, error, isLoading } = useGetSeasonsQuery(sport ? sport?.sportId : 0)
    const [search, setSearch] = useState("")
    console.log(data)
    return (
      <>
        <LiveMarkets />
        <HomeCarousel />
        <SportsList />
        <SeasonHeader seasonName={sport?.sportName} onChange={setSearch}/>
        {error ? LABELS.SERVER_ERROR : null}
        {isLoading ? <Loader /> : null}
        {data?.map(season => <SeasonGames season={season} key={season.season.seasonId} search={search}/>)}
      </>
    )
}