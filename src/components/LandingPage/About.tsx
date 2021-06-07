import divvyLogo from '../../img/landing-page/divvy_fold_temp.png'

export const About = () => {
    return (
      <section className="landing-page__about">
            <div className="content">
              <h1 className="heading-sm">Divvy is bringing DeFi to the gambling world to redefine the way people bet. Together,we'll create a completely decentralized protocol.</h1>
              <p>Coming soon on Solana<br />Follow the development at:</p>
              <p className="social-links">
                <a href="https://discord.gg/QbWgYfYB" target="_blank" rel="noreferrer">discord</a>
                <a href="https://twitter.com/DivvyBet" target="_blank" rel="noreferrer">twitter</a><br />
                <a href="https://t.me" target="_blank" rel="noreferrer">telegram</a>
                <a href="https://github.com/DivvyBet" target="_blank" rel="noreferrer">github</a>
              </p>
            </div>
            <div className="divvy-logo">
              <video poster={divvyLogo}>
                <source src="/video/divvy_logo_anim.mp4" type="video/mp4" />
              </video>
            </div>
      </section>
    );
};
  