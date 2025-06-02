import { FIELDS_FERTILIZATION } from "../consts/fertilization";
import { calcularCostoFertilizacion } from "../utils/calcularCosto";
import ModuleLayout from "../components/ModuleLayout/ModuleLayout";
import useSheets from "../hooks/useSheets";

const columnasPDF = [
  { label: "Producto", key: "producto" },
  { label: "Unidad", key: "unidad" },
  { label: "Dosis", key: "dosis" },
  { label: "Presentación", key: "presentacion" },
  { label: "Precio", key: "precio" },
  { label: "Tratamientos", key: "tratamientos" },
  { label: "Costo", key: "costo" }
];


export default function Fertilizacion() {
  
const url = "https://docs.google.com/spreadsheets/d/1hVKkRCa5wYUK0JVyEUqU0y0zcAdjZtwVAJ2MqrK1tQw/edit?gid=1018747124#gid=1018747124";
const lista = useSheets(url, 'fertilizantes');
console.log("Lista de fertilizantes:", lista);

  return (
    <div className="flex justify-center w-full">
      <ModuleLayout
        titulo="Visualizador de Costos Fertilización"
        fields={FIELDS_FERTILIZATION}
        calcularCosto={calcularCostoFertilizacion}
        storageKey="productFormsFertilization"
        columnasPDF={columnasPDF}
        tituloModal="Editar Fertilización"
      />
    </div>
  );
}
