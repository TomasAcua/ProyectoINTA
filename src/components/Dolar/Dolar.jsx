import { useEffect, useState } from "react";
import fetchDolar from "../../services/fetchDolar";

const Dolar = ({ onDolarChange }) => {
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
    <div className="bg-green-600 text-white w-[90vh] mx-auto mb-4">
      <h2>Dólar</h2>
      <div className="bg-slate-900 h-[0.2vh] w-full my-1"></div>
      <div className="flex flex-row justify-center items-center gap-10">
        <div>
          {dolarOficial ? (
            <>
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
              <p className="text-xs text-slate-200 mt-1">
                Dólar oficial actual:{" "}
                <b>${dolarOficial.toLocaleString("es-AR")}</b>
              </p>
            </>
          ) : (
            <h3 className="text-slate-400">Cargando...</h3>
          )}
        </div>
        <div className="bg-green-300 p-2 mt-2 rounded">
          <label className="block text-black text-sm mb-1">
            Ingrese dolares:
          </label>
          <input
            type="number"
            min="1"
            className="w-full text-black p-1 rounded"
            value={cantDolar}
            onChange={(e) => setCantDolar(e.target.value)}
          />
        </div>

        <div className="bg-green-300 p-2 mt-2 rounded">
          <label className="block text-black text-sm mb-1">
            Valor de dólar a usar (personalizado):
          </label>
          <input
            type="number"
            min="1"
            className="w-full text-black p-1 rounded"
            placeholder={dolarOficial ? dolarOficial : "Valor dólar"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={estado === "Restaurar"}
          />
          <button
            className="flex-1 bg-green-600 hover:bg-green-800 text-white transition duration-200 mt-2"
            onClick={cambiarEstado}
            disabled={estado === "Cambiar" && value === ""}
          >
            {estado}
          </button>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Dolar;
