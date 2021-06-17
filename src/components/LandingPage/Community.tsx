import discord from '../../img/landing-page/discord.png'
import twitter from '../../img/landing-page/twitter.png'
import github from '../../img/landing-page/github.png'
import telegram from '../../img/landing-page/telegram.png'

export const Community = () => {
    return (
      <section className="landing-page__community">
          <div className="content">
            <h2 className="heading-md">Join the Community</h2>
            <p>
              Divvy is a global, decentralized network with members from all around the world. Join the discussions on our Social Networks and stay up to date with the latest news and announcements.
            </p>
          </div>
          <div className="social">
              <a className="justify-start align-start" href="https://discord.gg/ksKA3nEgCk" target="_blank" rel="noreferrer"><img src={discord} alt="Discord" /></a>
              <a className="justify-end align-start" href="https://twitter.com/DivvyBet" target="_blank" rel="noreferrer"><img src={twitter} alt="Twitter" /></a>
              <a className="justify-start align-end" href="https://github.com/DivvyBet" target="_blank" rel="noreferrer"><img src={github} alt="Github" /></a>
              <a className="justify-end align-end" href="https://t.me/Divvy_bet" target="_blank" rel="noreferrer"><img src={telegram} alt="Telegram" /></a>
          </div>
      </section>
    );
};
  