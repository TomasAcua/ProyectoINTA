import ModuleLayout from "../components/ModuleLayout/ModuleLayout";
import { FIELDS_COSTO_SANITARIO as BASE_FIELDS } from "../consts/costoSanitario"
import { useMemo } from "react";
import { calcularCostoSanitario } from "../utils/calcularCosto";

import useSheets from "../hooks/useSheets";
import "../App.css";
import { LoaderCircle } from "lucide-react"


function CostoSanitario() {
  const columnasPDF = [
    { label: "Producto", key: "producto", required: true },
    { label: "Unidad", key: "unidad", required: true },
    { label: "Dosis", key: "dosis", required: true },
    { label: "Precio Unitario", key: "precioUnitario", required: true },
  ];
  const googleSheetUrl = "https://docs.google.com/spreadsheets/d/1sYafPrjzV5WdhpW1JOZw3FoiZbHiDqDHz_F7ayCL_Sw/edit?gid=1418408786#gid=1418408786";
  const productos = useSheets(googleSheetUrl, "sanitarias");

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
          titulo="Planes Sanitarios"
          fields={fields}
          calcularCosto={calcularCostoSanitario}
          storageKey="Sanitario"
          columnasPDF={columnasPDF}
          tituloModal="Editar Costo Sanitario"
          type="Costo Sanitario"
        />
      </div>
    ) : (
      <div className="h-[80vh] flex items-center justify-center">
        <LoaderCircle className="scale-200 animate-spin" />
      </div>
    ))

  )
}

export default CostoSanitario