import { useRef, useState } from "react"
import { FIELDS_FERTILIZATION } from "../consts/fertilization"
import useProductForm from "../hooks/useProductForm"
import usePlanList from "../hooks/usePlanList"
import Chart from "../components/Chart/Chart"
import Dolar from "../components/Dolar/Dolar"
import ProductForm from "../components/FormularioPlan/ProductForm"
import useChartData from "../hooks/useChartData"
import PlanListB from "../components/PlansList/PlanListB"
import { calcularCostoFertilizacion } from "../utils/calcularCosto"
import QuickNavigate from "../components/QuickNavigate/QuickNavigate";


/**
 * Acá traemos la importacion de la lógica de los hooks y el renderizado de los componentes
 * Si queremos agregar estilos y demás, vamos a los componentes y los pasamos por classname como siempre
 * FALTA VER LO DEL DOLAR (linea 60 a 74) Y ALGUNAS COSITAS MAS
 * El resto de compos están (boton, titulo y seguro falten algunos chiches más) pero falta agregarlos
 */

const Fertilizacion = () => {

  // const camposFormulario = [
  //   { key: "producto", label: "Producto", required: true },
  //   { key: "unidad", label: "Unidad", required: true },
  //   { key: "dosis", label: "Dosis", required: true, type: "number" },
  //   { key: "presentacion", label: "Presentación", required: true },
  //   { key: "precio", label: "Precio", required: true, type: "number" },
  //   { key: "tratamientos", label: "Tratamientos", required: true, type: "number" }
  // ]

  const {
    productForms,
    addProductForm,
    handleInputChange,
    deleteProductForm,
    cleanProducts,
    isCurrentPlanValid,
    resetProductForms,
  } = useProductForm(FIELDS_FERTILIZATION, calcularCostoFertilizacion, "productFormsFertilization")

  const { plans, showForm, addPlan, cleanPlans, showAddPlanForm } = usePlanList("plansFertilizacion")

  const { chartData, chartOptions, isFormValid } = useChartData(plans)

  const columnasPDF = [
    { label: "Producto", key: "producto" },
    { label: "Unidad", key: "unidad" },
    { label: "Dosis", key: "dosis" },
    { label: "Presentación", key: "presentacion" },
    { label: "Precio", key: "precio" },
    { label: "Tratamientos", key: "tratamientos" },
    { label: "Costo", key: "costo" }
  ]

  // const { downloadPDF } = useGeneradorPDF();

  const chartRef = useRef(null) // <- buscar

  const [currentDolarValue, setCurrentDolarValue] = useState(
    localStorage.getItem("dolar") || 0
  );
  const [mostrarPDF, setMostrarPDF] = useState(false);
  const [chartImage, setChartImage] = useState(null);

  // Actualiza el valor del dólar en el estado
  const updateDolarValue = (newValue) => {
    setCurrentDolarValue(newValue);
  };

  // Handler para cargar productos como un nuevo plan
  const handleCargarProductos = () => {
    if (!isCurrentPlanValid()) {
      alert("Por favor, complete todos los datos requeridos.");
      return;
    }

    addPlan(productForms);
    resetProductForms();
  };


  return (
    <div className="p-6 bg-gray-50 text-black min-h-screen w-full font-sans flex flex-col items-center">
      <QuickNavigate/>
      <h1 className="text-3xl font-bold text-center">
        VISUALIZADOR DE COSTO{" "}
        <span className="text-gray-700">Fertilización</span>
      </h1>

      <Dolar onDolarChange={updateDolarValue} />

      {showForm && (
        <ProductForm
          fields={FIELDS_FERTILIZATION}
          productForms={productForms}
          handleInputChange={handleInputChange}
          addProductForm={addProductForm}
          deleteProductForm={deleteProductForm}
          cleanProducts={cleanProducts}
          handleCargarProductos={handleCargarProductos}
        />
      )}

      {/* <PlanList
        plans={plans}
        onAddPlan={showAddPlanForm}
        onCleanPlans={cleanPlans}
        currentDolarValue={currentDolarValue}
      /> */}

      <PlanListB
        plans={plans}
        columnasPDF={columnasPDF}
        planNameKey="nombre"
        currentDolarValue={currentDolarValue}
        onAddPlan={showAddPlanForm}
        onCleanPlans={cleanPlans}
      />

      <Chart
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

export default Fertilizacion
