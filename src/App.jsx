import CostoSanitario from "./pages/CostoSanitario.jsx";
import Home from "./pages/Home.jsx";
import Fertilizacion from "./pages/Fertilizacion.jsx";
import CostoMaquinaria from "./pages/CostoMaquinaria.jsx";
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
          
          <Route path="/" element={<Navigate to={ROUTES.home} />} />
            <Route element={ <Home/> } path={ROUTES.home} />
             <Route element={ <CostoSanitario/> } path={ROUTES.costoSanitario} />
            <Route element={ <CostoMaquinaria />} path={ROUTES.costoMaquinaria} />
            <Route element={ <Fertilizacion />} path={ROUTES.fertilizacion} /> 
            <Route element={ <Error/>} path="*" />
          </Routes>

           <Footer />
        </>

  );
}

export default App;
