import { useState, useRef, useEffect } from "react";
import useChartData from "../../hooks/useChartData";
import useTreatment from "../../hooks/useTreatment";
import Chart from "../Chart/Chart";
import Dolar from "../Dolar/Dolar";
import TreatmentList from "../Treatment/Treatment"
import ProductForm from "../ProductForm/ProductForm";
import useProductForm from "../../hooks/useProductForm";
import usePlanList from "../../hooks/usePlanList";
import QuickNavigate from "../QuickNavigate/QuickNavigate";
import ModalFormulario from "../Modal/ModalFormulario"
import CalculatorTitle from "../CalculatorTitle/CalculatorTitle"
import PrecioCombustibleInput from "../PrecioCombustibleInput/PrecioCombustibleInput";
import XLSXDocument from "../XLSXDocument/XLSXDocument";
import { useLocation } from "react-router-dom";
import { fetchMaquinaria } from "../../services/fetchMaquinaria";


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
    // console.log("searchParams", location.split("/")[1])
    useEffect(() => {
        const obtenerDatos = async () => {
            const { data, error } = await fetchMaquinaria("534950414e2e4d617175696e6172696140316e643163346430723373")
            console.log("Resultado: ", {data, error})
        }
        obtenerDatos()
    }, [])
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
        treatments,
        addTreatment,
        cleanTreatments,
        showaddTreatmentForm,
        updateTreatmentAtIndexTreatment,
        handleDeleteTreatment
    } = useTreatment("Treatment" + storageKey)
    const {
        plans,
        showForm,
        addPlan,
        cleanPlans,
        showAddPlanForm,
        updatePlanAtIndex,
        handleDeletePlan,
        updateTreatmentAtIndex
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

        addTreatment(productForms);
        resetProductForms();
    }

    useEffect(() => {
        // Recalcula todos los productos actuales con el nuevo precio
        const updatedForms = productForms.map((producto) => ({
            ...producto,
            costo: calcularCosto(producto),
        }));
        resetProductForms(updatedForms);
    }, [precioCombustible]);
    const handleAddPlan = () => {
        if (treatments.length === 0) {
            alert("Debes cargar al menos un tratamiento antes de guardar el plan.");
            return;
        }

        addPlan(treatments);
        cleanTreatments();
    };
    return (
        <div className="flex flex-col justify-center items-center">
            <CalculatorTitle
                title={titulo} />
            <div className="h-full rounded-none md:rounded-xl min-h-screen w-[90%] md:w-[85%] mt-0 md:mt-5 overflow-hidden">
                <QuickNavigate />

                <div className="grid lg:grid-cols-6 grid-cols-1 gap-4 items-center">
                    <div className="lg:col-span-4 order-2 md:order-1 lg:order-1">
                        {showForm && (
                            <ProductForm
                                plans={plans}
                                treatments={treatments}
                                fields={fields}
                                productForms={productForms}
                                handleInputChange={handleInputChange}
                                addProductForm={addProductForm}
                                deleteProductForm={deleteProductForm}
                                cleanProducts={cleanProducts}
                                handleAddPlan={handleAddPlan}
                                handleCargarProductos={handleCargarProductos}
                                onCleanTreatments={cleanTreatments}
                                handleDeleteTreatment={handleDeleteTreatment}
                                onSaveTreatment={(index, editedTreatment) => {
                                    const recalculatedPlan = {
                                        ...editedTreatment,
                                        productos: editedTreatment.productos.map((producto) => ({
                                            ...producto,
                                            costo: calcularCosto(producto),
                                        })),
                                        costoTotal: editedTreatment.productos.reduce((acc, producto) => {
                                            return acc + calcularCosto(producto);
                                        }, 0),
                                    };
                                    console.log("NUEVO PLAN EDITADO", recalculatedPlan)

                                    updateTreatmentAtIndexTreatment(index, recalculatedPlan);
                                }}
                                type={type}
                                columnasPDF={columnasPDF}
                            />
                        )}
                    </div>
                    <div className="flex flex-col col-span-2 order-1 md:order-2 lg:order-2 justify-between gap-6">
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

                    <TreatmentList
                        plans={plans}
                        treatments={treatments}
                        columnasPDF={columnasPDF}
                        planNameKey="nombre"
                        currentDolarValue={currentDolarValue}
                        onCleanTreatments={cleanTreatments}
                        handleDeleteTreatment={handleDeleteTreatment}
                        fields={fields}
                        onSaveTreatment={(editPlan, index, editedTreatment) => {
                            const recalculatedPlan = {
                                ...editedTreatment,
                                productos: editedTreatment.productos.map((producto) => ({
                                    ...producto,
                                    costo: calcularCosto(producto),
                                })),
                                costoTotal: editedTreatment.productos.reduce((acc, producto) => {
                                    return acc + calcularCosto(producto);
                                }, 0),
                            };
                            console.log("NUEVO PLAN EDITADO", recalculatedPlan)

                            updateTreatmentAtIndex(editPlan, index, recalculatedPlan);
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
                    <XLSXDocument plans={plans} />
                </div>

            </div>
        </div>
    );
}

export default ModuleLayout;
