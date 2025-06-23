import { calcularCostoTotalMaquinaria } from "../utils/calcularCosto";
import ModuleLayout from "../components/ModuleLayout/ModuleLayout";
import useSheets from "../hooks/useSheets";
import { useMemo, useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react"
import { fetchMaquinaria } from "../services/fetchMaquinaria";
import { fetchImplementos } from "../services/fetchImplementos";



export default function CostoMaquinaria() {

  const [tractoresMockApi, setTractoresMockApi] = useState([]);
  const [implementosMockApi, setImplementosMockApi] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Tractores
        const { data: dataTractores, error: errorTractores } = await fetchMaquinaria("");
        if (!errorTractores && Array.isArray(dataTractores)) {
          const tractoresFiltrados = dataTractores.filter(p =>
            p.indicador?.toLowerCase().includes("tractor")
          );
          setTractoresMockApi(tractoresFiltrados);
        }

        //Implementos
        const { data: dataImplementos, error: errorImplementos } = await fetchImplementos("");
        if (!errorImplementos && Array.isArray(dataImplementos)) {
          setImplementosMockApi(dataImplementos);
        }

      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    };
    fetchData();
    
  }, []);


  useEffect(()=> {
    console.log("Tractores Mock API:", tractoresMockApi);
    console.log("Implementos Mock API:", implementosMockApi);
  },[tractoresMockApi, implementosMockApi])

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

  // const googleSheetUrl = "https://docs.google.com/spreadsheets/d/1O1Qa4zcJ-c1mxIaRq5wDf08a6ptuvyiRzraOoxzrqQk/edit?gid=1514857302#gid=1514857302";
  // const productos = useSheets(googleSheetUrl, "maquinarias");

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
          const tractor = tractoresMockApi.find((p) => p.indicador === form.tractor);
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
          value: p.implemento,
          label: p.implemento,
        })),
      },
      {
        key: "implementoPrecio",
        label: "Precio del Implemento",
        type: "number",
        required: true,
        value: (form) => {
          const implemento = implementosMockApi.find((p) => p.implemento === form.implemento);
          return implemento?.precio_dolar ?? "";
        },
        dependsOn: ["tractor", "implemento"],
      },
      ,
    ];
  }, [tractoresMockApi, implementosMockApi]);



  return (
    (tractoresMockApi && implementosMockApi ? (
    <div className="flex justify-center w-full">
      <ModuleLayout
        titulo="Maquinaria"
        fields={fields}
        precioCombustible={precioCombustible}
        setPrecioCombustible={setPrecioCombustible}
        calcularCosto={(form) => {
          const tractorObj = tractoresMockApi.find((p) => p.indicador === form.tractor);
          const implementoObj = implementosMockApi.find((p) => p.implemento === form.implemento);

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
        <LoaderCircle className="scale-200 animate-spin"/>
      </div>
    ))
    
  );
}
