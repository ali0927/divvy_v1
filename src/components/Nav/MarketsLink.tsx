import { Button } from 'antd'
export const MarketsLink = ({search = "" as any}) => {
    const marketseg = [{ value: "football", name: "Football", }, { value: "basketball", name: "Basketball" }, { value: "mma", name: "MMA" },
    { value: "americanfootball", name: "American Football" },
    { value: "basketball", name: "Basketball" },
    { value: "hockey", name: "Hockey" },
    { value: "esports", name: "E-Sports" },
    { value: "hoor", name: "Horse Racing" },
    { value: "fighting", name: "Fighting" },
    { value: "motorracing", name: "Motor Racing" },
    { value: "tennis", name: "Tennis" },
    { value: "golf", name: "Golf" },
    { value: "darts", name: "Darts" },
    { value: "rugby", name: "Rugby" },
    { value: "tabletennis", name: "Table Tennis" },
    { value: "cricket", name: "Cricket" },
    { value: "snooker", name: "Snooker" },
    { value: "volleyball", name: "Volleyball" },
    { value: "cycling", name: "Cycling" },];
    const MarketsUI = () => {
        let market: JSX.Element[] = [];
        marketseg.forEach((data, index) => {
            if (data.name.toLowerCase().includes(search.toLowerCase())) {
                market.push(
                    <div className="search-item">
                        <Button className="search-button" ghost type="default">
                            <div className="search-button-data">
                                <div className="search-left">
                                    {data.name}
                                </div>
                                <div className="search-right text-secondary">
                                    {parseInt(String((Math.random() + 1) * 10))}
                                </div>
                            </div>
                        </Button>
                    </div>
                )
            }
        })
        return market;
    }
    return (
            <div className="sidebar-section sidebar-section-markets">
                {MarketsUI()}
            </div>
    );
};
