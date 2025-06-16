import * as XLSX from "xlsx";

/**
 * Genera y descarga un archivo XLSX a partir de un array de objetos planos.
 * @param {Array} rows - Filas a exportar (array de objetos).
 * @param {string} filename - Nombre del archivo a descargar.
 * @param {string} [sheetName="Hoja1"] - Nombre de la hoja.
 * @param {Array} [cols] - Ancho de columnas (opcional).
 */
const generateSheets = (rows, filename = "planes.xlsx", sheetName = "Hoja1", cols) => {
  if (!rows || !Array.isArray(rows) || rows.length === 0) return;

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);

  if (cols) {
    worksheet['!cols'] = cols;
  }

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, filename, { compression: true });
};

export default generateSheets;