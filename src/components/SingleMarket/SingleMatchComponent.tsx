import React, { useState } from 'react';
import { Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
import { TeamDetails } from "./TeamDetails"
export const SingleMatchComponent = () => {
    return (
        <div className="single-match">
            <div>
                <div>
                    <TeamDetails />
                </div>
                <p>Versus</p>
                <div>
                    <TeamDetails />
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};
