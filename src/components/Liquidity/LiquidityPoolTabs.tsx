export const LiquidityPoolTabs = (props: { poolPerformance: number, setPoolPerformance: any }) => {
    const changeGraph = (tab : number) => {
        props.setPoolPerformance(tab);
    }
    return (
        <div className="pool-performance-tabs">
            <div onClick={() => changeGraph(0)} className={props.poolPerformance === 0 ? "pool-performance-tab-active" : "pool-performance-tab"}><span>Pool Balance</span></div>
            <div onClick={() => changeGraph(1)} className={props.poolPerformance === 1 ? "pool-performance-tab-active" : "pool-performance-tab"}>Provider Earnings</div>
            <div onClick={() => changeGraph(2)} className={props.poolPerformance === 2 ? "pool-performance-tab-active" : "pool-performance-tab"}>Betting Volume</div>
        </div>
  );
}
