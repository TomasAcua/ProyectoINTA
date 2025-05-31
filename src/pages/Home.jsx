import CardGrid from '../components/CardGrid/CardGrid'
import MainTitle from '../components/MainTitle/MainTitle';
import FeaturesOverview from '../components/FeaturesOverview/FeaturesOverview';
function Home() {

  return (
    <div className="w-full h-full">
      <MainTitle title={"Calculadoras de"} emphasis={" Costos Agropecuarios"}/>
      <CardGrid/>
      <FeaturesOverview />
    </div>
  );
}

export default Home;