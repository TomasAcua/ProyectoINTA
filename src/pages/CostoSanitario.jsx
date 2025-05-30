import { useState, useRef } from "react";
import { FIELDS_COSTO_SANITARIO } from "../consts/costoSanitario"
import { calcularCostoSanitario } from "../utils/calcularCosto";
import useChartData from "../hooks/useChartData";
import Graphic from "../components/Graphic/Graphic";
import Dolar from "../components/Dolar/Dolar";
import PlanListB from "../components/PlansList/PlanListB";
import ProductForm from "../components/FormularioPlan/ProductForm";
import useProductForm from "../hooks/useProductForm";
import usePlanList from "../hooks/usePlanList";
import "../App.css";

function CostoSanitario() {

  const {
    productForms,
    addProductForm,
    handleInputChange,
    deleteProductForm,
    cleanProducts,
    isCurrentPlanValid,
    resetProductForms,
  } = useProductForm(FIELDS_COSTO_SANITARIO, calcularCostoSanitario, "productFormsSanitario")

  const { plans, showForm, addPlan, cleanPlans, showAddPlanForm } = usePlanList("plansCostoSanitario")

  const { chartData, chartOptions, isFormValid } = useChartData(plans)

  const columnasPDF = [
    { label: "Producto", key: "producto", required: true },
    { label: "Dosis", key: "dosis", required: true },
    { label: "Volumen", key: "volumen", required: true },
    { label: "Cantidad", key: "cantidad", required: true },
    { label: "Precio Unitario", key: "precioUnitario", required: true },
  ]

  const chartRef = useRef(null)

  // Estado para manejar el valor del dólar
  const [currentDolarValue, setCurrentDolarValue] = useState(
    localStorage.getItem("dolarOficial") || 0
  );

  // Actualiza el valor del dólar en el estado
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

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
        Visualizador de Costos Sanitarios
      </h1>
      <Dolar
        className="flex justify-center items-center w-full"
        onDolarChange={updateDolarValue}
      />

      {showForm && (
        <ProductForm
          fields={FIELDS_COSTO_SANITARIO}
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
      />

      <Graphic
        isFormValid={isFormValid}
        chartData={chartData}
        chartOptions={chartOptions}
        chartRef={chartRef}
        plans={plans}
        columnasPDF={columnasPDF}
      />
    </div>
  )
}

export default CostoSanitario