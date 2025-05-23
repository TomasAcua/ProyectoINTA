export const calcCosto = (array) => {
    let total = [];

    for (let index = 0; index < array.length; index++) {
        const precio = parseFloat(array[index].precioUnitario);
        const cantidad = parseFloat(array[index].cantidad);
        const nombre = array[index].producto;

        if (isNaN(precio) || isNaN(cantidad)) {
            console.error(`Invalid data at index ${index}:`, array[index]);
        }
        else if (precio < 0 || cantidad < 0) {
            console.error(`Negative value at index ${index}:`, array[index]);
        }else {
            total.push({nombre: nombre, total: precio * cantidad});
          
        }

    }


    return total;
}
export default calcCosto;
//Costo = cantidad producto formulado * precio = $/tratamiento ha