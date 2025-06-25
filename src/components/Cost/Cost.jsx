import { useEffect, useState } from "react";
import calcCost from "../../assets/functions/calcCost";

const Cost = ({ products, costoMaquinaria, setCostoTotal, dolar }) => {
  const [totalUSD, setTotalUSD] = useState(0);
  const [argValue, setArgValue] = useState(0);

  useEffect(() => {
    let total = 0;

    if (products && products.length > 0) {
      const result = calcCost(products); 
      total = result.reduce((acc, item) => acc + (item.total || 0), 0);
    } else if (costoMaquinaria ) {
      total = costoMaquinaria;
    }

    setTotalUSD(total);
    if (setCostoTotal) setCostoTotal(total);
  }, [products, costoMaquinaria, setCostoTotal]);

  useEffect(() => {
    setArgValue(totalUSD * dolar);
  }, [totalUSD, dolar]);

  return (
    <div className="bg-darkPrimary text-white py-2">
      <div>
        {argValue ? (
          <h3 className="text-slate-900">
            USD $
            {Math.round(totalUSD).toLocaleString("es-AR", {
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
