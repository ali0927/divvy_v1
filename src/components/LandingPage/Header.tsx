import logo from '../../img/landing-page/divvy_logo.svg'

export const Header = () => {
    return (
      <header className="landing-page__header">
          <div className="logo"><a href="/"><img src={logo} alt="Divvy" /></a></div>
          <div className="tagline">Be the House<br />Decentralized betting</div>
          <div className="message">Coming late 2021.<br />Follow the development:</div>
          <div className="social-links">
            <a href="https://discord.gg/QbWgYfYB" target="_blank" rel="noreferrer">discord</a>
            <a href="https://twitter.com/DivvyBet" target="_blank" rel="noreferrer">twitter</a><br />
            <a href="https://t.me" target="_blank" rel="noreferrer">telegram</a>
            <a href="https://github.com/DivvyBet" target="_blank" rel="noreferrer">github</a>
          </div>
      </header>
    );
  };
  