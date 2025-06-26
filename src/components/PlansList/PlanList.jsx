
import Button from "../Button/Button";
import ListaDesplegable from "../ListaDesplegable/ListaDesplegable";
import Input from "../Input/Input";
import { Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const PlanList = ({
  plans,
  columnasPDF,
  currentDolarValue,
  onCleanPlans,
  onSavePlan,
  fields,
  handleDeletePlan,
  location,
  calcularCosto
}) => {
  const [indexPlan, setIndexPlan] = useState(null);
  const [planOriginal, setPlanOriginal] = useState(null);
  const [planAEditar, setPlanAEditar] = useState(null);
  const [cambiosDetectados, setCambiosDetectados] = useState(false);
  const planRefs = useRef({});

  const obtenerProductos = (plan, enEdicion, planAEditar) => {
    const base = enEdicion ? planAEditar : plan;
    if (!base) {
      return [];
    }
    if (Array.isArray(base.tratamientos)) {
      return base.tratamientos.flatMap(t => t.productos || []);
    }

    if (Array.isArray(base.maquinarias)) {
      return base.maquinarias;
    }

    return [];
  };
  useEffect(() => {
    if (planAEditar && planOriginal) {
      const productosEditados = JSON.stringify(obtenerProductos(planAEditar, true, planAEditar));
      const productosOriginales = JSON.stringify(obtenerProductos(planOriginal, true, planOriginal));
      setCambiosDetectados(productosEditados !== productosOriginales);
    } else {
      setCambiosDetectados(false);
    }
  }, [planAEditar, planOriginal]);

  const seleccionaPlanAEditar = (planIndex) => {
    const plan = JSON.parse(JSON.stringify(plans[planIndex]));
    setPlanAEditar(plan);
    setIndexPlan(planIndex);
    setPlanOriginal(plan);
  };

  const guardarPlan = () => {
    if (indexPlan !== null && planAEditar) {
      let recalculatedPlan;
      if (location === "costo-maquinaria") {
         const faltanImplementos = planAEditar.maquinarias.some(
        (item) => !item.implemento || item.implemento.trim() === ""
      );
      if (faltanImplementos) {
        alert("Debes completar el campo 'implemento' antes de guardar.");
        return;
      }
        const maquinarias = planAEditar.maquinarias.map((item) => ({
          ...item,
          costo: calcularCosto(item),
        }));
        recalculatedPlan = {
          ...planAEditar,
          maquinarias,
          costoTotal: maquinarias.reduce((acc, item) => acc + item.costo, 0),
        };
      } else {
        const tratamientos = planAEditar.tratamientos.map((t) => ({
          ...t,
          productos: t.productos.map((p) => ({
            ...p,
            costo: calcularCosto(p),
          })),
        }));
        const costoTotal = tratamientos.reduce((acc, t) => {
          const subtotal = t.productos.reduce((s, p) => s + calcularCosto(p), 0);
          return acc + subtotal;
        }, 0);
        recalculatedPlan = {
          ...planAEditar,
          tratamientos,
          costoTotal,
        };
      }
      onSavePlan(indexPlan, recalculatedPlan);
      cancelarEdicion();
    }
  };

  const cancelarEdicion = () => {
    setIndexPlan(null);
    setPlanAEditar(null);
    setPlanOriginal(null);
  };

  const eliminarItem = (
    prodIndex,
    planIndex,
    tipo,
    tratamientoIndex = null
  ) => {
    if (indexPlan === planIndex && planAEditar) {
      const copiaPlan = JSON.parse(JSON.stringify(planAEditar));
      if (tipo === "tratamientos") {
        copiaPlan.tratamientos[tratamientoIndex].productos.splice(prodIndex, 1);
      } else {
        copiaPlan.maquinarias.splice(prodIndex, 1);
      }
      setPlanAEditar(copiaPlan);
    } else {
      const copiaPlan = JSON.parse(JSON.stringify(plans[planIndex]));
      if (tipo === "tratamientos") {
        copiaPlan.tratamientos[tratamientoIndex].productos.splice(prodIndex, 1);
      } else {
        copiaPlan.maquinarias.splice(prodIndex, 1);
      }
      onSavePlan(planIndex, copiaPlan);
    }
  };

  const handleChange = (
    fieldKey,
    value,
    planIndex,
    tipo,
    itemIndex,
    tratamientoIndex = null
  ) => {
    if (indexPlan === planIndex && planAEditar) {
      const copiaPlan = JSON.parse(JSON.stringify(planAEditar));
      let item;
      if (tipo === "tratamientos") {
        item = copiaPlan.tratamientos[tratamientoIndex].productos[itemIndex];
        item[fieldKey] = value;
        // Recalcula el costo del producto
        item.costo = calcularCosto(item);
        // Recalcula el costoTotal del tratamiento
        const tratamiento = copiaPlan.tratamientos[tratamientoIndex];
        tratamiento.costoTotal = tratamiento.productos.reduce((acc, p) => acc + (p.costo || 0), 0);
        // Recalcula el costoTotal del plan
        copiaPlan.costoTotal = copiaPlan.tratamientos.reduce((acc, t) => acc + (t.costoTotal || 0), 0);
      } else if (tipo === "maquinarias") {
        item = copiaPlan.maquinarias[itemIndex];
        item[fieldKey] = value;

        // Si cambias el tractor, limpia implemento y su precio
        if (fieldKey === "tractor") {
          item["implemento"] = "";
          item["implementoPrecio"] = "";
          // Actualiza el precio del tractor si existe en fields
          const fieldPrecio = fields.find(f => f.key === "tractorPrecio" && typeof f.value === "function");
          if (fieldPrecio) {
            item["tractorPrecio"] = fieldPrecio.value(item);
          }
        }
        // Si cambias el implemento, actualiza su precio
        if (fieldKey === "implemento") {
          const fieldPrecio = fields.find(f => f.key === "implementoPrecio" && typeof f.value === "function");
          if (fieldPrecio) {
            item["implementoPrecio"] = fieldPrecio.value(item);
          }
        }

        // Recalcula el costo de la maquinaria
        item.costo = calcularCosto(item);
        // Recalcula el costoTotal del plan
        copiaPlan.costoTotal = copiaPlan.maquinarias.reduce((acc, m) => acc + (m.costo || 0), 0);
      }
      setPlanAEditar(copiaPlan);
    }
  };

  return (
    <div className="p-0 md:p-6 lg:p-6 w-full rounded-2xl mb-8">
      <h2 className="font-bold text-2xl mb-6 text-center text-sky-800">
        Planes Generados
      </h2>
      {plans.length === 0 ? (
        <p className="text-center text-gray-600">No hay planes cargados aún.</p>
      ) : (
        <div className="flex flex-col items-center gap-8">
          {plans.map((plan, planIdx) => {
            const enEdicion = indexPlan === planIdx;
            const isTratamientos = plan.hasOwnProperty("tratamientos");
            const isMaquinarias = plan.hasOwnProperty("maquinarias");
            const currentPlan = enEdicion && planAEditar ? planAEditar : plan;
            return (
              <div
                key={plan.id}
                ref={(el) => (planRefs.current[plan.id] = el)}
                className="w-full rounded-2xl shadow-lg shadow-slat p-2 bg-green-50 relative"
              >
                <h3 className="text-xl font-semibold text-sky-700 mb-4">
                  {plan.name}
                  {enEdicion && (
                    <span className="text-sm text-emerald-600 ml-2">
                      (Editando...)
                    </span>
                  )}
                </h3>

                <div className="overflow-x-auto">
                  <div className="min-w-[700px]">
                    <div className="flex flex-col gap-6">
                      {isTratamientos &&
                        currentPlan.tratamientos.map((tratamiento, tIdx) => (
                          <div
                            key={tIdx}
                            className="bg-white p-4 rounded shadow"
                          >
                            <h4 className="font-bold text-sky-700 mb-2">
                              Tratamiento {tIdx + 1}
                            </h4>

                            {tratamiento.productos.map((prod, pIdx) => {


                              return (<div
                                key={pIdx}
                                className="flex pb-3 border-b border-gray-300 py-2"
                              >
                                <div className="text-gray-600 font-semibold text-lg mx-3">
                                  {pIdx + 1}
                                </div>
                                {columnasPDF.map((col) => {
                                  const fieldDef = fields.find(
                                    (f) => f.key === col.key
                                  );
                                  const valor = prod[col.key] ?? "";
                                  return (
                                    <div key={col.key} className="flex-1 px-2">
                                      <p className="text-sm font-medium text-gray-700 mb-1">
                                        {col.label}
                                      </p>
                                      {enEdicion && fieldDef ? (
                                        fieldDef.type === "select" ? (
                                          <ListaDesplegable
                                            value={valor}
                                            onChange={(e) =>
                                              handleChange(
                                                col.key,
                                                e.target.value,
                                                planIdx,
                                                "tratamientos",
                                                pIdx,
                                                tIdx
                                              )
                                            }
                                            
                                            array={
                                              typeof fieldDef.options ===
                                                "function"
                                                ? fieldDef.options(prod)
                                                : fieldDef.options
                                            }
                                            required
                                          />
                                        ) : (
                                          <Input
                                            type={fieldDef.type || "text"}
                                            value={valor}
                                            onChange={(e) =>
                                              handleChange(
                                                col.key,
                                                e.target.value,
                                                planIdx,
                                                "tratamientos",
                                                pIdx,
                                                tIdx
                                              )
                                            }
                                            required
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

                                {Array.isArray(tratamiento.productos) && tratamiento.productos.length > 1 && (

                                  <Button
                                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-lg shadow"
                                    onClick={() =>
                                      eliminarItem(
                                        pIdx,
                                        planIdx,
                                        "tratamientos",
                                        tIdx
                                      )
                                    }
                                  >
                                    <Trash2 />
                                  </Button>
                                )}
                              </div>)
                            })}
                          </div>
                        ))}

                      {isMaquinarias &&
                        Array.isArray(currentPlan.maquinarias) &&
                        currentPlan.maquinarias.map((maq, mIdx) => (
                          <div
                            key={mIdx}
                            className="flex pb-3 border-b border-gray-300 py-2 bg-white px-4 rounded shadow"
                          >
                            <div className="text-gray-600 font-semibold text-lg mx-3">
                              {mIdx + 1}
                            </div>
                            {columnasPDF.map((col) => {
                              const fieldDef = fields.find(
                                (f) => f.key === col.key
                              );
                              const valor = maq[col.key] ?? "";
                              return (
                                <div key={col.key} className="flex-1 px-2">
                                  <p className="text-sm font-medium text-gray-700 mb-1">
                                    {col.label}
                                  </p>
                                  {enEdicion && fieldDef ? (
                                    fieldDef.type === "select" ? (
                                      <ListaDesplegable
                                        value={valor}
                                        onChange={(e) =>
                                          handleChange(
                                            col.key,
                                            e.target.value,
                                            planIdx,
                                            "maquinarias",
                                            mIdx
                                          )
                                        }
                                        array={
                                          typeof fieldDef.options === "function"
                                            ? fieldDef.options(maq)
                                            : fieldDef.options
                                        }
                                      />
                                    ) : (
                                      <Input
                                        type={fieldDef.type || "text"}
                                        value={valor}
                                        onChange={(e) =>
                                          handleChange(
                                            col.key,
                                            e.target.value,
                                            planIdx,
                                            "maquinarias",
                                            mIdx
                                          )
                                        }
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
                            {currentPlan.maquinarias && currentPlan.maquinarias.length > 1 && (
                              <Button
                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-lg shadow"
                                onClick={() =>
                                  eliminarItem(mIdx, planIdx, "maquinarias")
                                }
                              >
                                <Trash2 />
                              </Button>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex md:flex-row flex-col justify-between items-center font-bold text-gray-800 p-4 rounded">
                  <div className="bg-sky-100 border border-sky-300 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Total estimado:</p>
                    <p className="text-xl font-semibold text-gray-800">
                      USD ${currentPlan.costoTotal.toFixed(2)} / ARS{" "}
                      {(currentPlan.costoTotal * currentDolarValue).toFixed(2)}
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
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 my-4 py-2 rounded-lg shadow"
                        onClick={() => seleccionaPlanAEditar(planIdx)}
                      >
                        Editar Plan
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 my-4 py-2 rounded-lg shadow"
                        onClick={() => handleDeletePlan(plan.id)}
                      >
                        Eliminar Plan
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {onCleanPlans && (
              <Button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
                onClick={onCleanPlans}
              >
                Limpiar planes
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanList;