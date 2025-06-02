import Button from "../Button/Button";
import ListaDesplegable from "../ListaDesplegable/ListaDesplegable";
import Input from "../Input/Input";
import { useState, useEffect } from "react";

const PlanListB = ({
    plans,
    columnasPDF,
    planNameKey = "nombre",
    currentDolarValue,
    onAddPlan,
    onCleanPlans,
    onSavePlan,
    fields
}) => {
    const [indexPlan, setIndexPlan] = useState(null);
    const [planOriginal, setPlanOriginal] = useState(null);
    const [planAEditar, setPlanAEditar] = useState(null);
    const [cambiosDetectados, setCambiosDetectados] = useState(false);

    useEffect(() => {
        if (planAEditar && planOriginal) {
            const productosEditados = JSON.stringify(planAEditar.productos);
            const productosOriginales = JSON.stringify(planOriginal.productos);
            setCambiosDetectados(productosEditados !== productosOriginales);
        } else {
            setCambiosDetectados(false);
        }
    }, [planAEditar, planOriginal]);

    const seleccionaPlanAEditar = (planIndex) => {
        const plan = JSON.parse(JSON.stringify(plans[planIndex]));
        setPlanAEditar(plan);
        setIndexPlan(planIndex);
        setPlanOriginal(JSON.parse(JSON.stringify(plans[planIndex]))); // Clonar de nuevo
    };



    const guardarPlan = () => {
        if (indexPlan !== null && planAEditar) {
            onSavePlan(indexPlan, planAEditar);
            setIndexPlan(null);
            setPlanAEditar(null);
        }
    };

    const handleChange = (index, fieldKey, value) => {
        const productos = planAEditar.productos;
        const updated = [...productos];
        updated[index][fieldKey] = value;

        if (fieldKey === "tractor") {
            updated[index]["implemento"] = "";
        }

        setPlanAEditar({ ...planAEditar, productos: updated });
    };

    const cancelarEdicion = () => {
        setIndexPlan(null)
        setPlanAEditar(null)
        setPlanOriginal(null)
    }

    return (
        <div className="border p-6 w-full rounded-2xl shadow-lg mb-8 bg-white">
            <h2 className="font-bold text-2xl mb-6 text-center text-sky-800">Planes Generados</h2>

            {plans.length === 0 ? (
                <p className="text-center text-gray-600">No hay planes cargados aún.</p>
            ) : (
                <>
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {onAddPlan && (
                            <Button onClick={onAddPlan} className="bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded-lg shadow">
                                + Agregar otro plan
                            </Button>
                        )}
                        {onCleanPlans && (
                            <Button onClick={onCleanPlans} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow">
                                Limpiar planes
                            </Button>
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-8">
                        {plans.map((plan, planIdx) => (
                            <div key={`${plan[planNameKey]}-${planIdx}`} className="w-full border rounded-xl shadow-md">
                                <h3 className="text-xl font-semibold text-sky-700 mb-4 text-center">{plan[planNameKey]}</h3>

                                <div className="grid grid-cols-1 gap-4">
                                    {(indexPlan === planIdx ? planAEditar.productos : plan.productos).map((prod, idx) => (
                                        <div key={idx} className="border border-red-100 rounded-lg p-3 bg-white shadow-sm">
                                            {columnasPDF.map(col => {
                                                const fieldDef = fields.find(f => f.key === col.key);

                                                return (
                                                    <div key={col.key} className="mb-2">
                                                        <p className="text-sm font-semibold text-gray-700">{col.label}</p>
                                                        {indexPlan === planIdx && fieldDef ? (
                                                            fieldDef.type === "select" ? (
                                                                <ListaDesplegable
                                                                    value={prod[col.key] || ""}
                                                                    onChange={(e) => handleChange(idx, col.key, e.target.value)}
                                                                    array={
                                                                        typeof fieldDef.options === "function"
                                                                            ? fieldDef.options(prod)
                                                                            : fieldDef.options
                                                                    }
                                                                />
                                                            ) : (
                                                                <Input
                                                                    type={fieldDef.type || "text"}
                                                                    value={prod[col.key] || ""}
                                                                    onChange={(e) => handleChange(idx, col.key, e.target.value)}
                                                                />
                                                            )
                                                        ) : (
                                                            <p className="text-gray-600">{prod[col.key]}</p>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 text-center font-bold text-gray-800">
                                    <p>Total:</p>
                                    <p className="text-lg">
                                        USD ${plan.costoTotal} / ARS ${(plan.costoTotal * currentDolarValue).toFixed(2)}
                                    </p>
                                </div>

                                {indexPlan === planIdx ? (
                                    <div className="flex justify-center gap-4 mt-4">
                                        <Button
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                                            onClick={guardarPlan}
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
                                    <div className="flex justify-center mt-4">
                                        <Button
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
                                            onClick={() => seleccionaPlanAEditar(planIdx)}
                                        >
                                            Editar Plan
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );

};

export default PlanListB;
