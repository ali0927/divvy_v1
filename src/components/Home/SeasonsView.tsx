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
import { useMediaQuery } from "../../utils/utils";
import { Button } from "antd";

export const SeasonsView = () => {
    const { sport, changeSport } = useContext(SportContext)
    const { data, error, isLoading, refetch } = useGetSeasonsQuery(sport ? sport?.sportId : 0)
    const [search, setSearch] = useState("")
    const [switchVal, setSwitchVal] = useState<number>(0)
    let isMobile = useMediaQuery(`(max-width: 400px)`);
    // console.log(data)
    return (
      <>
        <LiveMarkets />
        <HomeCarousel />
        <SportsList />
        <SeasonHeader
          refetch={refetch}
          seasonName={sport?.sportName}
          value={search}
          onChange={setSearch}
          switchVal={switchVal}
          setSwitchVal={setSwitchVal}
        />
        {error ? LABELS.SERVER_ERROR : null}
        {isLoading ? <Loader /> : null}
        {switchVal == 0 ?
          data?.map(season => <SeasonGames season={season} key={season.season.seasonId} search={search}/>)
        :
          <div style={{
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <h3>Future betting is coming soon</h3>
          </div>
        }
        {isMobile &&
          <div style={isMobile ? {display: 'flex', width: '100%', flexDirection: 'inherit', justifyContent: 'center'} : {display: 'none'}}>
            <Button type="text" onClick={() => setSearch('')} style={{width: '95%'}}>Clear Search</Button>
          </div>
        }
      </>
    )
}