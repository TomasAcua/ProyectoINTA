import Button from "../Button/Button";
import ListaDesplegable from "../ListaDesplegable/ListaDesplegable";
import Input from "../Input/Input";
import { Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from "react";

const TreatmentList = ({
    plans,
    treatments,
    columnasPDF,
    treatmentNameKey = "nombre",
    currentDolarValue,
    onCleanTreatments,
    onSaveTreatment,
    fields,
    handleDeleteTreatment
    
}) => {
    const [indexTreatment, setIndexTreatment] = useState(null);
    const [editPlan, setEditPlan] = useState(null)
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

    const seleccionaeditTreatment = (planIx, treatmentIndex) => {        
        const treatment = JSON.parse(JSON.stringify(plans[planIx].tratamientos[treatmentIndex]));
        setEditTreatment(treatment);
        setEditPlan(planIx)
        setIndexTreatment(treatmentIndex);
        setOriginalTreatment(JSON.parse(JSON.stringify(plans[planIx].tratamientos[treatmentIndex])));
    };
    console.log("INDEXT TREATMENT", indexTreatment)
    const saveTreatment = () => {
        if (indexTreatment !== null && editTreatment) {
            onSaveTreatment(editPlan, indexTreatment, editTreatment);
            setIndexTreatment(null);
            setEditTreatment(null);
            setEditPlan(null)
        }
    };

    const handleChange = (index, fieldKey, value) => {
        const productos = editTreatment.productos;
        const updated = [...productos];
        updated[index][fieldKey] = value;

        if (fieldKey === "tractor") {
            updated[index]["implemento"] = "";
        }

        setEditTreatment({ ...editTreatment, productos: updated });
    };

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
        }
        handleDeleteTreatment(planIx, treatmentIdx);
    };

    const eliminarProducto = (prodIndex, treatmentIndex) => {
        const treatment = JSON.parse(JSON.stringify(treatments[treatmentIndex]));
        const productosActualizados = treatment.productos.filter((_, i) => i !== prodIndex);
        const treatmentActualizado = { ...treatment, productos: productosActualizados };
        onSaveTreatment(treatmentIndex, treatmentActualizado);
    };

    return (
        <div className="p-6 w-full rounded-2xl mb-8">
            <h2 className="font-bold text-2xl mb-6 text-center text-sky-800">Tratamientos Generados</h2>

            {plans.length === 0 ? (
                <p className="text-center text-gray-600">No hay treatmentes cargados aún.</p>
            ) : (
                <div className="flex flex-col items-center gap-8">
                    {plans.map((plan, planIx) => (
                        <div key={planIx} className="w-full">
                            <h2 className="text-xl font-semibold text-sky-700 mb-4 text-start">
                                {plan.name}
                            </h2>

                            {plan.tratamientos.map((treatment, treatmentIdx) => {
                                const enEdicion = planIx === editPlan && treatmentIdx === indexTreatment;
                                const productos = enEdicion ? editTreatment.productos : treatment.productos;

                                return (
                                    <div
                                        key={treatment.id}
                                        ref={(el) => (treatmentRefs.current[treatment.id] = el)}
                                        className="w-full rounded-2xl shadow-lg p-6 bg-green-50 relative"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-xl font-semibold text-sky-700 mb-4 text-start">
                                                {treatment.name}
                                                {enEdicion &&  (
                                                    <span className="text-sm text-emerald-600 ml-2">(Editando...)</span>
                                                )}
                                            </h3>
                                        </div>

                                        <div className="flex flex-col rounded-xl overflow-hidden">
                                            {productos.map((prod, idx) => (
                                                <div
                                                    key={idx}
                                                    className="px-3 bg-white py-3 overflow-scroll"
                                                >
                                                    <div className="flex pb-3 border-b border-gray-400">
                                                        <div className="text-gray-600 font-semibold text-lg py-3 mx-3">
                                                            {idx + 1}
                                                        </div>

                                                        {columnasPDF.map((col) => {
                                                            const fieldDef = fields.find(f => f.key === col.key);
                                                            const valor = prod[col.key] ?? "";

                                                            return (
                                                                <div key={col.key} className="flex-1 px-2">
                                                                    <p className="text-sm font-medium text-gray-700 mb-1">{col.label}</p>

                                                                    {enEdicion && fieldDef  && planIx === editPlan? (
                                                                        fieldDef.type === "select" ? (
                                                                            <ListaDesplegable
                                                                                value={valor}
                                                                                onChange={(e) => handleChange(idx, col.key, e.target.value)}
                                                                                array={typeof fieldDef.options === "function"
                                                                                    ? fieldDef.options(prod)
                                                                                    : fieldDef.options}
                                                                            />
                                                                        ) : (
                                                                            <Input
                                                                                type={fieldDef.type || "text"}
                                                                                value={valor}
                                                                                onChange={(e) => handleChange(idx, col.key, e.target.value)}
                                                                                className="border p-2 rounded w-full"
                                                                            />
                                                                        )
                                                                    ) : (
                                                                        <p className="text-gray-600 bg-white rounded px-2 py-1 border border-transparent">
                                                                            {valor}
                                                                        </p>
                                                                    )}
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
                                                    USD ${(treatment.costoTotal).toFixed(2)} / ARS ${(treatment.costoTotal * currentDolarValue).toFixed(2)}
                                                </p>
                                            </div>

                                            {enEdicion && planIx === editPlan ?  (
                                                <div className="flex gap-4">
                                                    <Button
                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                                                        onClick={saveTreatment}
                                                        disabled={!cambiosDetectados}
                                                    >
                                                        Guardar Cambios
                                                    </Button>
                                                    <Button
                                                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg shadow"
                                                        onClick={cancelarEdicion}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-between gap-2">
                                                    <Button
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 my-4 py-2 rounded-lg shadow"
                                                        onClick={() => seleccionaeditTreatment(planIx, treatmentIdx)}
                                                    >
                                                        Editar Tratamiento
                                                    </Button>
                                                    <Button
                                                        className="bg-red-500 hover:bg-red-600 text-white px-4 my-4 py-2 rounded-lg shadow"
                                                        onClick={() => eliminarTratamiento(planIx, treatmentIdx)}
                                                    >
                                                        Eliminar Tratamiento
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {onCleanTreatments && (
                            <Button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
                                onClick={onCleanTreatments}
                            >
                                Limpiar treatmentes
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TreatmentList;
