import React from "react";
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { SingleMatchComponent } from "./SingleMatchComponent"
const { SubMenu } = Menu;
export const SingleMarketMatches = () => {
    return (
        <div className="single-market">
            <Menu
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['game1']}
                mode="inline"
                style={{ background: "#0d0d0d", width: "100%", borderWidth: 0 }}
            >
                <SubMenu style={{ background: "#0d0d0d", width: "100%" }} key="game1" title="UEFA Europa League">
                    <SingleMatchComponent />
                </SubMenu>
                <SubMenu style={{ background: "#0d0d0d", width: "100%" }} key="game2" title="UEFA Champions League">
                    <Menu.ItemGroup key="g3" title="Item 1">
                        <Menu.Item key="5">Option 1</Menu.Item>
                        <Menu.Item key="6">Option 2</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup key="g4" title="Item 2">
                        <Menu.Item key="7">Option 3</Menu.Item>
                        <Menu.Item key="8">Option 4</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>
        </div>
    )
};
