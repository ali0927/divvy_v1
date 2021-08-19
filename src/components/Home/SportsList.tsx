import { Button, Row, Col } from 'antd'
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
                  <img src={"EA_Sports-Logo.svg"} alt="Sport logo" />
                </div>
                <div style={{textAlign:'center', whiteSpace:'pre-wrap', fontSize:'1.2vw'}}>
                  {sportData.sportName}
                </div>
              </Button>
            </div>
          )
        }
      })
      return market;
    }
    return (
        <div style={{display:'flex', margin:"2vw 0", justifyContent:'center'}}>
          {error ? LABELS.SERVER_ERROR : null}
          {isLoading ? <Loader /> : null}
          {ListsUI()}
        </div>
    );
};
