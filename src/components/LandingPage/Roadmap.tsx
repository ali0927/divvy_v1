import roadmap from '../../img/landing-page/divvy_roadmap.png';

export const Roadmap = () => {
    return (
      <section className="landing-page__roadmap">
          <h2 className="heading-lg">The Roadmap</h2>
          <img src={roadmap} alt="Divvy Roadmap" className="img-fluid" />
      </section>
    );
};
  