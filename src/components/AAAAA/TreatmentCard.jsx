import { useState } from "react"
import { Pencil, Trash2, Save, X} from "lucide-react"
import {formatUSD2ARS} from "../../utils/formatMoney"
import Input from "../Input/Input"
import Button from "../Button/Button"

const TreatmentCard = ({
treatment,
editable = false,
onEdit,
onCancel,
onDelete,
onSave,
onDeleteProduct,
fields = [],
columns = [],
currentDolarValue = 0
}) => {
    const [editedTreatment, setEditedTreatment] = useState({...treatment})

    const handleChange = (event, key) => {
        setEditedTreatment((prev) => ({
            ...prev,
            [key]: event.target.value
        }))
    }

    const renderField = (product, col) => {
        const value = product[col.key]
        if (col.type === "money") {
            return formatUSD2ARS(value, currentDolarValue)
        }
        return value
    }

    return (
    <div>
      {editable ? (
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            {fields.map((field) => (
              <Input
                key={field.key}
                text={field.label}
                value={editedTreatment[field.key]}
                onChange={(e) => handleChange(e, field.key)}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={() => onSave(editedTreatment)} className="bg-green-600 text-white">
              <Save size={16} /> Guardar
            </Button>
            <Button onClick={onCancel} className="bg-gray-500 text-white">
              <X size={16} /> Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800">
              Tratamiento: {treatment.nombre || "Sin nombre"}
            </h3>
            <div className="flex gap-2">
              <Button onClick={onEdit} className="bg-yellow-500 text-white">
                <Pencil size={16} /> Editar
              </Button>
              <Button onClick={onDelete} className="bg-red-600 text-white">
                <Trash2 size={16} /> Eliminar
              </Button>
            </div>
          </div>
          {Array.isArray(treatment.productos) && treatment.productos.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    {columns.map((col) => (
                      <th key={col.key} className="px-2 py-1 border">
                        {col.label}
                      </th>
                    ))}
                    <th className="px-2 py-1 border">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {treatment.productos.map((producto, index) => (
                    <tr key={index}>
                      {columns.map((col) => (
                        <td key={col.key} className="px-2 py-1 border">
                          {renderField(producto, col)}
                        </td>
                      ))}
                      <td className="px-2 py-1 border text-center">
                        <Button
                          onClick={() => onDeleteProduct?.(index)}
                          className="bg-red-500 text-white"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic">Sin productos cargados.</p>
          )}
        </>
      )}
    </div>

  )
}

export default TreatmentCard