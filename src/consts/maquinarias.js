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
    key: "precioCombustible",
    label: "Precio del Combustible (USD/L)",
    type: "number",
    required: true,
  }
];
