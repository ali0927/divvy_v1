import logo from '../../img/landing-page/divvy_logo.svg'
import discord from '../../img/landing-page/discord.png'
import twitter from '../../img/landing-page/twitter.png'
import github from '../../img/landing-page/github.png'
import telegram from '../../img/landing-page/telegram.png'

export const Header = () => {
    return (
      <header className="landing-page__header">
          <div className="logo"><a href="/"><img src={logo} alt="Divvy" /></a></div>
          <div className="tagline">Be the House<br />Decentralized betting</div>
          <div className="message">Coming late 2021</div>
          <div className="social-links">
            <a href="https://discord.gg/QbWgYfYB" target="_blank" rel="noreferrer"><img src={discord} alt="Discord" /></a>
            <a href="https://twitter.com/DivvyBet" target="_blank" rel="noreferrer"><img src={twitter} alt="Twitter" /></a>
            <a href="https://t.me/Divvy_bet" target="_blank" rel="noreferrer"><img src={telegram} alt="Telegram" /></a>
            <a href="https://github.com/DivvyBet" target="_blank" rel="noreferrer"><img src={github} alt="Github" /></a>
          </div>
      </header>
    );
  };
  