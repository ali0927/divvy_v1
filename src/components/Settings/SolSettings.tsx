import React from "react";
import { Select } from "antd";
import { useConnectionConfig } from "../../contexts/sol/connection";
import { ENDPOINTS } from "../../constants/sol/env";

export const SolSettings = () => {
  const { endpoint, setEndpoint } = useConnectionConfig();

  return (
    <>
      <div style={{ display: "grid" }}>
        Network:{" "}
        <Select
          onSelect={setEndpoint}
          value={endpoint}
        >
          {ENDPOINTS.map(({ name, endpoint }) => (
            <Select.Option value={endpoint} key={endpoint}>
              {name}
            </Select.Option>
          ))}
        </Select>       
      </div>
    </>
  );
};
