import Modal from '../Modal/Modal'; 
import { useState } from 'react';
import Cost from '../Cost/Cost';

const MaquinariasIngresadas = ({ costoMaquinaria, dolar, precioCombustible, onEdit, onEliminar }) => {
  const tieneDatos = costoMaquinaria && costoMaquinaria.length > 0;
const [costoTotal, setCostoTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoActual, setProductoActual] = useState(null);
  const [indexActual, setIndexActual] = useState(null);

  const abrirModal = (producto, index) => {
    setProductoActual(producto);
    setIndexActual(index);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setProductoActual(null);
    setIndexActual(null);
  };

  const guardarCambios = (nuevosValores) => {
    onEdit(indexActual, nuevosValores);
    cerrarModal();
  };

  return (
    <div className="space-y-10">
      {/* Maquinarias Ingresadas */}
      <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
        {tieneDatos ? (
          <>
          {costoMaquinaria
  .filter((item) => item.form && item.form.totalMaquinaria) // solo formularios con total calculado
  .map((item, index) => {
                        const { tractor, implemento, totalMaquinaria } = item.form || {};

              
         
            return (
              <div key={index} >

                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {item.name || `Formulario ${index + 1}`}
                </h3>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 font-medium bg-gray-100 border-b p-2">
                  <span>Tractor</span>
                  <span>Implemento</span>
                  <span>Precio Combustible</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-800 p-2">
                  <span>{tractor || "-"}</span>
                  <span>{implemento || "-"}</span>
                  <span>${precioCombustible || "-"}</span>
                </div>
                <div>
               <strong className="text-gray-700 text-lg flex justify-end">
                                <Cost costoMaquinaria={totalMaquinaria} setCostoTotal={setCostoTotal} dolar={dolar} />
                            </strong>
            </div>
          </div>
            );})}
         
              
           </>
        ) : (
         
         
          <div className="text-center text-gray-500 italic">
            No hay maquinarias ingresadas.
          </div>
        )}
      </section>

      
      {modalOpen && (
        <Modal
          producto={productoActual}
          onClose={cerrarModal}
          onSave={guardarCambios}
        />
      )}
    </div>
  );
};

export default MaquinariasIngresadas;
