import Button from "../Button/Button";

const PlanListB = ({
    plans,
    columnasPDF,
    planNameKey = "nombre",
    currentDolarValue,
    onAddPlan,
    onCleanPlans,
}) => (
    <div className="border p-4 rounded bg-white shadow mb-6">
        <h2 className="font-semibold text-lg mb-4">PLANES GENERADOS</h2>
        {plans.length === 0 ? (
            <p>No hay planes cargados aún.</p>
        ) : (
            <div className="flex flex-col items-center gap-4">
                {plans.map((plan, planIdx) => (
                    <table className="table-auto w-[90%] border-collapse text-center" key={`${plan[planNameKey]}-${planIdx}`}>
                        <caption className="font-bold py-2 text-lg">{plan[planNameKey]}</caption>
                        <thead>
                            <tr>
                                {columnasPDF.map(col => (
                                    <th className="border px-4 py-2" key={col.key}>{col.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {plan.productos.map((prod, idx) => (
                                <tr key={idx}>
                                    {columnasPDF.map(col => (
                                        <td className="border px-4 py-2" key={col.key}>
                                            {prod[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={columnasPDF.length} className="border px-4 py-2 font-bold">
                                    <p className="text-center">Total</p>
                                    <p>
                                        USD: ${plan.costoTotal} / ARS: {(plan.costoTotal * currentDolarValue).toFixed(2)}
                                    </p>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                ))}
                <div className="flex gap-4">
                    {onAddPlan && (
                        <Button onClick={onAddPlan} className="text-blue-600 bg-sky-100 hover:underline">
                            + Agregar otro plan
                        </Button>
                    )}
                    {onCleanPlans && (
                        <Button onClick={onCleanPlans} className="text-red-600 bg-red-100 hover:underline">
                            Limpiar planes
                        </Button>
                    )}
                </div>
            </div>
        )}
    </div>
);

export default PlanListB