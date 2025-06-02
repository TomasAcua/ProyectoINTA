import CostoSanitario from "./pages/CostoSanitario";
import Home from "./pages/Home.jsx";
import Fertilizacion from "./pages/Fertilizacion";
import CostoMaquinarias from "./pages/CostoMaquinarias";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ROUTES } from './const/routes'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
  
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.costoSanitario} element={<CostoSanitario />} />
        <Route path={ROUTES.costoMaquinaria} element={ <CostoMaquinarias />} />
        <Route path={ROUTES.fertilizacion} element={<Fertilizacion />}/>
        {/*<Route element={<Error />} path="*" />*/}
      </Routes>
      <Footer />
    </>


  );
}

export default App;
