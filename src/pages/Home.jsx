import { useState } from 'react';
import CardGrid from '../components/CardGrid/CardGrid';
import MainTitle from '../components/MainTitle/MainTitle';
import FeaturesOverview from '../components/FeaturesOverview/FeaturesOverview';
import CardIntegrantes from '../components/CardIntegrantes/CardIntegrantes';
import ModalIntegrantes from '../components/Modal/ModalIntegrantes';
import Button from '../components/Button/Button';

function Home() {
  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  return (
    <div className="w-full h-full">
      <MainTitle title={"Calculadoras de"} emphasis={" Costos Agropecuarios"} />
      <CardGrid />
      <div className="my-4 h-0.5 border-t-0  bg-black/15 mx-12"></div>
      <FeaturesOverview />
      <div className="my-4 h-0.5 border-t-0  bg-black/15 mx-12"></div>

      {/* Botón para abrir el modal de integrantes */}
      <div className="flex justify-center m-4">
        <Button onClick={abrirModal} className="bg-gradient-to-br from-blue-400 via-indigo-500 to-blue-600 text-white px-4 py-2 rounded-lg">
          Ver Integrantes
        </Button>
      </div>
      
      <ModalIntegrantes isOpen={modalAbierto} onClose={cerrarModal}>
        <CardIntegrantes />
      </ModalIntegrantes>
    </div>
  );
}

export default Home;
