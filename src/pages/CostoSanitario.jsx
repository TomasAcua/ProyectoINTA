import ModuleLayout from "../components/ModuleLayout/ModuleLayout";
import { FIELDS_COSTO_SANITARIO as BASE_FIELDS } from "../consts/costoSanitario";
import { useMemo, useEffect, useState } from "react";
import { calcularCostoSanitario } from "../utils/calcularCosto";
import { fetchProductos } from "../services/fetchProductos";

import "../App.css";
import { LoaderCircle } from "lucide-react";

function CostoSanitario() {
  const tokenProductos = import.meta.env.VITE_API_TOKEN_PRODUCTOS;
  const [productosMockApi, setProductosMockApi] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await fetchProductos(tokenProductos);

        if (!error && data) {
          // Filtra por rubro
          const productosFiltrados = Object.values(data).filter(
            (p) => p.rubro && p.rubro.toLowerCase().includes("sanidad")
          );
          setProductosMockApi(productosFiltrados);
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
    { label: "Volumen", key: "volumen", required: true },
    { label: "Precio Unitario", key: "precioUnitario", required: true },
  ];

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
            const prod = productosMockApi.find(
              (p) => p.indicador === form.producto
            );
            // Mapeo para que coincida con las opciones del select
            if (!prod?.unidad) return "";
            if (prod.unidad.toLowerCase().includes("kilo")) return "Kilogramos";
            if (prod.unidad.toLowerCase().includes("litro")) return "Litros";
            if (prod.unidad.toLowerCase().includes("cc")) return "cc";
            if (prod.unidad.toLowerCase().includes("unidad")) return "unidad";
            return prod.unidad;
          },
          dependsOn: ["producto"],
        };
      }
      if (field.key === "precioUnitario") {
        return {
          ...field,
          value: (form) => {
            const prod = productosMockApi.find(
              (p) => p.indicador === form.producto
            );
            return prod?.precio || "";
          },
          dependsOn: ["producto"],
        };
      }
      if (field.key === "volumen") {
        return {
          ...field,
          value: (form) => {
            const prod = productosMockApi.find(
              (p) => p.indicador === form.producto
            );
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
