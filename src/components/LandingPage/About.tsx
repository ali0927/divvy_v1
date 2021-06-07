import divvyLogo from '../../img/landing-page/divvy_fold_temp.png'

export const About = () => {
    return (
      <section className="landing-page__about">
            <div className="content">
              <h1 className="heading-sm">Divvy is bringing DeFi to the gambling world to redefine the way people bet. Together, we'll create a completely decentralized protocol.</h1>
              <p>Coming soon on Solana</p>
            </div>
            <div className="divvy-logo">
              <video poster={divvyLogo} autoPlay muted loop>
                <source src="/video/divvy_logo_anim.mp4" type="video/mp4" />
              </video>
            </div>
      </section>
    );
};
  