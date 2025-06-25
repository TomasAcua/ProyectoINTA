import { useState, useEffect, useMemo } from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer"
import { Bar } from 'react-chartjs-2'
import { ChartColumn, Maximize2, Minimize2 } from 'lucide-react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

import Button from "../Button/Button"
import PDFDocument from '../PDFDocument/PDFDocument'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ isFormValid, chartData, chartOptions, chartRef, plans, columnasPDF, showChart, toggleChart }) => {

    const [chartImage, setChartImage] = useState(null);

    useEffect(() => {
        if (showChart && chartRef?.current && chartData?.labels?.length > 0) {
            const timer = setTimeout(() => {
                try {
                    const image = chartRef.current.toBase64Image('image/png', 6);
                    setChartImage(image);
                } catch (e) {
                    console.error("Error generando imagen del gráfico:", e);
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [chartData, chartRef.current, showChart]);


    const plansToRender = useMemo(() => (

        plans.map(plan => ({
            ...plan,
            name: plan.nombre || plan.name,
            costoTotal: plan.costoTotal,
        }))
    ), [plans])

    return (
        <div className="w-full p-4 rounded-md bg-white shadow-lg ">
            <div className="flex items-center gap-2">
                <ChartColumn className="w-5 h-5 text-gray-700" />
                <h2 className="font-semibold text-lg">VISUALIZACIÓN GRÁFICA</h2>
                <Button
                    onClick={toggleChart}
                    className="cursor-pointer text-sm text-black hover:text-amber-500"
                >
                    {showChart ? <Minimize2 /> : <Maximize2 />}
                </Button>
            </div>

            {showChart && (
                isFormValid ? (
                    <>
                        <div className="bg-white p-2 mt-4 w-full h-[400px]">
                            {chartData && chartData.labels && chartData.labels.length > 0 ? (
                                <Bar ref={chartRef} data={chartData} options={chartOptions} />
                            ) : (
                                <p className="text-gray-600">No hay datos para mostrar</p>
                            )}
                        </div>
                        <div className="mt-6">
                            {chartImage && (
                                <PDFDownloadLink
                                    document={
                                        <PDFDocument
                                            chartImage={chartImage} 
                                            plansToRender={plansToRender}
                                            columnasPDF={columnasPDF}
                                        />
                                    }
                                    fileName={`planes.pdf`}
                                >
                                    {({ loading }) => (
                                        <Button
                                            className="bg-sky-500 hover:bg-blue-500 text-white px-4 py-2 rounded"
                                            disabled={loading}
                                        >
                                            {loading ? "Generando PDF..." : "Descargar PDF"}
                                        </Button>
                                    )}
                                </PDFDownloadLink>

                            )}
                        </div>
                    </>
                ) : (
                    <p className="text-gray-600 mt-4">
                        Agrega 2 planes para la visualización gráfica
                    </p>
                )
            )}
        </div>
    );

}

export default Chart