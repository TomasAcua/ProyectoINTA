import ModuleLayout from "../components/ModuleLayout/ModuleLayout";
import { FIELDS_COSTO_SANITARIO as BASE_FIELDS } from "../consts/costoSanitario";
import { useMemo, useEffect, useState } from "react";
import { calcularCostoSanitario } from "../utils/calcularCosto";
import { fetchProductos } from "../services/fetchProductos";

// import useSheets from "../hooks/useSheets";
import "../App.css";
import { LoaderCircle } from "lucide-react";

function CostoSanitario() {
  
  const [productosMockApi, setProductosMockApi] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await fetchProductos("", "Sanitarios");
        console.log("dataMockApi", data);
        if (!error && Array.isArray(data)) {
          setProductosMockApi(data);
        }
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    };
    fetchData();
  }, []);

  const columnasPDF = [
    { label: "Producto", key: "producto", required: true },
    { label: "Unidad", key: "unidad", required: true },
    { label: "Dosis", key: "dosis", required: true },
    { label: "Precio Unitario", key: "precioUnitario", required: true },
  ];
  // const googleSheetUrl =
  //   "https://docs.google.com/spreadsheets/d/1sYafPrjzV5WdhpW1JOZw3FoiZbHiDqDHz_F7ayCL_Sw/edit?gid=1418408786#gid=1418408786";
  // const productos = useSheets(googleSheetUrl, "sanitarias");
  
  // console.log("productosSheets", productos);

  const fields = useMemo(() => {
    if (!productosMockApi || productosMockApi.length === 0) return BASE_FIELDS;

    return BASE_FIELDS.map((field) => {
      if (field.key === "producto") {
        return {
          ...field,
          options: productosMockApi.map((p) => ({
            value: p.indicador,
            label: p.indicador,
          })),
        };
      }
      if (field.key === "unidad") {
        return {
          ...field,
          value: (form) => {
            const prod = productosMockApi.find((p) => p.indicador === form.producto);
            return prod?.unidad || "";
          },
          dependsOn: ["producto"]
        };
      }
      if (field.key === "precioUnitario") {
        return {
          ...field,
          value: (form) => {
            const prod = productosMockApi.find((p) => p.indicador === form.producto);
            return prod?.precio || "";
          },
          dependsOn: ["producto"],
        };
      }
      if (field.key === "volumen") {
        return {
          ...field,
          value: (form) => {
            const prod = productosMockApi.find((p) => p.indicador === form.producto);
            return prod?.volumen || "";
          },
          dependsOn: ["producto"],
        };
      }
      return field;
    });
  }, [productosMockApi]);

  return productosMockApi ? (
    <div className="flex justify-center w-full">
      <ModuleLayout
        titulo="Planes Fitosanitarios"
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
  );
}

export default CostoSanitario;
