import CardGrid from '../components/CardGrid/CardGrid'
import MainTitle from '../components/MainTitle/MainTitle';
import FeaturesOverview from '../components/FeaturesOverview/FeaturesOverview';
import QuickNavigate from '../components/QuickNavigate/QuickNavigate';

function Home() {

  return (
    <div className="w-full h-full">      
      <MainTitle title={"Calculadoras de"} emphasis={" Costos Agropecuarios"}/>
      <CardGrid/>
      <div className="my-4 h-0.5 border-t-0  bg-black/15 mx-12"></div>
      <FeaturesOverview />
    </div>
  );
}

export default Home;