import { calcularCostoTotalMaquinaria } from "../utils/calcularCosto";
import ModuleLayout from "../components/ModuleLayout/ModuleLayout";
import { useMemo, useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { fetchMaquinaria } from "../services/fetchMaquinaria";

export default function CostoMaquinaria() {
  const [tractoresMockApi, setTractoresMockApi] = useState([]);
  const [implementosMockApi, setImplementosMockApi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await fetchMaquinaria(
          "534950414e2e4d617175696e6172696140316e643163346430723373"
        );
        if (!error && data) {
          const arr = Object.values(data);

          // Filtrar tractores e implementos según el nombre
          setTractoresMockApi(
            arr.filter((p) => p.indicador?.toLowerCase().includes("tractor"))
          );
          setImplementosMockApi(
            arr.filter((p) => !p.indicador?.toLowerCase().includes("tractor"))
          );
        }
      } catch (error) {
        console.error("Error fetching maquinaria:", error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("Tractores Mock API:", tractoresMockApi);
  //   console.log("Implementos Mock API:", implementosMockApi);
  // }, [tractoresMockApi, implementosMockApi]);

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


  const fields = useMemo(() => {
    if (!tractoresMockApi.length || !implementosMockApi.length) return [];

    return [
      {
        key: "tractor",
        label: "Tractor",
        type: "select",
        required: true,
        options: tractoresMockApi.map((p) => ({
          value: p.indicador,
          label: p.indicador,
        })),
      },
      {
        key: "tractorPrecio",
        label: "Precio del Tractor",
        type: "number",
        required: true,
        value: (form) => {
          const tractor = tractoresMockApi.find(
            (p) => p.indicador === form.tractor
          );
          return tractor?.precio ?? "";
        },
        dependsOn: ["tractor"],
      },
      {
        key: "implemento",
        label: "Implemento",
        type: "select",
        required: true,
        options: implementosMockApi.map((p) => ({
          value: p.indicador,
          label: p.indicador,
        })),
      },
      {
        key: "implementoPrecio",
        label: "Precio del Implemento",
        type: "number",
        required: true,
        value: (form) => {
          const implemento = implementosMockApi.find(
            (p) => p.indicador === form.implemento
          );
          return implemento?.precio ?? "";
        },
        dependsOn: ["tractor", "implemento"],
      },
      ,
    ];
  }, [tractoresMockApi, implementosMockApi]);

  return tractoresMockApi && implementosMockApi ? (
    <div className="flex justify-center w-full">
      <ModuleLayout
        titulo="Maquinaria"
        fields={fields}
        precioCombustible={precioCombustible}
        setPrecioCombustible={setPrecioCombustible}
        calcularCosto={(form) => {
          const tractorObj = tractoresMockApi.find(
            (p) => p.indicador === form.tractor
          );
          const implementoObj = implementosMockApi.find(
            (p) => p.indicador === form.implemento
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
        type="Costo Maquinarias"
      />
    </div>
  ) : (
    <div className="h-[80vh] flex items-center justify-center">
      <LoaderCircle className="scale-200 animate-spin" />
    </div>
  );
}
