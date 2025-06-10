import Product from '../Product/Product';
import Modal from '../Modal/Modal'; 
import { useState } from 'react';
const ProductsList = ({ products, onEdit, onEliminar}) => {
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
         <>
        <section className="w-full mx-auto mt-4 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 gap-4 font-semibold text-sm text-gray-700 bg-gray-100 px-4 py-3 border-b">
                <span>Nombre</span>
                <span>Dosis</span>
                <span>Volumen</span>
                <span>Unidad</span>
                <span>Cantidad</span>
                <span>Costo</span>
            </div>
            <div className="divide-y">
                {products.map((prod, idx) => (
                    <div key={prod.id}>
                        <Product  object={prod} onClickEdit={() => abrirModal(prod, idx)} onEliminar={() => onEliminar(idx)}/>
                    </div>
                ))}
            </div>
        </section>
         {modalOpen && (
                <Modal
                    producto={productoActual}
                    onClose={cerrarModal}
                    onSave={guardarCambios}
                />
            )}
        </>
    );
};

export default ProductsList;
