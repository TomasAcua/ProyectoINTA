import Button from "../Button/Button";

const Product = ({ object, onClickEdit, onEliminar }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-7  gap-4 px-4 py-3 text-sm text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-200">
            <span className="col-span-1">
                <span className="sm:hidden font-semibold block">Producto: </span>
                {object.producto}
            </span>
            <span className="col-span-1">
                <span className="sm:hidden font-semibold block">Dosis: </span>
                {object.dosis}
            </span>
            <span className="col-span-1">
                <span className="sm:hidden font-semibold block">Volumen: </span>
                {object.volumen}
            </span>
            <span className="col-span-1">
                <span className="sm:hidden font-semibold block">Unidad: </span>
                {object.unidad}
            </span>
            <span className="col-span-1">
                <span className="sm:hidden font-semibold block">Cantidad/ha: </span>
                {object.cantidad} {object.unidad}/ha
            </span>
            <span className="text-green-600 font-medium col-span-1">
                <span className="sm:hidden font-semibold block">Precio Unitario: </span>
                ${object.precioUnitario}
            </span>
            <div className="flex sm:flex-col flex-row gap-2 justify-start sm:justify-center sm:items-start">
                <Button
                    className="bg-sky-600 text-white px-2 py-1 rounded text-xs"
                    onClick={onClickEdit}
                >
                    Editar
                </Button>
                <Button
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                    onClick={onEliminar}
                >
                    Eliminar
                </Button>
            </div>
        </div>
    );
};

export default Product;
