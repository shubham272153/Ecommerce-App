import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/OurPolicy";
import NewslatterBox from "../components/NewslatterBox";
const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewslatterBox />
    </div>
  );
};

export default Home;
