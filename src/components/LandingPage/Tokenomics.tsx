import chart from '../../img/landing-page/divvy_tokenomics.png'

export const Tokenomics = () => {
    return (
        <section className="landing-page__tokenomics">
          <div className="content">
            <h2 className="heading-md">Divvy Token Economics</h2>
            <ul>
              <li className="team">15.0% Team &amp; Advisors</li>
              <li className="foundation">5.0% Foundation</li>
              <li className="private-public">16.5% Private &amp; Public</li>
              <li className="community">38.0% Community &amp; Ecosystem</li>
              <li className="marketing">10.0% Partnership &amp; Marketing</li>
              <li className="dev-grants">10.0% Dev Grants</li>
              <li className="liquidity">1.8% Liquidity</li>
              <li className="reserves">3.8% Reserves</li>
            </ul>
          </div>
          <div className="chart">
            <img src={chart} alt="Divvy Token Economics Chart" className="img-fluid" />
          </div>
        </section>
    );
};
  