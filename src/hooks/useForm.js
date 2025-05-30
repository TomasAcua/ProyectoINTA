import { useState, useEffect } from "react";

const useFormulario = ({ formId, initialForm,  onCalcularCosto  }) => {
  const [form, setForm] = useState(initialForm);
  const [mensaje, setMensaje] = useState("");
  const [costoTotal, setCostoTotal] = useState(0);

  // Actualizar campo del formulario
  const actualizarCampo = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  // Calcular costo total
  const calcularCostoTotal = () => {
    const resultado = onCalcularCosto(form);
    if (resultado.error) {
          setMensaje("No se pudo calcular el costo.");
    } else {
      setCostoTotal(resultado.costoTotal);
      setMensaje("Calculado con éxito");

    }
  };
 const mostrarMensaje = (msg) => {
    setMensaje(msg);
    setTimeout(() => setMensaje(""), 2000);
  };
  return {
    form,
    actualizarCampo,
    calcularCostoTotal,
    costoTotal,
    mensaje,
    setMensaje,
    setForm, 
    mostrarMensaje
  };
};

export default useFormulario;
