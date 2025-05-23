import { useEffect, useState } from "react";
import calcCosto from "../../assets/functions/calcCosto";

const Costo = ({ productos }) => {
  let value = calcCosto(productos);
  const dolar = localStorage.getItem("dolar");
  const [total, setTotal] = useState(0);
  const [argValue, setArgValue] = useState(0);


  useEffect(() => {
    const totalUSD = value.reduce((acc, item) => acc + item.total, 0)
    setTotal(totalUSD);

    setArgValue(total * dolar);
  }, [dolar, value]);

  return (
    <div className="bg-darkPrimary text-white py-2">
      <h2 className="">Costo Total</h2>

      <div className="bg-slate-900 h-[0.2vh] w-full my-1"></div>

    {/* Esto es de prueba, eliminar luego */}
      <div className="">
        {total ? (
          <div className="">
            {value.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 px-4 border-b border-slate-700"
                >
                  <h3 className="text-slate-400">{item.nombre}</h3>
                  <h3 className="text-slate-400">
                    USD $
                    {Math.round(item.total).toLocaleString("es-AR", {
                      maximumFractionDigits: 2,
                    })}
                  </h3>
                </div>
              );
            })}
          </div>
        ) : (
          <h3 className="text-slate-400">Cargando...</h3>
        )}

        {argValue ? (
          <h3>
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

export default Costo;
