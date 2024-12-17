import loki from '../assets/20180816_120800.jpg';

const Homepage = () => {
  return (
    <section className="homepage">
      <h1>Whispers on the Wind</h1>
      <p>
        There's Whispers on the Wind all around us; this is just a site to
        collect the most interesting ones for your viewing pleasure.
      </p>
      <img className="ph-img" src={loki} />
    </section>
  );
};

export default Homepage;
