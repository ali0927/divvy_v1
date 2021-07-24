export const BettingSwitch = (props: { siwtchVal: number, setSwitchVal: any }) => {
    const changeTab = (num: number) => {
        props.setSwitchVal(num);
    }
    return (
        <div className="switch-tabs switch-tabs-small">
            <div onClick={() => changeTab(0)} className={props.siwtchVal === 0 ? "switch-tab-active switch-tab-small" : "switch-tab switch-tab-small"}><span>Liquidity Provider Dashboard</span></div>
            <div onClick={() => changeTab(1)} className={props.siwtchVal === 1 ? "switch-tab-active switch-tab-small" : "switch-tab switch-tab-small"}>Betting Dashboard</div>
        </div>
    );
};