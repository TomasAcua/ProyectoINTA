import { useState, useRef, useEffect } from "react";
import useChartData from "../../hooks/useChartData";
import Chart from "../Chart/Chart";
import Dolar from "../Dolar/Dolar";
import PlanListB from "../PlansList/PlanListB";
import ProductForm from "../FormularioPlan/ProductForm";
import useProductForm from "../../hooks/useProductForm";
import usePlanList from "../../hooks/usePlanList";
import QuickNavigate from "../QuickNavigate/QuickNavigate";
import ModalFormulario from "../Modal/ModalFormulario"
import CalculatorTitle from "../CalculatorTitle/CalculatorTitle"
import PrecioCombustibleInput from "../PrecioCombustibleInput/PrecioCombustibleInput";
import { useLocation } from "react-router-dom";


const ModuleLayout = ({
    titulo,
    fields,
    calcularCosto,
    storageKey,
    columnasPDF,
    tituloModal,
    precioCombustible,
    setPrecioCombustible,
    type
}) => {

    const location = useLocation().pathname
    console.log("searchParams", location.split("/")[1])

    const {
        productForms,
        addProductForm,
        handleInputChange,
        deleteProductForm,
        cleanProducts,
        isCurrentPlanValid,
        resetProductForms,
    } = useProductForm(fields, calcularCosto, storageKey, precioCombustible)

    const {
        plans,
        showForm,
        addPlan,
        cleanPlans,
        showAddPlanForm,
        updatePlanAtIndex,
        handleDeletePlan
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
    useEffect(() => {
        // Recalcula todos los productos actuales con el nuevo precio
        const updatedForms = productForms.map((producto) => ({
            ...producto,
            costo: calcularCosto(producto),
        }));
        resetProductForms(updatedForms);
    }, [precioCombustible]);

    return (
        <div className="flex flex-col justify-center items-center">
        <CalculatorTitle 
            title={titulo} />
        <div className="h-full rounded-none md:rounded-xl min-h-screen w-[90%] md:w-[80%] mt-0 md:mt-5 overflow-hidden">
            <QuickNavigate />
            
            <div className="grid lg:grid-cols-6 grid-cols-1 gap-4 items-center">
                <div className="lg:col-span-4 order-2 md:order-1 lg:order-1">
                    {showForm && (

                        <ProductForm
                            fields={fields}
                            productForms={productForms}
                            handleInputChange={handleInputChange}
                            addProductForm={addProductForm}
                            deleteProductForm={deleteProductForm}
                            cleanProducts={cleanProducts}
                            handleCargarProductos={handleCargarProductos}
                            type={type}
                        />
                    )}
                </div>
                <div className="flex flex-col col-span-2 order-1 md:order-2 lg:order-2">
                    <Dolar
                        className="flex justify-center items-center "
                        onDolarChange={updateDolarValue}
                    />
                    {type === "Costo Maquinarias" && (

                        <PrecioCombustibleInput
                            value={precioCombustible}
                            onChange={(e) => setPrecioCombustible(e.target.value)}
                            className={'flex justify-center'}
                        />

                    )}
                </div>


            </div>


            <div className="w-full px-4 flex flex-col items-center">


                <div className="my-4 h-0.5 border-t-0 bg-black/10 w-full"></div>

                <PlanListB
                    plans={plans}
                    columnasPDF={columnasPDF}
                    planNameKey="nombre"
                    currentDolarValue={currentDolarValue}
                    onAddPlan={showAddPlanForm}
                    onCleanPlans={cleanPlans}
                    handleDeletePlan={handleDeletePlan}
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
                {/* <ModalFormulario
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
                /> */}
            </div>

        </div>
        </div>
    );
}

export default ModuleLayout;
