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
  console.log("Form en CalcularCostoMaquinaria:", form )
    const tractor = form.tractor;
    const implemento = form.implemento;
    const precioCombustible = form.precioCombustible
  // const { tractor, implemento, precioCombustible } = form;


  console.log("tractor:", tractor);
 if (!tractor || !implemento) return 0;

  const gastoCombustible =
    tractor.potenciaHP *
    implemento.consumoCombustible *
    parseFloat(precioCombustible);
    
   


  const amortizacion = (precio, porcentajeResidual, horas) =>
    (precio - precio * porcentajeResidual) / horas;

  const mantenimiento = (precio, coef) => precio * coef;
  const costoTotal =
    gastoCombustible +
    mantenimiento(tractor.precioUSD, tractor.coeficienteMantenimiento) +
    mantenimiento(implemento.precioUSD, implemento.coeficienteMantenimiento) +
    amortizacion(tractor.precioUSD, tractor.residuoPorcentaje, tractor.horasUtiles) +
    amortizacion(implemento.precioUSD, implemento.valorResidualPorcentaje, implemento.horasUtiles);
   
  return costoTotal;
};
