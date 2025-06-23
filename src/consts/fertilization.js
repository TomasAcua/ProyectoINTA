export const FIELDS_FERTILIZATION = [
    {
        key: "producto",
        label: "Producto",
        type: "select",
        required: true,
        options: [
            { value: "urea", label: "Urea" },
            { value: "fosfato", label: "Fosfato" }
        ]
    },
    {
        key: "unidad",
        label: "Unidad",
        type: "select",
        required: true,
        options: [
            { value: "Litros", label: "Litros" },
            { value: "Kilogramos", label: "Kilogramos" }
        ]
    },
    {
        key: "dosis",
        label: "Dosis",
        type: "number",
        required: true
    },
    {
        key: "precio",
        label: "Precio",
        type: "number",
        required: true
    }
]