import ProductsList from "../ProductsList/ProductsList";
import Cost from "../Cost/Cost";
import { useState } from "react";

const PlansList = ({ plans, dolar, editarProducto, eliminarProducto  }) => {
    const [costoTotal, setCostoTotal] = useState(0);


    const planesConProductos = plans.filter(plan => plan.productos && plan.productos.length > 0);

    return (
        <div className="space-y-7">
            {planesConProductos.length > 0 ? (
                planesConProductos.map((plan, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            {plan.name}
                        </h3>
                        <ProductsList products={plan.productos}  onEdit={(productoIndex, nuevosValoresx) =>
    editarProducto(index, productoIndex, nuevosValoresx)} onEliminar={(productoIndex) => eliminarProducto(index, productoIndex)}/>
                        <div className="mt-4 text-right">
                            <strong className="text-gray-700 text-lg">
                                <Cost products={plan.productos} setCostoTotal={setCostoTotal} dolar={dolar} />
                            </strong>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500 italic">No hay planes con productos guardados.</div>
            )}
        </div>
    );
};

export default PlansList;
