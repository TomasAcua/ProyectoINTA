
import { useEffect, useState } from "react";
import ListaDesplegable from "../ListaDesplegable/ListaDesplegable";
import Button from "../Button/Button";
import { maquinas } from "../../assets/resources/maquinarias";
import { calcularCostoTotalMaquinaria } from "../../assets/functions/CalcularCostoMaquinaria";
import useFormulario from "../../hooks/useForm";

const FormularioMaquinaria = ({ formId, costoTotalMaquinarias, onCalculoRealizado, setCostoTotalMaquinarias, onEliminar, precioCombustible, onActualizarFormulario }) => {
const datosGuardados = JSON.parse(localStorage.getItem("maquinariaFormulario") || "{}");
const datosPrevios = datosGuardados[formId];
const initialForm = datosPrevios ? datosPrevios.form : { tractor: "", implemento: "" , totalMaquinaria: ""};

  const {
    form,
    actualizarCampo,
    calcularCostoTotal,
    costoTotal,
    mensaje,
    mostrarMensaje,

  } = useFormulario({
    formId,
    initialForm,
    setCostoTotalMaquinarias,
    onCalcularCosto: (form) => {const resultado = calcularCostoTotalMaquinaria({ ...form, precioCombustible });
 if (!resultado.error) {
    onCalculoRealizado?.(); 
    const formConTotal = { ...form, totalMaquinaria: resultado.costoTotal };

    // Actualizá el formulario padre con el nuevo total
    onActualizarFormulario?.(formConTotal);
  }
  mostrarMensaje()
  return resultado;},
  });
   

  const [implementosDisponibles, setImplementosDisponibles] = useState([]);

  useEffect(() => {
    const tractorSeleccionado = maquinas.find((m) => m.nombre === form.tractor);
    if (tractorSeleccionado) {
      setImplementosDisponibles(tractorSeleccionado.implementos);
    } else {
      setImplementosDisponibles([]);
    }
  }, [form.tractor]);
  

  useEffect(() => {
  onActualizarFormulario?.(form); 
}, [form]);


  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl mx-auto space-y-8 px-5">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Formulario de Costo Maquinaria
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ListaDesplegable
          text="Tractor"
          name="tractor"
          id="tractor"
          array={maquinas.map((t) => t.nombre)}
          value={form.tractor}
          onChange={(e) => actualizarCampo("tractor", e.target.value)}
        />

        <ListaDesplegable
          text="Implemento"
          name="implemento"
          id="implemento"
          array={implementosDisponibles.map((i) => i.nombre)}
          value={form.implemento}
          onChange={(e) => actualizarCampo("implemento", e.target.value)}
          disabled={!form.tractor}
        />
      </div>

      <div className="text-center">
        <button
          onClick={calcularCostoTotal}
          
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Calcular Costo Total
        </button>
      </div>

      {mensaje && (
        <p className="text-center text-red-600 font-semibold">{mensaje}</p>
      )}

      {costoTotal !== null && (
        <p className="mt-6 text-center text-lg font-semibold text-gray-700">
          Costo total: ${Math.round(costoTotal).toLocaleString("es-AR", {
              maximumFractionDigits: 2,
            })}{" "}
        </p>
      )}

      <Button
        className={
          "flex items-center gap-x-2 bg-red-700 hover:bg-red-600 text-white font-medium rounded-xl px-5 py-2 shadow  transition cursor-pointer"
        }
        onClick={onEliminar}
      >
        <span>Eliminar Formulario</span>
      </Button>
    </div>
  );
};

export default FormularioMaquinaria;
