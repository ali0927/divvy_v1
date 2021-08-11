import { SeasonHeader } from "../SingleMarket/SeasonHeader"
import { HomeCarousel } from "./HomeCarousel"
import { SeasonGames } from "../SingleMarket/SeasonGames";
import { useGetSeasonsQuery } from "../../store/seasons";
import { SportContext } from "../../contexts/sport";
import { useContext } from "react"
import { LABELS } from "../../constants";
import { Loader } from "../Loader";
import { LiveMarkets } from "./LiveMarkets";
export const SeasonsView = () => {
    const { sport, changeSport } = useContext(SportContext)
    const { data, error, isLoading } = useGetSeasonsQuery(sport ? sport?.sportId : 0)
    return (
        <>
            <LiveMarkets />
            <HomeCarousel />
            <SeasonHeader seasonName={sport?.sportName} />
            {error ? LABELS.SERVER_ERROR : null}
            {isLoading ? <Loader /> : null}
            {data?.map(season => <SeasonGames season={season} key={season.season.seasonId} />)}
        </>
    )
}