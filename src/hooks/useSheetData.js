import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

// Convierte la URL al formato de exportación
function getExportUrl(googleSheetUrl) {
  const match = googleSheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (!match) return null;
  const id = match[1];
  return `https://docs.google.com/spreadsheets/d/${id}/export?format=xlsx`;
}

// Hook que trae los datos del Excel como JSON
export function useSheetData(googleSheetUrl) {
  const [sheetData, setSheetData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sheetUrl = getExportUrl(googleSheetUrl);
    if (!sheetUrl) {
      setError("URL inválida");
      return;
    }

    const fetchAndParse = async () => {
      try {
        const file = await (await fetch(sheetUrl)).arrayBuffer();
        const workbook = XLSX.read(file, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        let json = XLSX.utils.sheet_to_json(worksheet);

        json = json.map((obj) =>
          Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k.trim().toLowerCase(), v])
          )
        );

        setSheetData(json);
      } catch (err) {
        setError("Error al obtener o procesar la hoja de cálculo: " + err.message);
      }
    };

    fetchAndParse();
  }, [googleSheetUrl]);

  return { sheetData, error };
}