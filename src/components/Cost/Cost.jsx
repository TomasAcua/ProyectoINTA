import { useEffect, useState } from "react";
import calcCost from "../../assets/functions/calcCost";

const Cost = ({ products, setCostoTotal, dolar }) => {
  let value = calcCost(products);
  const [total, setTotal] = useState(0);
  const [argValue, setArgValue] = useState(0);

  // Obtiene el costo total de los productos en USD
  useEffect(() => {
    const totalUSD = value.reduce((acc, item) => acc + item.total, 0);
    setTotal(totalUSD);
    setCostoTotal(totalUSD);
  }, [value, setCostoTotal]);

  // Obtiene el valor en pesos argentinos usando el prop dolar
  useEffect(() => {
    setArgValue(total * dolar);
  }, [total, dolar]);

  return (
    <div className="bg-darkPrimary text-white py-2">
      <div>
        {argValue ? (
          <h3 className="text-slate-900">
            USD $
            {Math.round(total).toLocaleString("es-AR", {
              maximumFractionDigits: 2,
            })}{" "}
            / ARS $
            {argValue.toLocaleString("es-AR", { maximumFractionDigits: 2 })}
          </h3>
        ) : (
          <h3 className="text-slate-400">Cargando...</h3>
        )}
      </div>
    </div>
  );
};

export default Cost;