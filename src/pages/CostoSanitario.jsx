import React, { useState, useEffect } from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { PDFViewer } from "@react-pdf/renderer";
import Graphic from "../components/Graphic/Graphic";
import FormularioPlan from "../components/FormularioPlan/FormularioPlan";
import Button from "../components/Button/Button";
import PlansList from "../components/PlansList/PlansList";
import PDFDocument from "../components/PDF/PDFDocument";
import Dolar from "../components/Dolar/Dolar";
import "../App.css";
import QuickNavigate from '../components/QuickNavigate/QuickNavigate';


function CostoSanitario() {
  const [chartImage, setChartImage] = useState(null);
  const [mostrarPDF, setMostrarPDF] = useState(false);
  const [plans, setPlans] = useState(() => {
    const storedPlans = localStorage.getItem("productosPorFormulario");
    return storedPlans
      ? JSON.parse(storedPlans)
      : [{ name: "Plan 1", productos: [], costoTotal: 0 }];
  });

  useEffect(() => {
    localStorage.setItem("productosPorFormulario", JSON.stringify(plans));
  }, [plans]);

  const agregarFormulario = () => {
    setPlans((prev) => [
      ...prev,
      { name: `Plan ${prev.length + 1}`, productos: [], costoTotal: 0 },
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
    setPlans((prev) => prev.filter((_, index) => index !== id));
    const guardados = localStorage.getItem("productosPorFormulario") || {};
    delete guardados[id];
    localStorage.setItem("productosPorFormulario", JSON.stringify(guardados));
  };
  const editarProducto = (planIndex, productoIndex, nuevosValores) => {
    setPlans((prev) => {
      const nuevosPlanes = [...prev];
      nuevosPlanes[planIndex].productos[productoIndex] = {
        ...nuevosPlanes[planIndex].productos[productoIndex],
        ...nuevosValores,
      };
      nuevosPlanes[planIndex].costoTotal = nuevosPlanes[
        planIndex
      ].productos.reduce(
        (acc, p) => acc + p.cantidad * p.precioUnitario, // También corregí `prexioUnitario` a `precioUnitario`
        0
      );
      return nuevosPlanes;
    });
  };
  const eliminarProducto = (planIndex, productoIndex) => {
    setPlans((prev) => {
      const nuevosPlanes = [...prev];
      nuevosPlanes[planIndex] = {
        ...nuevosPlanes[planIndex],
        productos: nuevosPlanes[planIndex].productos.filter(
          (_, idx) => idx !== productoIndex
        ),
      };
      return nuevosPlanes;
    });
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50">
      <main className="flex-1 flex flex-col items-center justify-center w-full px-6 py-6">
      <QuickNavigate/>
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
          Visualizador de Costos Sanitarios
        </h1>
        <Dolar
          className="flex justify-center items-center w-full"
          onDolarChange={(valor) => setCurrentDolarValue(valor)}
        />

        <div className="flex flex-col items-center gap-y-6 w-full">
          {/* Botón de agregar formulario */}
          <Button
            onClick={agregarFormulario}
            className="flex items-strech justify-between gap-x-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition hover:bg-sky-600 pl-2 cursor-pointer h-8 text-center"
          >
            <span>Agregar Nuevo Plan</span>
            <span className="bg-sky-600 p-1 rounded">
              <FaPlus className="text-white" />
            </span>
          </Button>

          {/* Lista de formularios */}
          <div className="w-full max-w-4xl space-y-4">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="p-4 rounded shadow-sm bg-white"
              >
                <FormularioPlan
                  formId={index}
                  plans={plans}
                  setPlans={setPlans}
                  onEliminar={() => eliminarFormulario(index)}
                />
              </div>
            ))}
          </div>

          {/* Planes ingresados y gráfico */}
          <div className="w-full max-w-4xl p-6 rounded-lg shadow bg-white">
            <h2 className="text-xl font-semibold mb-4">Planes Ingresados</h2>
            <PlansList
              plans={plans}
              dolar={currentDolarValue}
              editarProducto={editarProducto}
              eliminarProducto={eliminarProducto}
            />
            {plans.length > 1 && (
              <div className="mt-6">
                <Graphic plans={plans} setChartImage={setChartImage} />
              </div>
            )}
          </div>

          {/* Botón de generar PDF */}
          <Button
            onClick={generarPDF}
            className="flex items-strech justify-between gap-x-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition hover:bg-sky-600 pl-2 cursor-pointer h-8 text-center"
          >
            <span>Generar PDF</span>
            <span className="bg-sky-600 p-1 rounded">
              <FaArrowRight className="text-white" />
            </span>
          </Button>

          {/* PDF Viewer */}
          {mostrarPDF && (
            <div className="w-full flex justify-center mt-8">
              <PDFViewer width="80%" height="600">
                <PDFDocument chartImage={chartImage} plansToRender={plans} />
              </PDFViewer>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default CostoSanitario;
