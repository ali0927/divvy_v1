import logo from '../../img/landing-page/divvy_logo.svg'
import Download from './Download'
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome')
const { faDiscord, faTwitter, faTelegram, faGithub } = require('@fortawesome/free-brands-svg-icons')

export const Header = () => {
    return (
      <header className="landing-page__header">
          <div className="logo"><a href="/"><img src={logo} alt="Divvy" /></a></div>
          {/*<div className="tagline">Be the House<br />Decentralized betting</div>
          <div className="message">Coming late 2021</div>*/}
          <div className="social-links">
            <a href="https://discord.gg/QbWgYfYB" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDiscord} /></a>
            <a href="https://twitter.com/DivvyBet" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://t.me/Divvy_bet" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTelegram} /></a>
            <a href="https://github.com/DivvyBet" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
          </div>
          <div className="links">
              <Download />
          </div>
          {/* <div className="cta">
            <a className="btn btn-sm" href="/app">Try it out today</a>
          </div>    */}
      </header>
    );
  };
