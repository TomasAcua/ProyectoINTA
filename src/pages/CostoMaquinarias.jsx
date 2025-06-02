import { FIELDS_COSTO_MAQUINARIAS } from "../consts/maquinarias";
import { calcularCostoTotalMaquinaria } from "../utils/calcularCosto";
import ModuleLayout from "../components/ModuleLayout/ModuleLayout";
import useSheets from "../hooks/useSheets";

const columnasPDF = [
  { label: "Tractor", key: "tractor", required: true },
  { label: "Implemento", key: "implemento", required: true },
];

export default function CostoMaquinaria() {

  const url = "https://docs.google.com/spreadsheets/d/1O1Qa4zcJ-c1mxIaRq5wDf08a6ptuvyiRzraOoxzrqQk/edit?gid=1514857302#gid=1514857302";
const lista = useSheets(url, 'maquinarias');
console.log("Lista de maquinarias:", lista);


  return (
    <div className="flex justify-center w-full">
      <ModuleLayout
        titulo="Visualizador de Costos Maquinarias"
        fields={FIELDS_COSTO_MAQUINARIAS}
        calcularCosto={calcularCostoTotalMaquinaria}
        storageKey="maquinariasForm"
        columnasPDF={columnasPDF}
        tituloModal="Editar Maquinarias"
      />
    </div>
  );
}
