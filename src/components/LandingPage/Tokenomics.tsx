import Chart from "react-google-charts";

export const Tokenomics = () => {
    return (
        <section className="landing-page__tokenomics">
          <div className="content">
            <h2 className="heading-md">Divvy Token Economics</h2>
            <ul>
              <li className="team">Team &amp; Advisors</li>
              <li className="foundation">Foundation</li>
              <li className="private-public">Private &amp; Public</li>
              <li className="community">Community &amp; Ecosystem</li>
              <li className="marketing">Partnership &amp; Marketing</li>
              <li className="dev-grants">Dev Grants</li>
              <li className="liquidity">Liquidity</li>
              <li className="reserves">Reserves</li>
            </ul>
          </div>
          <div className="chart">
            <Chart
              chartType="PieChart"
              width="100%"
              height="100%"
              options={{
                pieHole: 0.66,
                legend: 'none',
                backgroundColor: 'transparent',
                chartArea: {
                  width: "90%",
                  height: "90%",
                },
                colors: [
                  '#7E3BF8',
                  '#6D28F7',
                  '#5445D4',
                  '#5265C2',
                  '#537CB1',
                  '#5D99A1',
                  '#69B693',
                  '#79D284',
                ],
                pieSliceBorderColor: 'transparent',
                pieSliceText: 'none',
                tooltip: {
                  text: 'percentage',
                }
              }}
              data={[
                ['Task', 'Hours per Day'],
                ['Team & Advisors', 15],
                ['Foundation', 5],
                ['Private & Public', 16.5],
                ['Community & Ecosystem', 38],
                ['Partnership & Marketing', 10],
                ['Dev Grants', 10],
                ['Liquidity', 1.8],
                ['Reserves', 3.7],
              ]}            
            />
          </div>
        </section>
    );
};
  