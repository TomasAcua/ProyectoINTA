export const FIELDS_COSTO_SANITARIO = [
    {
        key: "producto",
        label: "Producto",
        type: "select",
        required: true,
        options: [
            { value: "Aceite de Verano", label: "Aceite de Verano" },
            { value: "Abamectina", label: "Abamectina" },
            { value: "Polisulfuro de", label: "Polisulfuro de" },
            { value: "trips", label: "Trips" },
            { value: "grafolita", label: "Grafolita" },
            { value: "carpocapsa", label: "Carpocapsa" },
            { value: "arañuela", label: "Arañuela" },
            { value: "Cyanantraniliprole", label: "Cyanantraniliprole" },
            { value: "oidio", label: "Oidio" },
            { value: "Carbaryl", label: "Carbaryl" },
            { value: "Dispersers 180", label: "Dispersers 180" },
            { value: "Trampas", label: "Trampas" }
        ]
    },
    {
        key: "unidad",
        label: "Unidad",
        type: "select",
        required: true,
        options: [
            { value: "Litros", label: "Litros" },
            { value: "Kg", label: "Kg" },
            { value: "cc", label: "cc" },
            { value: "unidad", label: "Unidad" }
        ]
    },
    {
        key: "dosis",
        label: "Dosis",
        type: "number",
        required: true
    },
    {
        key: "volumen",
        label: "Volumen",
        type: "number",
        required: true
    },
    {
        key: "cantidad",
        label: "Cantidad",
        type: "number",
        required: true
    },
    {
        key: "precioUnitario",
        label: "Precio Unitario",
        type: "number",
        required: true
    }
]