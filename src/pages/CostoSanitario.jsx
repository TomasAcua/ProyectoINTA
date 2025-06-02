import ModuleLayout from "../components/ModuleLayout/ModuleLayout";
import { FIELDS_COSTO_SANITARIO } from "../consts/costoSanitario"
import { calcularCostoSanitario } from "../utils/calcularCosto";
import "../App.css";
import useSheets from "../hooks/useSheets";

function CostoSanitario() {
  const url = "https://docs.google.com/spreadsheets/d/1sYafPrjzV5WdhpW1JOZw3FoiZbHiDqDHz_F7ayCL_Sw/edit?gid=1418408786#gid=1418408786";

  const columnasPDF = [
    { label: "Producto", key: "producto", required: true },
    { label: "Dosis", key: "dosis", required: true },
    { label: "Volumen", key: "volumen", required: true },
    { label: "Cantidad de tratamientos", key: "tratamientos", required: true },
    { label: "Precio Unitario", key: "precioUnitario", required: true },
  ];

  
  const lista = useSheets(url, 'sanitarias');

  return (
    <div className="flex justify-center w-full">
      <ModuleLayout
        titulo="Visualizador de Costos Sanitarios"
        fields={FIELDS_COSTO_SANITARIO}
        calcularCosto={calcularCostoSanitario}
        storageKey="Sanitario"
        columnasPDF={columnasPDF}
        tituloModal="Editar Costo Sanitario"
      />
    </div>
  )
}

export default CostoSanitario