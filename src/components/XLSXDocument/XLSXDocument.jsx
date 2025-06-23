import Button from "../Button/Button";
import generateSheets from "../../services/generateSheets";
import { useLocation } from "react-router-dom";

const OMITIR_CLAVES = ["errors"];

const XLSXDocument = ({ plans }) => {
  const location = useLocation().pathname;

  const handleDownload = () => {
  // Determina la clave de localStorage según la ruta
  let storageKey = "";
  if (location.includes("costo-maquinaria")) storageKey = "plansmaquinariasForm";
  else if (location.includes("costo-sanitario")) storageKey = "plansSanitario";
  else if (location.includes("fertilizacion")) storageKey = "plansproductFormsFertilization";

  // Usa los planes de props o, si están vacíos, los del localStorage
  let exportPlans = plans;
  if ((!Array.isArray(exportPlans) || exportPlans.length === 0) && storageKey) {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) exportPlans = JSON.parse(stored);
    } catch (e) {
      alert("No se pudo leer los planes del almacenamiento local.");
      return;
    }
  }

  if (!Array.isArray(exportPlans) || exportPlans.length === 0) {
    alert("No hay planes para exportar.");
    return;
  }

  const rows = [];

  exportPlans.forEach((plan) => {
    // MAQUINARIA
    if (plan.hasOwnProperty("maquinarias")) {
      plan.maquinarias.forEach((maquinaria, mIdx) => {
        const cleanMaquinaria = Object.fromEntries(
          Object.entries(maquinaria).filter(([k]) => !OMITIR_CLAVES.includes(k))
        );
        const row = {
          Plan: mIdx === 0 ? plan.name : "",
          ...cleanMaquinaria,
        };
        rows.push(row);
      });
      // Fila de costo total por plan
      const totalPlanRow = Object.fromEntries(
        Object.keys(rows[0] || {}).map((key) => [key, ""])
      );
      totalPlanRow["Costo Total Plan"] = plan.costoTotal;
      rows.push(totalPlanRow);
      rows.push({});
      return;
    }

    // SANITARIO y FERTILIZACION (ambos usan tratamientos)
    if (Array.isArray(plan.tratamientos)) {
      plan.tratamientos.forEach((tratamiento, tIdx) => {
        if (!Array.isArray(tratamiento.productos)) return;
        tratamiento.productos.forEach((producto, pIdx) => {
          const cleanProducto = Object.fromEntries(
            Object.entries(producto).filter(([k]) => !OMITIR_CLAVES.includes(k))
          );
          const row = {
            Plan: tIdx === 0 && pIdx === 0 ? plan.name : "",
            Tratamiento: pIdx === 0 ? tratamiento.name : "",
            ...cleanProducto,
          };
          rows.push(row);
        });
        // Fila de costo total por tratamiento
        const totalRow = Object.fromEntries(
          Object.keys(rows[0] || {}).map((key) => [key, ""])
        );
        totalRow["Costo Total Tratamiento"] = tratamiento.costoTotal;
        rows.push(totalRow);
        rows.push({});
      });
      // Fila de costo total por plan
      const totalPlanRow = Object.fromEntries(
        Object.keys(rows[0] || {}).map((key) => [key, ""])
      );
      totalPlanRow["Costo Total Plan"] = plan.costoTotal;
      rows.push(totalPlanRow);
      rows.push({});
    }
  });

  const headers = Object.keys(
    rows.find((row) => Object.keys(row).length > 0) || {}
  );
  const cols = headers.map((header) => {
    const contentLengths = rows.map((row) => {
      const cell = row[header];
      return cell !== undefined && cell !== null ? cell.toString().length : 0;
    });
    contentLengths.push(header.length);
    const maxContentLength = Math.max(...contentLengths);
    return { wch: Math.max(maxContentLength + 2, 12) };
  });
  console.log("rows", rows);
  console.log("cols", cols);
  generateSheets(rows, `planes${location}.xlsx`, "Planes", cols);
};

  return (
    <Button
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded ml-2"
      onClick={handleDownload}
    >
      Descargar hoja de cálculos
    </Button>
  );
};

export default XLSXDocument;
