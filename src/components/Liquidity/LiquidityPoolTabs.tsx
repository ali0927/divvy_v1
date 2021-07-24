export const LiquidityPoolTabs = (props: { poolPerformance: number, setPoolPerformance: any }) => {
    const changeGraph = (tab : number) => {
        props.setPoolPerformance(tab);
    }
    return (
        <div className="switch-tabs">
            <div onClick={() => changeGraph(0)} className={props.poolPerformance === 0 ? "switch-tab-active" : "switch-tab"}><span>Pool Balance</span></div>
            <div onClick={() => changeGraph(1)} className={props.poolPerformance === 1 ? "switch-tab-active" : "switch-tab"}>Provider Earnings</div>
            <div onClick={() => changeGraph(2)} className={props.poolPerformance === 2 ? "switch-tab-active" : "switch-tab"}>Betting Volume</div>
        </div>
  );
}
