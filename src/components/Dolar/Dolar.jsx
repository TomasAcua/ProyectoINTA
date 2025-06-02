import { useEffect, useState } from "react";
import fetchDolar from "../../services/fetchDolar";
import Input from "../Input/Input"
import Button from "../Button/Button";

const Dolar = ({ onDolarChange, title }) => {
  const [dolarOficial, setDolarOficial] = useState(null);
  const [dolarActual, setDolarActual] = useState(null);
  const [estado, setEstado] = useState("Cambiar");
  const [value, setValue] = useState("");
  const [cantDolar, setCantDolar] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDolar();
        setDolarOficial(data.venta);
        setDolarActual(data.venta);
        localStorage.setItem("dolar", data.venta);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setEstado("Cambiar");
  }, []);

  useEffect(() => {
    if (onDolarChange) onDolarChange(dolarActual);
  }, [dolarActual, onDolarChange]);

  const cambiarEstado = () => {
    if (estado === "Cambiar" && value !== "") {
      setEstado("Restaurar");
      setDolarActual(Number(value));
      localStorage.setItem("dolar", value);
    } else if (estado === "Restaurar") {
      setEstado("Cambiar");
      setDolarActual(dolarOficial);
      setValue("");
      localStorage.setItem("dolar", dolarOficial);
    }
  };

  return (
    <div className="text-slate-900 w-full rounded-t-xl overflow-hidden">
      <div className="flex flex-row justify-start font-semibold">
        <h2>Cotización Dólar Oficial HOY</h2>
      </div>
      <div className="flex flex-row justify-center items-center gap-10 w-full p-2 ">

        <div className="w-1/3">
          {dolarOficial ? (
            <div className={'flex flex-col justify-center items-center w-[80%]'}>
              
              <div className="">
                <h3>
                USD $ {cantDolar} = ARS{" "}
                {dolarActual
                  ? Math.round(dolarActual * cantDolar).toLocaleString("es-AR")
                  : "-"}{" "}
                <span className="text-xs">
                  {estado === "Restaurar"
                    ? "según el valor dado por el usuario"
                    : "según el valor oficial del dólar"}
                </span>
              </h3>
              </div>
              <div className="">
                <p className="text-xs text-slate-900 mt-1">
                  Dólar oficial actual:{" "}
                  <b>${dolarOficial.toLocaleString("es-AR")}</b>
                </p>
              </div>
              
            </div>
          ) : (
            <h3 className="text-slate-400">Cargando...</h3>
          )}


        </div>

        {/* Cambio de estado */}
        <div className="p-2 rounded-xl w-1/3">
          <label className="block text-black text-sm mb-1">
            Valor de dólar a usar (personalizado):
          </label>
          <Input
            type="number"
            min="1"
           
            placeholder={dolarOficial ? dolarOficial : "Valor dólar"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={estado === "Restaurar"}
          />
          
        </div>


        <div className="w-1/3">
          <Button
            className="flex-1 w-full rounded-xl bg-green-600 text-white font-bold transition duration-200 py-3"
            onClick={cambiarEstado}
            disabled={estado === "Cambiar" && value === ""}
          >
            {estado}
          </Button>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Dolar;
