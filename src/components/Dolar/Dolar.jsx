import { useEffect } from "react"
import { RefreshCcw, Check, Calculator } from "lucide-react"
import Input from "../Input/Input"
import Button from "../Button/Button"
import Badge from "../Badge/Badge"
import useCalculoValor from "../../hooks/useCalculoValor"

const Dolar = ({ onDolarChange }) => {
  const {
    dolarOficial,
    dolarActual,
    modoPersonalizado,
    valorInput,
    setValorInput,
    manejarCambio,
  } = useCalculoValor()

  useEffect(() => {
    if (onDolarChange) onDolarChange(dolarActual)
  }, [dolarActual])

  return (
    <div className="p-4 w-full bg-white rounded">
      <div className="flex items-center justify-start gap-2 ">
        <div className="flex justify-center items-center rounded-lg p-2 bg-sipan-green text-white">
          <Calculator />
        </div>
        <h2 className="text-lg font-bold ">Cotización del Dólar Oficial</h2>
      </div>

      {dolarOficial === null ? (
        <p className="text-center text-gray-400">Cargando datos...</p>
      ) : (
        <div className="flex flex-col gap-6 text-slate-800 w-full">
          <div>
            <div className="flex flex-row items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Valor personalizado
              </label>
              <Badge variant={modoPersonalizado ? "active" : "disabled"}>
                {modoPersonalizado ? "Personalizado" : "Oficial"}
              </Badge>
            </div>
            <Input
              type="number"
              min="1"
              value={valorInput}
              onChange={(e) => setValorInput(e.target.value)}
              placeholder={`Ej: ${dolarOficial}`}
              disabled={modoPersonalizado}
              bgColor="blue-200"
            />
          </div>

          <div className="text-center">
            <Button
              className={`w-full py-2 rounded-xl font-bold text-white transition ${
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
  )
}

export default Dolar