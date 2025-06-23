import {FIELDS_FERTILIZATION as BASE_FIELDS} from "../consts/fertilization";
import {calcularCostoFertilizacion} from "../utils/calcularCosto";
import ModuleLayout from "../components/ModuleLayout/ModuleLayout";
// import useSheets from "../hooks/useSheets";
import {useMemo, useState, useEffect} from "react";
import {LoaderCircle} from "lucide-react"
import { fetchProductos } from "../services/fetchProductos";

const columnasPDF = [
    {label: "Producto", key: "producto"},
    {label: "Unidad", key: "unidad"},
    {label: "Dosis", key: "dosis"},
    {label: "Presentación", key: "presentacion"},
    {label: "Precio", key: "precio"},
    {label: "Tratamientos", key: "tratamientos"},
    {label: "Costo", key: "costo"}
];

export default function Fertilizacion() {

    const [productosMockApi, setProductosMockApi] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const { data, error } = await fetchProductos("", "Fertilizantes");
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

    // const googleSheetUrl = "https://docs.google.com/spreadsheets/d/1hVKkRCa5wYUK0JVyEUqU0y0zcAdjZtwVAJ2MqrK1tQw/edit?gid=1018747124#gid=1018747124";
    // const productos = useSheets(googleSheetUrl, "fertilizantes");

    const fields = useMemo(() => {
        if (!productosMockApi || productosMockApi.length === 0) return BASE_FIELDS;
        return BASE_FIELDS.map((field) => {
            if (field.key === "producto") {
                return {
                    ...field,
                    options: productosMockApi.map(p => ({
                        value: p.indicador,
                        label: p.indicador
                    }))
                };
            }
            if (field.key === "precioUnitario") {
                return {
                    ...field,
                    value:(form) => {
                    const prod = productosMockApi.find(p => p.indicador === form.producto);
                    return prod?.precio || "";
                    },
                    dependsOn: ["producto"]
                }
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
            if (field.key === "presentacion") {
                return {
                    ...field,
                    value: (form) => {
                        const prod = productosMockApi.find(p => p.indicador === form.producto);
                        return prod?.volumen ?? "";
                    },
                    dependsOn: ["producto"]
                }
            }
            if (field.key === "precioUnitario" || field.key === "precio") {
                return {
                    ...field,
                    value: (form) => {
                        const prod = productosMockApi.find(p => p.indicador === form.producto);
                        return prod?.precio ?? "";
                    },
                    dependsOn: ["producto"]
                }
            }
            return field;
        });
    }, [productosMockApi]);


    return (
        (productosMockApi ? (
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
                <LoaderCircle className="scale-200 animate-spin"/>
            </div>
        ))

    );
}