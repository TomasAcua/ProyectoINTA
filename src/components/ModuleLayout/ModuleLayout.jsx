import { useState, useRef, useEffect } from "react";
import useChartData from "../../hooks/useChartData";
import useTreatment from "../../hooks/useTreatment";
import Chart from "../Chart/Chart";
import Dolar from "../Dolar/Dolar";
import PlanList from "../PlansList/PlanList";
import ProductForm from "../ProductForm/ProductForm";
import useProductForm from "../../hooks/useProductForm";
import usePlanList from "../../hooks/usePlanList";
import QuickNavigate from "../QuickNavigate/QuickNavigate";
import CalculatorTitle from "../CalculatorTitle/CalculatorTitle";
import PrecioCombustibleInput from "../PrecioCombustibleInput/PrecioCombustibleInput";
import XLSXDocument from "../XLSXDocument/XLSXDocument";
import { useLocation } from "react-router-dom";

const ModuleLayout = ({
  titulo,
  fields,
  calcularCosto,
  storageKey,
  columnasPDF,
  precioCombustible,
  setPrecioCombustible,
  type,
}) => {
  const location = useLocation().pathname.split("/")[1];
  const {
    productForms,
    addProductForm,
    handleInputChange,
    deleteProductForm,
    cleanProducts,
    isCurrentPlanValid,
    resetProductForms,
  } = useProductForm(fields, calcularCosto, storageKey, precioCombustible);
  const {
    treatments,
    addTreatment,
    cleanTreatments,
    showaddTreatmentForm,
    handleDeleteTreatment,
    updateTreatmentAtIndexTreatment,
  } = useTreatment("Treatment" + storageKey);
  const {
    plans,
    showForm,
    addPlan,
    cleanPlans,
    showAddPlanForm,
    updatePlanAtIndex,
    handleDeletePlan,
    updateTreatmentAtIndex,
    deleteTreatmentFromPlan,
  } = usePlanList("plans" + storageKey);

  const { chartData, chartOptions, isFormValid } = useChartData(
    plans,
    location
  );

  const [showChart, setShowChart] = useState(false);
  const chartRef = useRef(null);
  const toggleChart = () => setShowChart((prev) => !prev);

  const [currentDolarValue, setCurrentDolarValue] = useState(
    localStorage.getItem("dolarOficial") || 0
  );

  const updateDolarValue = (newValue) => {
    setCurrentDolarValue(newValue);
  };

  const handleCargarProductos = () => {
    if (!isCurrentPlanValid()) {
      alert("Por favor, complete todos los datos requeridos.");
      return;
    }
    addTreatment(productForms);
    resetProductForms();
  };

  useEffect(() => {
    const updatedForms = productForms.map((producto) => ({
      ...producto,
      costo: calcularCosto(producto),
    }));
    resetProductForms(updatedForms);
  }, [precioCombustible]);
  const handleAddPlan = () => {
    if (type === "Costo Maquinarias") {
         if (!precioCombustible || parseFloat(precioCombustible) <= 0) {
      alert("Debes ingresar un precio de combustible válido antes de guardar el plan.");
      return;
    }
      if (productForms.length === 0) {
        alert("Debes cargar al menos una maquinaria antes de guardar el plan.");
      }
      addPlan(productForms, "maquinarias");
      cleanProducts();
    } else {
      if (treatments.length === 0) {
        alert("Debes cargar al menos un tratamiento antes de guardar el plan.");
      }

      addPlan(treatments, "tratamientos");
      cleanTreatments();
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-gray-50">
      <CalculatorTitle title={titulo} />
      <div className="h-full rounded-none md:rounded-xl min-h-screen w-full md:w-[85%] mt-0 md:mt-5 overflow-hidden mx-auto px-2 sm:px-4">
        <QuickNavigate />

        <div className="grid lg:grid-cols-6 grid-cols-1 gap-4 items-start">
          <div className="lg:col-span-4 order-2  md:order-2 lg:order-1">
            {showForm && (
              <ProductForm
                cardId={location}
                plans={plans || []}
                treatments={treatments || []}
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
                    costoTotal: editedTreatment.productos.reduce(
                      (acc, producto) => {
                        return acc + calcularCosto(producto);
                      },
                      0
                    ),
                  };

                  updateTreatmentAtIndexTreatment(index, recalculatedPlan);
                }}
                type={type}
                columnasPDF={columnasPDF}
              />
            )}
          </div>
          <div className="flex flex-col col-span-2 order-1 md:order-1 lg:order-2 justify-between gap-6">
            <Dolar
              className="flex justify-center items-center "
              onDolarChange={updateDolarValue}
            />
            {type === "Costo Maquinarias" && (
              <PrecioCombustibleInput
                value={precioCombustible}
                onChange={(e) => setPrecioCombustible(e.target.value)}
                className={"flex justify-center"}
              />
            )}
          </div>
        </div>

        <div className="w-full px-4 flex flex-col items-center">
          <div className="my-4 h-0.5 border-t-0 bg-black/10 w-full"></div>
          {/* Plan List */}
          <PlanList
            plans={plans}
            columnasPDF={columnasPDF}
            currentDolarValue={currentDolarValue}
            onCleanPlans={cleanPlans}
            location={location}
            calcularCosto={calcularCosto}
            onSavePlan={(index, editedPlanYaCalculado) => {
              updatePlanAtIndex(index, editedPlanYaCalculado);
            }}
            fields={fields}
            handleDeletePlan={handleDeletePlan}
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

          <div className="my-4">
              <XLSXDocument plans={plans} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModuleLayout;
