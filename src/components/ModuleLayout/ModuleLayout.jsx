import { useState, useRef } from "react";
import useChartData from "../../hooks/useChartData";
import Chart from "../Chart/Chart";
import Dolar from "../Dolar/Dolar";
import PlanListB from "../PlansList/PlanListB";
import ProductForm from "../FormularioPlan/ProductForm";
import useProductForm from "../../hooks/useProductForm";
import usePlanList from "../../hooks/usePlanList";
import QuickNavigate from "../QuickNavigate/QuickNavigate";
import ModalFormulario from "../Modal/ModalFormulario"
import { Calculator } from "lucide-react"

const ModuleLayout = ({
    titulo,
    fields,
    calcularCosto,
    storageKey,
    columnasPDF,
    tituloModal
}) => {
    const {
        productForms,
        addProductForm,
        handleInputChange,
        deleteProductForm,
        cleanProducts,
        isCurrentPlanValid,
        resetProductForms,
    } = useProductForm(fields, calcularCosto, storageKey)
    
    const {
        plans,
        showForm,
        addPlan,
        cleanPlans,
        showAddPlanForm,
        updatePlanAtIndex
    } = usePlanList("plans" + storageKey)

    const { chartData, chartOptions, isFormValid } = useChartData(plans)

    const [showChart, setShowChart] = useState(false)
    const chartRef = useRef(null)

    const toggleChart = () => setShowChart(prev => !prev)

    const [currentDolarValue, setCurrentDolarValue] = useState(
        localStorage.getItem("dolarOficial") || 0
    );

    const updateDolarValue = (newValue) => {
        setCurrentDolarValue(newValue);
    }

    const handleCargarProductos = () => {
        if (!isCurrentPlanValid()) {
            alert("Por favor, complete todos los datos requeridos.");
            return;
        }

        addPlan(productForms);
        resetProductForms();
    }
    const [editIndex, setEditIndex] = useState(null);
    const [planToEdit, setPlanToEdit] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditPlan = (index) => {
        setEditIndex(index);
        setPlanToEdit(plans[index]);
        setIsModalOpen(true);
    };
    
    return (
        <div className="rounded-xl shadow-md min-h-screen w-[90%] bg-white mt-5">
            <QuickNavigate />
            <div className="flex flex-row justify-start gap-5 space-y-1.5 p-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white w-full p-6 mb-2 rounded-t-xl">
                <Calculator />
                <h2 className="text-lg">{titulo.toLocaleUpperCase()}</h2>
            </div>
            <div className="w-full px-4 flex flex-col items-center">
                <Dolar
                    className="flex justify-center items-center w-full"
                    onDolarChange={updateDolarValue}
                />

                <div className="my-4 h-0.5 border-t-0 bg-black/10 w-full"></div>

                {showForm && (
                    <ProductForm
                        fields={fields}
                        //productos={productos}
                        productForms={productForms}
                        handleInputChange={handleInputChange}
                        addProductForm={addProductForm}
                        deleteProductForm={deleteProductForm}
                        cleanProducts={cleanProducts}
                        handleCargarProductos={handleCargarProductos}
                    />
                )}
                <PlanListB
                    plans={plans}
                    columnasPDF={columnasPDF}
                    planNameKey="nombre"
                    currentDolarValue={currentDolarValue}
                    onAddPlan={showAddPlanForm}
                    onCleanPlans={cleanPlans}
                    onEditPlan={handleEditPlan}
                    fields={fields}
                    onSavePlan={(index, editedPlan) => {
                        const recalculatedPlan = {
                            ...editedPlan,
                            productos: editedPlan.productos.map((producto) => ({
                                ...producto,
                                costo: calcularCosto(producto),
                            })),
                            costoTotal: editedPlan.productos.reduce((acc, producto) => {
                                return acc + calcularCosto(producto);
                            }, 0),
                        };
                        updatePlanAtIndex(index, recalculatedPlan);
                    }}
                />
                
                <Chart
                    isFormValid={isFormValid}
                    chartData={chartData}
                    chartOptions={chartOptions}
                    chartRef={chartRef}
                    plans={plans}
                    columnasPDF={columnasPDF}
                    showChart={showChart}
                    toggleChart={toggleChart}
                />

                <ModalFormulario
                    isOpen={isModalOpen}
                    title={tituloModal}
                    fields={fields}
                    data={planToEdit?.productos || []}
                    setData={(newData) =>
                        setPlanToEdit({ ...planToEdit, productos: newData })
                    }
                    onSave={() => {
                        const recalculatedPlan = {
                            ...planToEdit,
                            productos: planToEdit.productos.map((producto) => ({
                                ...producto,
                                costo: calcularCosto(producto),
                            })),
                            costoTotal: planToEdit.productos.reduce((acc, producto) => {
                                return acc + calcularCosto(producto);
                            }, 0),
                        };

                        updatePlanAtIndex(editIndex, recalculatedPlan);
                        setIsModalOpen(false);
                    }}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>

        </div>
    );
}

export default ModuleLayout;
