import { FIELDS_FERTILIZATION as BASE_FIELDS} from "../consts/fertilization";
import { calcularCostoFertilizacion } from "../utils/calcularCosto";
import ModuleLayout from "../components/ModuleLayout/ModuleLayout";
import useSheets from "../hooks/useSheets";
import { useMemo } from "react";
import { LoaderCircle } from "lucide-react"


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
  
const googleSheetUrl = "https://docs.google.com/spreadsheets/d/1hVKkRCa5wYUK0JVyEUqU0y0zcAdjZtwVAJ2MqrK1tQw/edit?gid=1018747124#gid=1018747124";
const productos = useSheets(googleSheetUrl, "fertilizantes");

  const fields = useMemo(() => {
    if (!productos || productos.length === 0) return BASE_FIELDS;
    return BASE_FIELDS.map((field) => {
      if (field.key === "producto") {
        return {
          ...field,
          options: productos
        };
      }
      return field;
    });
  }, [productos]);

  // if (!productos) return <div>Cargando datos de productos...</div>;

  return (
    (productos ? (
      <div className="flex justify-center w-full">
      <ModuleLayout
        titulo="Visualizador de Costos Fertilización"
        fields={fields}
        calcularCosto={calcularCostoFertilizacion}
        storageKey="productFormsFertilization"
        columnasPDF={columnasPDF}
        tituloModal="Editar Fertilización"
      />
    </div>
    ) : (
      <div className="h-[80vh] flex items-center justify-center">
        <LoaderCircle className="scale-200 animate-spin"/>
      </div>
    ))
    
  );
}
