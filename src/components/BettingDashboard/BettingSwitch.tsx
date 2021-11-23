export const BettingSwitch = (props: { switchVal: number, setSwitchVal: any }) => {
    const changeTab = (num: number) => {
        props.setSwitchVal(num);
    }
    return (
        <div className="switch-tabs switch-tabs-small">
            <div onClick={() => changeTab(0)} className={props.switchVal === 0 ? "switch-tab-active switch-tab-small" : "switch-tab switch-tab-small"}>
                <span>Liquidity Provider Dashboard</span>
            </div>
            <div onClick={() => changeTab(1)} className={props.switchVal === 1 ? "switch-tab-active switch-tab-small" : "switch-tab switch-tab-small"}>
                <span>Betting Dashboard</span>
            </div>
        </div>
    );
};