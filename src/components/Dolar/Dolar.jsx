import { useEffect, useState } from "react";
import fetchDolar from "../../services/fetchDolar";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { RefreshCcw, Check } from "lucide-react";

const Dolar = ({ onDolarChange }) => {
  const [dolarOficial, setDolarOficial] = useState(null);
  const [dolarActual, setDolarActual] = useState(null);
  const [modoPersonalizado, setModoPersonalizado] = useState(false);
  const [valorInput, setValorInput] = useState("");
  const [cantDolar, setCantDolar] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDolar();
        setDolarOficial(data.venta);
        setDolarActual(data.venta);
        localStorage.setItem("dolar", data.venta);
      } catch (error) {
        console.error("Error al obtener el dólar:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (onDolarChange) onDolarChange(dolarActual);
  }, [dolarActual]);

  const manejarCambio = () => {
    if (!modoPersonalizado && valorInput) {
      const nuevoValor = Number(valorInput);
      setDolarActual(nuevoValor);
      localStorage.setItem("dolar", nuevoValor);
      setModoPersonalizado(true);
    } else {
      setDolarActual(dolarOficial);
      localStorage.setItem("dolar", dolarOficial);
      setValorInput("");
      setModoPersonalizado(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-bold text-sky-800 mb-4 text-center">
        Cotización del Dólar Oficial
      </h2>

      {dolarOficial === null ? (
        <p className="text-center text-gray-400">Cargando datos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-slate-800">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor personalizado (opcional)
            </label>
            <Input
              type="number"
              min="1"
              value={valorInput}
              onChange={(e) => setValorInput(e.target.value)}
              placeholder={`Ej: ${dolarOficial}`}
              disabled={modoPersonalizado}
            />
          </div>

          <div className="text-center">
            <Button
              className={`w-full py-3 rounded-xl font-bold text-white transition ${
                modoPersonalizado
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              onClick={manejarCambio}
              disabled={!modoPersonalizado && valorInput === ""}
            >
              {modoPersonalizado ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCcw size={18} />
                  Restaurar oficial
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Check size={18} />
                  Usar personalizado
                </div>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dolar;
