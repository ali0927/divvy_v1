import { Button } from 'antd'
import { useContext } from 'react';
import { LABELS } from '../../constants';
import { Sports } from '../../constants/Sports';
import { SportContext } from '../../contexts/sport';
import { useGetSportsQuery } from '../../store/sports';
import { Loader } from '../Loader';
import { BETS_VIEW_PATH } from "../../constants"
import { useHistory } from 'react-router';
export const SportsList = ({ search = "" as any }) => {
    const { data, error, isLoading } = useGetSportsQuery(null)
    const { sport, changeSport } = useContext(SportContext)
    const history = useHistory();

    const sportClicked = (Sport: Sports) => {
        changeSport(Sport);
        history.push(BETS_VIEW_PATH);
    }

    const ListsUI = () => {
      let market: JSX.Element[] = [];
      data?.forEach((sportData) => {
        if (sportData.sportName.toLowerCase().includes(search.toLowerCase())) {
          market.push(
            <div onClick={() => { sportClicked(sportData) }}
                className={sport?.sportId === sportData.sportId ? "sports-list-item sports-list-item-selected": "sports-list-item"}
                key={sportData.sportId}>
              <Button className="search-button" ghost type="default">
                <div className="team-logo">
                  <img src={sportData.sportLogo} alt="Sport logo" />
                </div>
              </Button>
            </div>
          )
        }
      })
      return market;
    }
    return (
        <div style={{display:'flex', margin:"3rem 0", justifyContent:'center', width:'100%'}}>
          {error ? LABELS.SERVER_ERROR : null}
          {isLoading ? <Loader /> : null}
          {ListsUI()}
        </div>
    );
};
