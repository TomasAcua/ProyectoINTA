import { maquinas } from "../assets/resources/maquinas";
export const FIELDS_COSTO_MAQUINARIAS = [
  {
    key: "tractor",
    label: "Tractor",
    type: "select",
    required: true,
    options: maquinas.map(m => m.nombre),
  },
  {
    key: "implemento",
    label: "Implemento",
    type: "select",
    required: true,
    options: (form) => {
    
      const tractorObj = maquinas.find(m => m.nombre === form.tractor);
      return tractorObj ? tractorObj.implementos.map(i => i.nombre) : [];
    }
  },
  {
    key: "precioCombustible",
    label: "Precio del Combustible (USD/L)",
    type: "number",
    required: true,
  }
];
