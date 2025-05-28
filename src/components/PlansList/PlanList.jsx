import Button from "../Button/Button"

const PlanList = ({ plans, onAddPlan, onCleanPlans, currentDolarValue }) => {
    return (
        <div className="border p-4 rounded bg-white shadow mb-6">
            <h2 className="font-semibold text-lg mb-4">PLANES GENERADOS</h2>
            {plans.length === 0 ? (
                <p>No hay planes cargados aún.</p>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    {plans.map((plan, planIdx) => (
                        <table className="table-auto w-[90%] border-collapse text-center" key={`${plan.nombre}-${planIdx}`}>
                            <caption className="font-bold py-2 text-lg">{plan.nombre}</caption>
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Producto</th>
                                    <th className="border px-4 py-2">Unidad</th>
                                    <th className="border px-4 py-2">Dosis</th>
                                    <th className="border px-4 py-2">Presentación</th>
                                    <th className="border px-4 py-2">Precio</th>
                                    <th className="border px-4 py-2">Tratamientos</th>
                                    <th className="border px-4 py-2">Costo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plan.productos.map((prod, idx) => (
                                    <tr key={`${prod.producto}-${idx}`}>
                                        <td className="border px-4 py-2">{prod.producto}</td>
                                        {console.log("Producto " + prod.producto)}
                                        <td className="border px-4 py-2">{prod.unidad}</td>
                                        {console.log("Unidad " + prod.unidad)}
                                        <td className="border px-4 py-2">{prod.dosis}</td>
                                        {console.log("Dosis " + prod.dosis)}
                                        <td className="border px-4 py-2">{prod.presentacion}</td>
                                        {console.log("Presentacion " + prod.presentacion)}
                                        <td className="border px-4 py-2">${prod.precio}</td>
                                        {console.log("Precio " + prod.precio)}
                                        <td className="border px-4 py-2">{prod.tratamientos}</td>
                                        {console.log("Tratamientos " + prod.tratamientos)}
                                        <td className="border px-4 py-2">${prod.costo}</td>
                                        {console.log("Costo " + prod.costo)}
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="7" className="border px-4 py-2 font-bold">
                                        <p className="text-center">Total</p>
                                        <p>
                                            USD: ${plan.costoTotal} / ARS: ${(plan.costoTotal * currentDolarValue).toFixed(2)}
                                            {console.log("Total " + plan.total)}
                                        </p>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    ))}
                    <div className="flex gap-4">
                        <Button
                            onClick={onAddPlan}
                            className="text-blue-600 bg-sky-100 hover:underline"
                        >
                            + Agregar otro plan
                        </Button>
                        <Button
                            onClick={onCleanPlans}
                            className="text-red-600 bg-red-100 hover:underline"
                        >
                            Limpiar planes
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PlanList