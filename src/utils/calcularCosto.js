import { maquinas } from "../assets/resources/maquinas"

export function calcularCostoFertilizacion(form) {
    const dosis = parseFloat(form.dosis) || 0
    const precio = parseFloat(form.precio) || 0
    const tratamientos = parseFloat(form.tratamientos) || 0
    return dosis * precio * tratamientos
}

export function calcularCostoSanitario(form) {
  const dosis = parseFloat(form.dosis) || 0;
  const volumen = parseFloat(form.volumen) || 0;
  const precio = parseFloat(form.precioUnitario) || 0;
  const tratamientos = parseFloat(form.tratamientos) || 0
  const cantidad = dosis * volumen;
  return cantidad * precio * tratamientos;
}

export const calcularCostoTotalMaquinaria = (form) => {
    const tractor = form.tractor;
    const implemento = form.implemento;
    const precioCombustible = form.precioCombustible
  // const { tractor, implemento, precioCombustible } = form;


  const tractorSeleccionado = maquinas.find(m => m.nombre === tractor);
  const implementoSeleccionado = tractorSeleccionado?.implementos.find(i => i.nombre ===implemento);


 if (!tractorSeleccionado || !implementoSeleccionado) return 0;

  const gastoCombustible =
    tractorSeleccionado.potenciaHP *
    implementoSeleccionado.consumoCombustible *
    parseFloat(precioCombustible);
    
   


  const amortizacion = (precio, porcentajeResidual, horas) =>
    (precio - precio * porcentajeResidual) / horas;

  const mantenimiento = (precio, coef) => precio * coef;
  const costoTotal =
    gastoCombustible +
    mantenimiento(tractorSeleccionado.precioUSD, tractorSeleccionado.coeficienteMantenimiento) +
    mantenimiento(implementoSeleccionado.precioUSD, implementoSeleccionado.coeficienteMantenimiento) +
    amortizacion(tractorSeleccionado.precioUSD, tractorSeleccionado.residuoPorcentaje, tractorSeleccionado.horasUtiles) +
    amortizacion(implementoSeleccionado.precioUSD, implementoSeleccionado.valorResidualPorcentaje, implementoSeleccionado.horasUtiles);
   
  return costoTotal;
};
