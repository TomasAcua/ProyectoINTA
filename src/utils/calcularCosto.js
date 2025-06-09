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
  const cantidad = dosis * volumen;
  return cantidad * precio ;
}

export const calcularCostoTotalMaquinaria = (form, precioCombustibleGlobal) => {
  console.log("Form en CalcularCostoMaquinaria:", form )
    const tractor = form.tractor;
    const implemento = form.implemento;
    const precioCombustible = parseFloat(precioCombustibleGlobal)
  // const { tractor, implemento, precioCombustible } = form;


  console.log("tractor:", tractor);
 if (!tractor || !implemento) return 0;

  const gastoCombustible =
    tractor.potenciaHP *
    implemento.consumoCombustible *
    parseFloat(precioCombustible);
    
   

const tractorPrecio = parseFloat(form.tractorPrecio);
const implementoPrecio = parseFloat(form.implementoPrecio)
  const amortizacion = (precio, porcentajeResidual, horas) =>
    (precio - precio * porcentajeResidual) / horas;

  const mantenimiento = (precio, coef) => precio * coef;
  const costoTotal =
    gastoCombustible +
    mantenimiento(tractorPrecio, tractor.coeficienteMantenimiento) +
    mantenimiento(implementoPrecio, implemento.coeficienteMantenimiento) +
    amortizacion(tractorPrecio, tractor.residuoPorcentaje, tractor.horasUtiles) +
    amortizacion(implementoPrecio, implemento.valorResidualPorcentaje, implemento.horasUtiles);
   
  return costoTotal;
};
