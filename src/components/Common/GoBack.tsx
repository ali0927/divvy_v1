import { ArrowLeftOutlined } from "@ant-design/icons";
import { Row } from "antd";
import { Link } from "react-router-dom";
import { BETS_VIEW_PATH } from "../../constants"
export const GoBack = () => {
    return (
        <Row>
            <Link to={BETS_VIEW_PATH} className="root" style={{justifyContent: "center", alignItems: "center"}}>
                <ArrowLeftOutlined />
                <span style={{margin: "2px 0 0 10px"}}>Go Back</span>
            </Link>
        </Row>
    );
};