import { useRef, useState } from "react";
import useProductForm from "../hooks/useProductForm";
import usePlanList from "../hooks/usePlanList";
import useGeneradorPDF from "../hooks/useGeneradorPDF";
import Graphic from "../components/Graphic/Graphic";
import Dolar from "../components/Dolar/Dolar";
import ProductForm from "../components/FormularioPlan/ProductForm";
import PlanList from "../components/PlansList/PlanList";
import Button from "../components/Button/Button";
import { FaArrowRight } from "react-icons/fa";
import { PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "../components/PDF/PDFDocument";

/**
 * Acá traemos la importacion de la lógica de los hooks y el renderizado de los componentes
 * Si queremos agregar estilos y demás, vamos a los componentes y los pasamos por classname como siempre
 * FALTA VER LO DEL DOLAR (linea 60 a 74) Y ALGUNAS COSITAS MAS
 * El resto de compos están (boton, titulo y seguro falten algunos chiches más) pero falta agregarlos
 */

const Fertilizacion = () => {
  const {
    productForms,
    addProductForm,
    handleInputChange,
    deleteProductForm,
    cleanProducts,
    isCurrentPlanValid,
    resetProductForms,
  } = useProductForm();

  const { plans, showForm, addPlan, cleanPlans, showAddPlanForm } = usePlanList();

  const { downloadPDF } = useGeneradorPDF();

  const chartRef = useRef(null); // <- buscar

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

  const generarPDF = () => {
    setMostrarPDF(true);
  };

  // Normaliza los planes para el gráfico y el PDF
  const plansToRender = plans.map((plan) => ({
    ...plan,
    name: plan.nombre,
    costoTotal: plan.total,
  }));

  return (
    <div className="p-6 bg-gray-50 text-black min-h-screen w-full font-sans flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center">
        VISUALIZADOR DE COSTO{" "}
        <span className="text-gray-700">Fertilización</span>
      </h1>

      <Dolar onDolarChange={updateDolarValue} />

      {showForm && (
        <ProductForm
          productForms={productForms}
          handleInputChange={handleInputChange}
          addProductForm={addProductForm}
          deleteProductForm={deleteProductForm}
          cleanProducts={cleanProducts}
          handleCargarProductos={handleCargarProductos}
        />
      )}

      <PlanList
        plans={plans}
        onAddPlan={showAddPlanForm}
        onCleanPlans={cleanPlans}
        currentDolarValue={currentDolarValue}
      />

      <Graphic plans={plansToRender} setChartImage={setChartImage} />

      <div className="flex flex-col items-center w-full">
        <Button
          onClick={generarPDF}
          className="flex items-center justify-center gap-x-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition hover:bg-sky-600 px-6 py-2 cursor-pointer h-10 text-center mt-6"
        >
          <span>Generar PDF</span>
          <span className="bg-sky-600 p-1 rounded">
            <FaArrowRight className="text-white" />
          </span>
        </Button>

        {mostrarPDF && (
          <div className="w-full flex justify-center mt-8">
            <PDFViewer width="80%" height="600">
              <PDFDocument
                chartImage={chartImage}
                plansToRender={plansToRender}
              />
            </PDFViewer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fertilizacion;
