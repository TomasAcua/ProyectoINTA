export function calcularCostoFertilizacion(form) {
    const dosis = parseFloat(form.dosis) || 0
    const precio = parseFloat(form.precio) || 0
    const tratamientos = parseFloat(form.tratamientos) || 0
    return dosis * precio * tratamientos
}

export function calcularCostoSanitario(form) {
    const cantidad = parseFloat(form.cantidad) || 0
    const precioUnitario = parseFloat(form.precioUnitario) || 0
    return cantidad * precioUnitario
}