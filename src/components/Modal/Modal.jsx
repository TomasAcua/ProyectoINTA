import { useEffect, useState } from "react";
import ListaDesplegable from "../ListaDesplegable/ListaDesplegable";
import Input from "../Input/Input";
import Button from "../Button/Button";
const Modal = ({ producto, onClose, onSave }) => {
      const [costoTotal, setCostoTotal] = useState(0);
  const [formData, setFormData] = useState({ ...producto });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "volumen" || name === "dosis" || name === "precioUnitario"
          ? parseFloat(value)
          : value,
    }));
  };
useEffect(() => {
  const volumen = parseFloat(formData.volumen);
  const dosis = parseFloat(formData.dosis);
  const precio = parseFloat(formData.precioUnitario);

  if (!isNaN(dosis) && !isNaN(volumen) && !isNaN(precio)) {
    const cantidad = dosis * volumen;
    const costoTotal = cantidad * precio;

    setFormData((prev) => ({
      ...prev,
      cantidad,
      costoTotal
    }));

    setCostoTotal(costoTotal);
  }
}, [formData.volumen, formData.dosis, formData.precio]);

  const handleSubmit = () => {
    onSave(formData);
  };

  const unidades = ["Litros", "cc", "Kg"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-lg font-bold mb-4">Editar Producto {producto.producto}</h2>

        <div className="space-y-3 flex flex-col items-center gap-2 ">
          <Input
            text="Dosis"
            name="dosis"
            type="number"
            value={formData.dosis}
            onChange={handleChange}
            placeholder="Ingrese una dosis"
          />
          <Input
            text="Volumen (hl/ha)"
            name="volumen"
            type="number"
            value={formData.volumen}
            onChange={ handleChange }
            placeholder="Ingrese un volumen"
          />
          <Input
            text="Precio"
            name="precioUnitario"
            type="number"
            value={formData.precioUnitario}
            onChange={handleChange}
            placeholder="Ingrese un precio"
          />

          <ListaDesplegable
            text="Unidad de dosis"
            name="unidad"
            id="unidad"
            array={unidades}
            value={formData.unidad}
            onChange={handleChange}
          />
    
            <div className="flex gap-5 justify-center mt-1">
                 <Button 
             className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
            ><span>Cancelar</span></Button>
            
             <Button 
             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleSubmit}>
              <span>Guardar</span>
            </Button>
            </div>
           
          </div>
        </div>
      </div>
 
  );
};

export default Modal;
