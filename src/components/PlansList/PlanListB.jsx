import Button from "../Button/Button";
import ListaDesplegable from "../ListaDesplegable/ListaDesplegable";
import Input from "../Input/Input";
import {Trash2} from 'lucide-react';
import { useState, useEffect, useRef } from "react";

const PlanListB = ({
    plans,
    columnasPDF,
    planNameKey = "nombre",
    currentDolarValue,
    onAddPlan,
    onCleanPlans,
    onSavePlan,
    fields,
    handleDeletePlan
}) => {
    const [indexPlan, setIndexPlan] = useState(null);
    const [planOriginal, setPlanOriginal] = useState(null);
    const [planAEditar, setPlanAEditar] = useState(null);
    const [cambiosDetectados, setCambiosDetectados] = useState(false);
    const planRefs = useRef({});
    useEffect(() => {
        if (planAEditar && planOriginal) {
            const productosEditados = JSON.stringify(planAEditar.productos);
            const productosOriginales = JSON.stringify(planOriginal.productos);
            setCambiosDetectados(productosEditados !== productosOriginales);
        } else {
            setCambiosDetectados(false);
        }
    }, [planAEditar, planOriginal]);

   useEffect(() => {
    if (plans.length > 0) {
        const lastPlan = plans[plans.length - 1];
        const ref = planRefs.current[lastPlan.id];
        if (ref) {
            ref.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
}, [plans]);


    const seleccionaPlanAEditar = (planIndex) => {
        const plan = JSON.parse(JSON.stringify(plans[planIndex]));
        setPlanAEditar(plan);
        setIndexPlan(planIndex);
        setPlanOriginal(JSON.parse(JSON.stringify(plans[planIndex])));
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
        setIndexPlan(null);
        setPlanAEditar(null);
        setPlanOriginal(null);
    };

    const eliminarPlan = (planIdx) =>{
          if (indexPlan === planIdx) {
        cancelarEdicion();
    } else if (indexPlan > planIdx) {
        setIndexPlan(indexPlan - 1);
    }
        handleDeletePlan(planIdx)
      
    }
    const eliminarProducto = (prodIndex, planIndex) =>{
            const plan = JSON.parse(JSON.stringify(plans[planIndex]));
            const productosActualizados = plan.productos.filter((_, i) => i !== prodIndex)
            const planActualizado = ({...plan, productos: productosActualizados})
            onSavePlan(planIndex, planActualizado);
    }

    return (
        <div className="p-6 w-full rounded-2xl mb-8">
            <h2 className="font-bold text-2xl mb-6 text-center text-sky-800">Planes Generados</h2>

            {plans.length === 0 ? (
                <p className="text-center text-gray-600">No hay planes cargados aún.</p>
            ) : (
                <>
                    <div className="flex flex-col items-center gap-8">
                        {plans.map((plan, planIdx) => {
                            const enEdicion = indexPlan === planIdx;
                           
                            
                            const productos = enEdicion ? planAEditar.productos : plan.productos;
                          
                            return (
                                <div
                                    key={plan.id}
                                   ref={(el) => (planRefs.current[plan.id] = el)}
                                    className="w-full rounded-2xl shadow-lg p-6 bg-green-50 relative"
                                > 
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-sky-700 mb-4 text-start">
                                        {plan.name}
                                        {enEdicion && <span className="text-sm text-emerald-600 ml-2">(Editando...)</span>}
                                    </h3>
                                   
                                   </div>   
                                    <div className="flex flex-col rounded-xl overflow-hidden">
                                        {productos.map((prod, idx) => (
                                            <div
                                                key={idx}
                                                className="px-3 bg-white py-3 overflow-scroll"
                                            >
                                                {/* <div className=" px-2 flex justify-between items-center mb-4">
                                                    {/* <h2 className="font-bold text-xl text-slate-800">Producto {idx + 1}</h2>
                                                </div> */}

                                                <div className="flex pb-3 border-b border-gray-400">
                                                    <div className="text-gray-600 font-semibold text-lg py-3 mx-3">
                                                        {idx + 1}
                                                    </div>
                                                  
                                                    {columnasPDF.map((col) => {
                                                        const fieldDef = fields.find(f => f.key === col.key);
                                                        const valor = prod[col.key] ?? "";

                                                        return (

                                                            <div key={col.key} className="flex-1 px-2">
                                                                <p className="text-sm font-medium text-gray-700 mb-1 ">{col.label}</p>

                                                                {enEdicion && fieldDef ? (
                                                                    fieldDef.type === "select" ? (
                                                                        <ListaDesplegable
                                                                            value={valor}
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
                                                      {productos.length >1 && (<Button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-1 my-4 py-2  rounded-lg shadow"
                                                onClick={() => eliminarProducto(idx, planIdx)}
                                                >
                                                   <Trash2/>
                                                </Button>)} 
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 flex md:flex-row flex-col justify-between items-center font-bold text-gray-800 p-4 rounded">
                                        <div className="bg-sky-100 border border-sky-300 rounded-lg p-4">
                                            <p className="text-sm text-gray-600">Total estimado:</p>
                                            <p className="text-xl font-semibold text-gray-800">
                                                USD ${(plan.costoTotal).toFixed(2)} / ARS ${(plan.costoTotal * currentDolarValue).toFixed(2)}
                                            </p>
                                        </div>
                                        {enEdicion ? (
                                            <div className="flex gap-4">
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
                                            <div className="flex justify-between gap-2">
                                                <Button
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 my-4 py-2  rounded-lg shadow "
                                                    onClick={() => seleccionaPlanAEditar(planIdx)}
                                                >
                                                    Editar Plan
                                                </Button>
                                               <Button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 my-4 py-2  rounded-lg shadow"
onClick={() => eliminarPlan(plan.id)}
                                                >
                                                   Eliminar plan
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        <div className="flex flex-wrap justify-center gap-4 mb-6">
                            {/* {onAddPlan && (
                            <Button className="bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded-lg shadow" onClick={onAddPlan}>
                                + Agregar otro plan
                            </Button>
                        )} */}
                            {onCleanPlans && (
                                <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow" onClick={onCleanPlans}>
                                    Limpiar planes
                                </Button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PlanListB;
