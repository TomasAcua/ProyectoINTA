import { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";
import fetchDolar from "../../services/fetchDolar";
import Button from "../Button/Button";
import Input from "../Input/Input";

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
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl w-full max-w-xl text-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="text-green-600" />
        <h2 className="text-lg font-semibold">
          Cotización dólar <span className="font-bold text-green-700">OFICIAL</span> hoy:
        </h2>
      </div>

      {dolarOficial ? (
        <>
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <p className="text-xl font-bold text-green-800 mb-1">
              USD ${cantDolar} = ARS{" "}
              {dolarActual
                ? Math.round(dolarActual * cantDolar).toLocaleString("es-AR")
                : "-"}
            </p>
            <p className="text-sm text-gray-600">
              {estado === "Restaurar"
                ? "según el valor dado por el usuario"
                : "según el valor oficial del dólar"}
            </p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Dólar oficial actual:{" "}
            <span className="font-semibold">
              ${dolarOficial.toLocaleString("es-AR")}
            </span>
          </p>
        </>
      ) : (
        <p className="text-gray-400">Cargando...</p>
      )}

      <div className="grid grid-cols-4 gap-3 w-full">
        <div className="col-span-2">
          <label className="text-sm text-gray-700 block mb-1">Ingrese dólares:</label>
          <input
            type="number"
            min="1"
            className="w-full border rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={cantDolar}
            onChange={(e) => setCantDolar(e.target.value)}
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm text-gray-700 block mb-1">Personalizar:</label>
          <div className="grid grid-cols-5">
            <input
              type="number"
              min="1"
              className="col-span-3 flex border border-r-0 rounded-l-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
              placeholder={dolarOficial ? dolarOficial : "Valor dólar"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={estado === "Restaurar"}
            />
            <Button
              className="bg-emerald-600 text-white px-4 rounded-r-lg hover:bg-emerald-700 disabled:opacity-50 cursor-pointer col-span-2"
              onClick={cambiarEstado}
              disabled={estado === "Cambiar" && value === ""}
            >
              {estado}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dolar;
