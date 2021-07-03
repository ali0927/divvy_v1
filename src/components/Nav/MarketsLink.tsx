import { Button } from 'antd'
import { useContext } from 'react';
import { LABELS } from '../../constants';
import { SportContext } from '../../contexts/sport';
import { useGetSportsQuery } from '../../store/sports';
import { Loader } from '../Loader';
export const MarketsLink = ({ search = "" as any }) => {
    const { data, error, isLoading } = useGetSportsQuery(null)
    const { sport, changeSport } = useContext(SportContext)
    const MarketsUI = () => {
        let market: JSX.Element[] = [];
        data?.forEach((sportData, index) => {
            if (sportData.sportName.toLowerCase().includes(search.toLowerCase())) {
                market.push(
                    <div onClick={() => { changeSport(sportData) }} className={sport?.sportId === sportData.sportId ? "selected-search-item" : "search-item selected"} key={sportData.sportId}>
                        <Button className="search-button" ghost type="default">
                            <div className="search-button-data">
                                <div className="search-left">
                                    {sportData.sportName}
                                </div>
                                <div className="search-right text-secondary">
                                    {sportData.count}
                                </div>
                            </div>
                        </Button>
                    </div >
                )
            }
        })
        return market;
    }
    return (
        <div className="sidebar-section sidebar-section-markets">
            {error ? LABELS.SERVER_ERROR : null}
            {isLoading ? <Loader /> : null}
            {MarketsUI()}
        </div>
    );
};
