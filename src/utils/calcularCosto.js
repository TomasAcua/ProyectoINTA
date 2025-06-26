// import { maquinas } from "../assets/resources/maquinas"

export function calcularCostoFertilizacion(form) {
    const dosis = parseFloat(form.dosis) || 0
    const precio = parseFloat(form.precio) || 0
    const tratamientos = 1
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


  const tractor = form.tractor && {
    ...form.tractor,
    potenciaHP: form.tractor.potenciaHP ?? form.tractor.potencia_hp ?? 0,
    coeficienteMantenimiento: form.tractor.coeficienteMantenimiento ?? form.tractor.coeficiente ?? 0,
    residuoPorcentaje: form.tractor.residuoPorcentaje ?? (form.tractor.valorresidual ? (form.tractor.valorresidual / form.tractor.precio) : 0),
    horasUtiles: form.tractor.horasUtiles ?? form.tractor.vidautil ?? 1,
  };
    
    const implemento = form.implemento && {
    ...form.implemento,
    consumoCombustible: form.implemento.consumoCombustible ?? 1, // Si no hay dato, pon 1 o el valor correcto
    coeficienteMantenimiento: form.implemento.coeficienteMantenimiento ?? form.implemento.coeficiente_mantenimiento ?? 0,
    valorResidualPorcentaje: form.implemento.valorResidualPorcentaje ?? (
      typeof form.implemento.valor_residual === "string"
        ? parseFloat(form.implemento.valor_residual) / 100
        : 0
    ),
    horasUtiles: form.implemento.horasUtiles ?? form.implemento.vida_util_horas ?? 1,
  };
  
    const precioCombustible = parseFloat(precioCombustibleGlobal)
  // const { tractor, implemento, precioCombustible } = form;


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
