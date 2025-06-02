import { use, useEffect, useState } from "react";
import * as XLSX from "xlsx";

//Funcion para obtener la url de exportacion
function getExportUrl(googleSheetUrl) {
  const match = googleSheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (!match) return null;
  const id = match[1];
  return `https://docs.google.com/spreadsheets/d/${id}/export?format=xlsx`;
}

const fetchSheets = (originalUrl) => {
  //Aca se obtiene la url funcional
  const sheetUrl = getExportUrl(originalUrl);
  const [sheetJson, setSheetJson] = useState(null);

  useEffect(() => {
    if (!sheetUrl) {
      setSheetJson({ error: "URL inválida" });
    
      return;
    }

    const fetchAndParse = async () => {
      try {
        const file = await (await fetch(sheetUrl)).arrayBuffer();
      
        //Se lee el archivo con la libreria de sheetsJs
        const workbook = XLSX.read(file, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];


        let json = XLSX.utils.sheet_to_json(worksheet);

        // Normaliza las claves a minúsculas
        json = json.map((obj) =>
          Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k.trim().toLowerCase(), v])
          )
        );

        setSheetJson(json);
      } catch (error) {
        throw new Error("Error al obtener o procesar la hoja de cálculo: " + error.message);
      }
    };
    fetchAndParse();
  }, [sheetUrl]);

  return sheetJson;
};
export default fetchSheets;
