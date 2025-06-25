

import Button from "../Button/Button";
import { Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const TreatmentList = ({
  plans,
  treatments,
  columnasPDF,
  currentDolarValue,
  onCleanTreatments,
  onSaveTreatment,
  fields,
  type,
  handleDeleteTreatment,
  variante = "full",
  maxItems,
  showActions = true,
  className = "",
}) => {
  const [indexTreatment, setIndexTreatment] = useState(null);
  const [editPlan, setEditPlan] = useState(null);
  const [originalTreatment, setOriginalTreatment] = useState(null);
  const [editTreatment, setEditTreatment] = useState(null);
  const [cambiosDetectados, setCambiosDetectados] = useState(false);
  const treatmentRefs = useRef({});

  useEffect(() => {
    if (editTreatment && originalTreatment) {
      const productosEditados = JSON.stringify(editTreatment.productos);
      const productosOriginales = JSON.stringify(originalTreatment.productos);
      setCambiosDetectados(productosEditados !== productosOriginales);
    } else {
      setCambiosDetectados(false);
    }
  }, [editTreatment, originalTreatment]);

  useEffect(() => {
    if (treatments.length > 0) {
      const lasttreatment = treatments[treatments.length - 1];
      const ref = treatmentRefs.current[lasttreatment.id];
      if (ref) {
        ref.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [treatments]);



  const cancelarEdicion = () => {
    setIndexTreatment(null);
    setEditTreatment(null);
    setOriginalTreatment(null);
  };

  const eliminarTratamiento = (planIx, treatmentIdx) => {
    if (indexTreatment === treatmentIdx) {
      cancelarEdicion();
    } else if (indexTreatment > treatmentIdx) {
      setIndexTreatment(indexTreatment - 1);
      setEditPlan(planIx);
    }
    handleDeleteTreatment(planIx, treatmentIdx);
  };

  const eliminarProducto = (prodIndex, treatmentIndex) => {
    const treatment = JSON.parse(JSON.stringify(treatments[treatmentIndex]));
    const productosActualizados = treatment.productos.filter(
      (_, i) => i !== prodIndex
    );
    const treatmentActualizado = {
      ...treatment,
      productos: productosActualizados,
    };
    onSaveTreatment(treatmentIndex, treatmentActualizado);
  };

  if (variante === "mini") {
    return (
      <div className={`treatment-list-mini ${className}`}>
        <h3 className="text-lg font-medium mb-2 text-sky-800">
          Tratamientos recientes
        </h3>
        <div className="overflow-y-auto max-h-60 bg-green-50 rounded-lg p-3">
          {treatments.length === 0 ? (
            <p className="text-center text-gray-600 py-4">
              No hay tratamientos
            </p>
          ) : (
            <>
              {treatments.slice(0, maxItems || 3).map((treatment, index) => (
                <div
                  key={index}
                  className="p-2 border border-green-200 rounded-lg mb-2 bg-white shadow-sm hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sky-700">
                      Tratamiento {index + 1}
                    </span>

                    {showActions && (
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white p-1  rounded-lg"
                        onClick={() => handleDeleteTreatment(index)}
                      >
                        <Trash2 />
                      </Button>
                    )}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {treatment.productos.map((prod, idx) => (
                      <div key={idx} className="mb-1">
                        
                        <span className="font-semibold">{prod.producto}</span>
                        {" | "}
                        Unidad:{" "}
                        <span className="font-semibold">{prod.unidad}</span>
                        {" | "}
                        Dosis:{" "}
                        <span className="font-semibold">{prod.dosis}</span>
                        {" | "}
                        Volumen:{" "}
                        <span className="font-semibold">{prod.volumen}</span>
                        {" | "}
                        Precio:{" "}
                        <span className="font-semibold">
                          {prod.precioUnitario}
                        </span>
                      </div>
                    ))}
                    <div>
                      Total: USD ${treatment.costoTotal?.toFixed(2) || 0}
                    </div>
                  </div>
                </div>
              ))}
              {treatments.length > 0 && showActions && (
                <div className="mt-2 text-right">
                  <Button
                    onClick={onCleanTreatments}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Limpiar todos
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full rounded-2xl mb-8">
      <div className="flex flex-col md:flex-row md:flex-wrap items-center gap-8">
        {treatments.map((treatment, treatmentIdx) => {
          const enEdicion = treatmentIdx === indexTreatment;
          const productos = enEdicion
            ? editTreatment.productos
            : treatment.productos;

          return (
            <div
              key={treatment.id}
              ref={(el) => (treatmentRefs.current[treatment.id] = el)}
              className="w-full rounded-2xl shadow-lg p-6 bg-green-50 relative"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-sky-700 mb-4 text-start">
                  {treatment.name}
                  
                </h3>
              </div>

              <div className="flex flex-col rounded-xl overflow-hidden">
                {productos.map((prod, idx) => (
                  <div key={idx} className="px-3 bg-white py-3 overflow-scroll">
                    <div className="flex pb-3 border-b border-gray-400">
                      <div className="text-gray-600 font-semibold text-lg py-3 mx-3">
                        {idx + 1}
                      </div>

                      {columnasPDF.map((col) => {
                        const fieldDef = fields.find((f) => f.key === col.key);
                        const valor = prod[col.key] ?? "";

                        return (
                          <div key={col.key} className="flex-1 px-2">
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              {col.label}
                            </p>

                          </div>
                        );
                      })}

                      {treatment.productos.length > 1 && (
                        <Button
                          className="bg-red-500 hover:bg-red-600 text-white px-1 my-4 py-2 rounded-lg shadow"
                          onClick={() => eliminarProducto(idx, treatmentIdx)}
                        >
                          <Trash2 />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex md:flex-row flex-col justify-between items-center font-bold text-gray-800 p-4 rounded">
                <div className="bg-sky-100 border border-sky-300 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total estimado:</p>
                  <p className="text-xl font-semibold text-gray-800">
                    USD ${treatment.costoTotal.toFixed(2)} / ARS $
                    {(treatment.costoTotal * currentDolarValue).toFixed(2)}
                  </p>
                </div>

                {
                
                  <div className="flex gap-4">
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 my-4 py-2 rounded-lg shadow"
                      onClick={() => eliminarTratamiento(planIx, treatmentIdx)}
                    >
                      Eliminar tratamientos
                    </Button>
                  </div>
                 
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TreatmentList;
