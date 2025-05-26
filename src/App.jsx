import { Routes, Route } from "react-router-dom";
import CostoSanitario from "./pages/CostoSanitario.jsx";
import Home from "./pages/Home.jsx";
import Fertilizacion from "./pages/Fertilizacion.jsx";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/costo-sanitario" element={<CostoSanitario />} />
        <Route path="/fertilizacion" element={<Fertilizacion />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
