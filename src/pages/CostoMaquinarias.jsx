import { FIELDS_COSTO_MAQUINARIAS as BASE_FIELDS } from "../consts/maquinarias";
import { calcularCostoTotalMaquinaria } from "../utils/calcularCosto";
import ModuleLayout from "../components/ModuleLayout/ModuleLayout";
import useSheets from "../hooks/useSheets";
import { useState } from "react";
import { LoaderCircle } from 'lucide-react'

import { useMemo } from "react";

const columnasPDF = [
  { label: "Tractor", key: "tractor", required: true },
  { label: "Implemento", key: "implemento", required: true },
];

export default function CostoMaquinaria() {

  const googleSheetUrl = "https://docs.google.com/spreadsheets/d/1O1Qa4zcJ-c1mxIaRq5wDf08a6ptuvyiRzraOoxzrqQk/edit?gid=1514857302#gid=1514857302";
  const productos = useSheets(googleSheetUrl, "maquinarias");

  const fields = useMemo(() => {
    if (!productos || productos.length === 0) return [];
    console.log(productos)
    return [
      {
        key: "tractor",
        label: "Tractor",
        type: "select",
        required: true,
        options: productos.map((p) => p.nombre),
      },
      {
        key: "implemento",
        label: "Implemento",
        type: "select",
        required: true,
        options: (form) => {
          const tractor = productos.find((p) => p.nombre === form.tractor);
          return tractor ? tractor.implementos.map((i) => i.nombre) : [];
        },
      },
      {
        key: "precioCombustible",
        label: "Precio del Combustible (USD/L)",
        type: "number",
        required: true,
      },
    ];
  }, [productos]);



  return (
    ( productos ? (
      <div className="flex justify-center w-full">
            <ModuleLayout
              titulo="Visualizador de Costos Maquinarias"
              fields={fields}
              calcularCosto={(form) => {
                const tractorObj = productos.find(p => p.nombre === form.tractor);
                const implementoObj = tractorObj?.implementos.find(i => i.nombre === form.implemento);

                return calcularCostoTotalMaquinaria({
                  ...form,
                  tractor: tractorObj,
                  implemento: implementoObj,
                });
              }}
              storageKey="maquinariasForm"
              columnasPDF={columnasPDF}
              tituloModal="Editar Maquinarias"
            />
          </div>
    ) : (
    <div className="h-[80vh] flex items-center justify-center">
      <LoaderCircle/>
      Cargando datos de maquinarias...</div>
    )
  )
  );
}
