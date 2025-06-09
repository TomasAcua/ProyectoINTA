import { FIELDS_COSTO_MAQUINARIAS as BASE_FIELDS } from "../consts/maquinarias";
import { calcularCostoTotalMaquinaria } from "../utils/calcularCosto";
import ModuleLayout from "../components/ModuleLayout/ModuleLayout";
import useSheets from "../hooks/useSheets";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import PrecioCombustibleInput from "../components/PrecioCombustibleInput/PrecioCombustibleInput";

export default function CostoMaquinaria() {
  const [precioCombustible, setPrecioCombustible] = useState(
    localStorage.getItem("precioCombustible") || ""
  );
  useEffect(() => {
    localStorage.setItem("precioCombustible", precioCombustible);
  }, [precioCombustible]);

  const columnasPDF = [
    { label: "Tractor", key: "tractor", required: true },
    { label: "Implemento", key: "implemento", required: true },
  ];

  const googleSheetUrl =
    "https://docs.google.com/spreadsheets/d/1O1Qa4zcJ-c1mxIaRq5wDf08a6ptuvyiRzraOoxzrqQk/edit?gid=1514857302#gid=1514857302";
  const productos = useSheets(googleSheetUrl, "maquinarias");

  const fields = useMemo(() => {
    if (!productos || productos.length === 0) return [];
    console.log(productos);
    return [
      {
        key: "tractor",
        label: "Tractor",
        type: "select",
        required: true,
        options: productos.map((p) => p.nombre),
      },
      {
        key: "tractorPrecio",
        label: "Precio del Tractor",
        type: "number",
        required: true,
        value: (form) => {
          const tractor = productos.find((p) => p.nombre === form.tractor);
          return tractor?.precioUSD ?? "";
        },
        dependsOn: ["tractor"],
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
        key: "implementoPrecio",
        label: "Precio del Implemento",
        type: "number",
        required: true,
        value: (form) => {
          const tractor = productos.find((p) => p.nombre === form.tractor);
          const implemento = tractor?.implementos?.find(
            (i) => i.nombre === form.implemento
          );
          return implemento?.precioUSD ?? "";
        },
        dependsOn: ["tractor", "implemento"],
      },
      ,
    ];
  }, [productos]);



  return (
    <div className="flex justify-center w-full">
      <ModuleLayout
        titulo="Visualizador de Costos Maquinarias"
        fields={fields}
        precioCombustible={precioCombustible}
        setPrecioCombustible={setPrecioCombustible}
        calcularCosto={(form) => {
          const tractorObj = productos.find((p) => p.nombre === form.tractor);
          const implementoObj = tractorObj?.implementos.find(
            (i) => i.nombre === form.implemento
          );

          return calcularCostoTotalMaquinaria(
            {
              ...form,
              tractor: tractorObj,
              implemento: implementoObj,
            },
            precioCombustible
          );
        }}
        storageKey="maquinariasForm"
        columnasPDF={columnasPDF}
        tituloModal="Editar Maquinarias"
        type= "Costo Maquinarias"
      />
    </div>
  );
}
