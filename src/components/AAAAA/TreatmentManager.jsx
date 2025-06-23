/**
 * MiniTreatment y Treatment comparten:
 * inputs y selects
 * pseudo crud
 * react hooks
 * productos x tratamientos
 */

import { useState, useRef, useEffect } from "react"
import TreatmentCard from "./TreatmentCard"

const TreatmentManager = ({
  treatments = [],
  isGroupedByPlan = false,
  plans = [],
  onSaveTreatment,
  onDeleteTreatment,
  onDeleteProduct,
  onCleanTreatments,
  fields = [],
  columnasPDF = [],
  currentDolarValue = 0,
  planNameKey = "nombre",
  treatmentNameKey = "nombre"
}) => {
  const [editIndex, setEditIndex] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (editIndex !== null && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [editIndex])

  const handleSave = (planIndex, treatIndex, editedTreatment) => {
    onSaveTreatment?.(isGroupedByPlan ? planIndex : null, treatIndex, editedTreatment)
    setEditIndex(null)
  };

  const handleEdit = (index) => setEditIndex(index)

  const handleCancel = () => setEditIndex(null)

  const renderTreatment = (treatment, tIndex, planIndex = null) => (
    <div
      key={`treat-${planIndex !== null ? `${planIndex}-` : ""}${tIndex}`}
      ref={editIndex === tIndex ? scrollRef : null}
      className="border p-4 rounded-lg shadow mb-4"
    >
      <TreatmentCard
        treatment={treatment}
        editable={editIndex === tIndex}
        onEdit={() => handleEdit(tIndex)}
        onCancel={handleCancel}
        onDelete={() => onDeleteTreatment?.(planIndex, tIndex)}
        onSave={(edited) => handleSave(planIndex, tIndex, edited)}
        onDeleteProducto={(pIndex) => onDeleteProduct?.(tIndex, pIndex)}
        fields={fields}
        columnas={columnasPDF}
        currentDolarValue={currentDolarValue}
      />
    </div>
  )

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-700">Tratamientos</h2>
        {onCleanTreatments && (
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded"
            onClick={onCleanTreatments}
          >
            Limpiar
          </button>
        )}
      </div>

      {isGroupedByPlan ? (
        plans.map((plan, planIndex) => (
          <div key={`plan-${planIndex}`} className="mb-6">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              Plan {String.fromCharCode(65 + planIndex)}: {plan[planNameKey] || ""}
            </h3>
            {plan.treatments?.map((treat, tIndex) =>
              renderTreatment(treat, tIndex, planIndex)
            )}
          </div>
        ))
      ) : (
        treatments.map((treat, tIndex) => renderTreatment(treat, tIndex))
      )}
    </div>
  )
}

export default TreatmentManager