// src/utils/calculosMaquinaria.js

import { maquinas } from "../resources/maquinarias";

export const calcularCostoTotalMaquinaria = (formData) => {
  const tractor = maquinas.find((m) => m.nombre === formData.tractor);
  const implemento = tractor?.implementos.find((i) => i.nombre === formData.implemento);

  if (!tractor || !implemento || !formData.precioCombustible) {
    return { error: "Por favor completa todos los campos." };
  }

  const gastoCombustible =
    tractor.potenciaHP *
    implemento.consumoCombustible *
    parseFloat(formData.precioCombustible);

  const amortizacion = (precio, porcentajeResidual, horas) => {
    return (precio - precio * porcentajeResidual) / horas;
  };

  const mantenimiento = (precio, coef) => precio * coef;

  const costoTotal =
    gastoCombustible +
    mantenimiento(tractor.precioUSD, tractor.coeficienteMantenimiento) +
    mantenimiento(implemento.precioUSD, implemento.coeficienteMantenimiento) +
    amortizacion(tractor.precioUSD, tractor.residuoPorcentaje, tractor.horasUtiles) +
    amortizacion(implemento.precioUSD, implemento.valorResidualPorcentaje, implemento.horasUtiles);

  return { costoTotal };
};
