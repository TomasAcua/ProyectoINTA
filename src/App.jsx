import CostoSanitario from "./pages/CostoSanitario.jsx";
import Home from "./pages/Home.jsx";
import Fertilizacion from "./pages/Fertilizacion.jsx";
//import CostoMaquinaria from "./pages/CostoMaquinaria.jsx";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ROUTES } from './const/routes'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (

    <>
      <Header />
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.costoSanitario} element={<CostoSanitario />} />
        {/*<Route element={ <CostoMaquinaria />} path={ROUTES.costoMaquinaria} />*/}
        <Route path={ROUTES.fertilizacion} element={<Fertilizacion />}/>
        {/*<Route element={<Error />} path="*" />*/}
      </Routes>
      <Footer />
    </>

  );
}

export default App;
