import { Tag } from 'antd';
export const GameName = (props: { matches: number }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <h2>
                UEFA Euro 2020
            </h2>
            <Tag style={{ marginTop: -8, color: 'gray', marginLeft: 6 }}>{props.matches} Matches</Tag>
        </div>
    );
};
