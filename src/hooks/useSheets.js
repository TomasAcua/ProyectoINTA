import fetchSheets from "../services/fetchSheets";


const useSheets = (url, type) => {
  const data = fetchSheets(url);
  
  if (!data) return null;
 
  let nuevoArray = []

  switch (type) {
    case 'sanitarias': {
      let productosAntes = [];
      let productosDespues = [];
      let hoja = data;

      if (Array.isArray(hoja)) {
        const indexSeparator = hoja.findIndex((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" &&
              val.toLowerCase().includes("fungicidas")
          )
        );
        if (indexSeparator !== -1) {
          productosAntes = hoja.slice(0, indexSeparator);
          productosDespues = hoja.slice(indexSeparator + 1);
        } else {
          productosAntes = hoja;
        }
      }

        const mapProduct = (arr) =>
          Array.isArray(arr)
          ? arr
              .filter(item => item["plagas (plaguicidas)"])
              .map(item => ({

                

                value: item["plagas (plaguicidas)"],
                label: item["plagas (plaguicidas)"]
              }))
          : [];

        nuevoArray = [
          ...mapProduct(productosAntes),
          ...mapProduct(productosDespues)
        ];

     

        break;
    }

    case 'maquinarias': {

      const hoja = data;
      const tractores = hoja.filter(row =>
        typeof row["implemento"] === "string" &&
        row["implemento"].toLowerCase().includes("tractor")
      );

      const implementos = hoja.filter(row =>
        typeof row["implemento"] === "string" &&
        !row["implemento"].toLowerCase().includes("tractor")
      );

      const mapTractor = (tractorRow) => {
        const nombre = `Tractor ${tractorRow["implemento"].match(/\((.*?)\)/)?.[1] ?? ""} HP`;
        return {
          nombre,
          precioUSD: parseFloat(tractorRow["precio (dólar sin iva)"]) || 0,
          potenciaHP: parseFloat(tractorRow["implemento"].match(/\d+/)?.[0]) || 0,
          residuoPorcentaje: parseFloat(tractorRow["valor residual%"]) / 100,
          coeficienteMantenimiento: parseFloat(tractorRow["coeficiente gasto mantenimiento (1/hora)"]) || 0,
          horasUtiles: parseFloat(tractorRow["vida util (horas)"]) || 0,
          implementos: implementos.map(i => ({
            nombre: i["implemento"],
            precioUSD: parseFloat(i["precio (dólar sin iva)"]) || 0,
            coeficienteMantenimiento: parseFloat(i["coeficiente gasto mantenimiento (1/hora)"]) || 0,
            horasUtiles: parseFloat(i["vida util (horas)"]) || 0,
            consumoCombustible: parseFloat(i["consumo combustible (lt/hora cv)"]) || 0,
            valorResidualPorcentaje: parseFloat(i["valor residual%"]) / 100,
          }))
        };
      };

      nuevoArray = tractores.map(mapTractor);
      break;
    }


    case 'fertilizantes': {
      
      
      const mapProduct = (arr) =>
          Array.isArray(arr)
            ? arr
                .filter(item => item["principio activo"])
                .map(item => ({
                  producto: item["principio activo"]
                }))
            : [];

        
        nuevoArray = [
          ...mapProduct(data)
        ];

    }

    default:
  
  }
  return nuevoArray
};

export default useSheets;