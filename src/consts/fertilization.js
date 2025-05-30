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
            { value: "kg", label: "Kg" },
            { value: "lts", label: "Lts" }
        ]
    },
    {
        key: "presentacion",
        label: "Presentación",
        type: "select",
        required: true,
        options: [
            { value: "bolsa", label: "Bolsa 50kg" },
            { value: "bidon", label: "Bidón 20lts" }
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
    },
    {
        key: "tratamientos",
        label: "Tratamientos",
        type: "number",
        required: true
    }
]