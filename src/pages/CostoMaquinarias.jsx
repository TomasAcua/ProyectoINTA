/*import FormularioMaquinaria from "../components/FormularioMaquinaria/FormularioMaquinaria";
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import Input from "../components/Input/Input";
import { PDFViewer } from "@react-pdf/renderer";
import Graphic from "../components/Graphic/Graphic";
import Button from "../components/Button/Button";
import PDFDocument from "../components/PDF/PDFDocument";
import Dolar from "../components/Dolar/Dolar";
import MaquinariasIngresadas from "../components/MaquinariasIngresadas/MaquinariasIngresadas"
const CostoMaquinaria =()=>{
  const [chartImage, setChartImage] = useState(null);
  const [mostrarPDF, setMostrarPDF] = useState(false);
  const [precioCombustible, setPrecioCombustible] =useState(localStorage.getItem("precioCombustible") || 0);
  const [mostrarMaquinarias, setMostrarMaquinarias] = useState(() => {
  return JSON.parse(localStorage.getItem("mostrarMaquinarias")) || false;
});
 const [costoMaquinaria, setCostoMaquinaria] = useState(() => {
    const costosGuardados = localStorage.getItem("maquinariaFormulario");
    return costosGuardados
      ? JSON.parse(costosGuardados)
      : [];
    });
    useEffect(()=>{
      localStorage.setItem("precioCombustible", precioCombustible)
    }, [precioCombustible])
  useEffect(() => {
    localStorage.setItem("maquinariaFormulario", JSON.stringify(costoMaquinaria));
  }, [costoMaquinaria]);

  const agregarFormulario = () => {
    setCostoMaquinaria((prev) => [
      ...prev,
      { name: `Informe Maquinaria ${prev.length + 1}`,  
      form: { tractor: "", implemento: "", totalMaquinaria: ""},
      precioCombustible: "" },
    ]);
  };

  // Estado para manejar el valor del dólar
  const [currentDolarValue, setCurrentDolarValue] = useState(
    localStorage.getItem("dolarOficial") || 0
  );

  // Actualiza el valor del dólar en el estado
  const updateDolarValue = (newValue) => {
    setCurrentDolarValue(newValue);
  };

  const generarPDF = () => {
    setMostrarPDF(true);
  };

    const eliminarFormulario = (id) => {
    const nuevoCostoMaquinaria = costoMaquinaria.filter((_, index) => index !== id);
  setCostoMaquinaria(nuevoCostoMaquinaria);
  localStorage.setItem("maquinariaFormulario", JSON.stringify(nuevoCostoMaquinaria));
  };
const actualizarCostoMaquinaria = (index, nuevosDatos) => {
  setCostoMaquinaria((prev) => {
    const nuevoCostoMaquinaria = [...prev];
    nuevoCostoMaquinaria[index] = {
      ...nuevoCostoMaquinaria[index],
      ...nuevosDatos,
    };
    return nuevoCostoMaquinaria;
  });
};

useEffect(() => {
  if (costoMaquinaria.length === 0) {
    setMostrarMaquinarias(false);
    localStorage.setItem("mostrarMaquinarias", false);
  }
}, [costoMaquinaria]);

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <main className="flex-1 flex flex-col items-center justify-center w-full px-6 py-6">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
          Visualizador de Costos Sanitarios
        </h1>
        <Dolar
          className="flex justify-center items-center w-full"
          onDolarChange={(valor) => setCurrentDolarValue(valor)}
        />

        <div className="flex flex-col items-center gap-y-6 w-full">
          {/* Botón de agregar formulario }
         /*<Button
            onClick={agregarFormulario}
            className="flex items-strech justify-between gap-x-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition hover:bg-sky-600 pl-2 cursor-pointer h-8 text-center"
          >
                 
            <span>Agregar Nueva Maquinaria</span>
            <span className="bg-sky-600 p-1 rounded">
              <FaPlus className="text-white" />
            </span>
          </Button>
<Input
          text="Precio Combustible"
          name="precioCombustible"
          type="number"
          value={precioCombustible}
          onChange={(e) => setPrecioCombustible(e.target.value)}
        />
          {/* Lista de formularios }
          /*<div className="w-full max-w-4xl space-y-4">
            {costoMaquinaria.map((costoMaq, index) => (
              <div
                key={index}
                className="border p-4 rounded shadow-sm bg-white"
              >
                <FormularioMaquinaria
                  formId={index}
                  form={costoMaq.form || { tractor: "", implemento: "", precioCombustible: "" }}
                  
   onActualizarFormulario={(nuevoForm) => actualizarCostoMaquinaria(index, { form: nuevoForm })
  }
   onCalculoRealizado={() => {
    setMostrarMaquinarias(true);
    localStorage.setItem("mostrarMaquinarias", true);}}
                  precioCombustible={precioCombustible}
                  //setCostoMaquinaria={setCostoMaquinaria}
                  onEliminar={() => eliminarFormulario(index)}
                />
              </div>
            ))}
          </div>

          {/* Maquinarias ingresadas y gráfico }
         
 /* <div className="w-full max-w-4xl p-6 rounded-lg shadow bg-white">
     {mostrarMaquinarias && (
            <>
    <h2 className="text-xl font-semibold mb-4">Maquinarias Ingresadas</h2>
    <MaquinariasIngresadas
      costoMaquinaria={costoMaquinaria}
      dolar={currentDolarValue}
      precioCombustible={precioCombustible}
    />
  
  </>
)}
    
          </div>

        
          
        </div>
      </main>
    </div>
  );
}
export default CostoMaquinaria*/
import { useState, useRef } from "react";
import { FIELDS_COSTO_MAQUINARIAS } from "../consts/maquinarias"
import { calcularCostoTotalMaquinaria } from "../utils/calcularCosto";
import { maquinas } from "../assets/resources/maquinas";
import useChartData from "../hooks/useChartData";
import Chart from "../components/Chart/Chart";
import Dolar from "../components/Dolar/Dolar";
import PlanListB from "../components/PlansList/PlanListB";
import ProductForm from "../components/FormularioPlan/ProductForm";
import useProductForm from "../hooks/useProductForm";
import usePlanList from "../hooks/usePlanList";
import "../App.css";
import QuickNavigate from "../components/QuickNavigate/QuickNavigate";



function CostoMaquinaria() {

  const {
    productForms,
    addProductForm,
    handleInputChange,
    deleteProductForm,
    cleanProducts,
    isCurrentPlanValid,
    resetProductForms,
  } = useProductForm(FIELDS_COSTO_MAQUINARIAS, calcularCostoTotalMaquinaria, "maquinariasForm")

  const { plans, showForm, addPlan, cleanPlans, showAddPlanForm } = usePlanList("plansMaquinarias")

  const { chartData, chartOptions, isFormValid } = useChartData(plans)

  const [showChart, setShowChart] = useState(false)
  const toggleChart = () => {
    setShowChart(prev => !prev)
  }

  const columnasPDF = [
    { label: "Tractor", key: "tractor", required: true },
    { label: "Implemento", key: "implemento", required: true },
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

  const handleCargarProductos = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!isCurrentPlanValid()) {
      alert("Por favor, complete todos los datos requeridos.");
      return;
    }
    addPlan(productForms);
    resetProductForms();
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <QuickNavigate/>
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
        Visualizador de Costos Maquinarias
      </h1>
      <Dolar
        className="flex justify-center items-center w-full"
        onDolarChange={updateDolarValue}
      />

      {showForm && (
        <ProductForm
          fields={FIELDS_COSTO_MAQUINARIAS}
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
    </div>
  )
}

export default CostoMaquinaria