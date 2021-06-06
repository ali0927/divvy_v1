import React, { useState } from 'react';
export const OddsType = () => {
    return (
        <div style={{ display: "flex", alignItems: "center", marginLeft: "15%", justifyContent: "space-around", width: "59%", textAlign: "center" }}>
            <div style={{ width: 80 }}>Money Line</div>
            <div style={{ width: 80 }}>Spread</div>
            <div style={{ width: 80 }}>Total</div>
        </div>
    );
};
