import { FIELDS_FERTILIZATION as BASE_FIELDS } from "../consts/fertilization";
import { calcularCostoFertilizacion } from "../utils/calcularCosto";
import ModuleLayout from "../components/ModuleLayout/ModuleLayout";
import { useMemo, useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { fetchProductos } from "../services/fetchProductos";

const columnasPDF = [
  { label: "Producto", key: "producto" },
  { label: "Unidad", key: "unidad" },
  { label: "Dosis", key: "dosis" },
  { label: "Presentación", key: "presentacion" },
  { label: "Precio", key: "precio" },
  { label: "Tratamientos", key: "tratamientos" },
  { label: "Costo", key: "costo" },
];

export default function Fertilizacion() {
  const [productosMockApi, setProductosMockApi] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await fetchProductos(
          "534950414e2e50726f647563746f7340316e643163346430723373"
        );
        if (!error && data) {
          const productosFiltrados = Object.values(data).filter(
            (p) => p.rubro && p.rubro.toLowerCase().includes("fertilizante")
          );
          setProductosMockApi(productosFiltrados);
        }
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    };
    fetchData();
  }, []);

//   useEffect(() => {
//     console.log("productosMockapi", productosMockApi);
//   }, [productosMockApi]);

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
      if (field.key === "unidad") {
        return {
          ...field,
          value: (form) => {
            const prod = productosMockApi.find(
              (p) => p.indicador === form.producto
            );
            if (!prod?.unidad) return "";
            if (prod.unidad.toLowerCase().includes("kilo")) return "Kilogramos";
            if (prod.unidad.toLowerCase().includes("litro")) return "Litros";
            return prod.unidad;
          },
          dependsOn: ["producto"],
        };
      }
      if (field.key === "presentacion") {
        return {
          ...field,
          value: (form) => {
            const prod = productosMockApi.find(
              (p) => p.indicador === form.producto
            );
            return prod?.volumen ?? "";
          },
          dependsOn: ["producto"],
        };
      }
      if (field.key === "precioUnitario" || field.key === "precio") {
        return {
          ...field,
          value: (form) => {
            const prod = productosMockApi.find(
              (p) => p.indicador === form.producto
            );
            return prod?.precio ?? "";
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
        titulo="Planes de Fertilización"
        fields={fields}
        calcularCosto={calcularCostoFertilizacion}
        storageKey="productFormsFertilization"
        columnasPDF={columnasPDF}
        tituloModal="Editar Fertilización"
      />
    </div>
  ) : (
    <div className="h-[80vh] flex items-center justify-center">
      <LoaderCircle className="scale-200 animate-spin" />
    </div>
  );
}
