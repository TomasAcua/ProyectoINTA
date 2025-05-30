import { useState, useEffect, useMemo } from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer"
import { Bar } from 'react-chartjs-2'
import { BarChart2 } from 'lucide-react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

import Button from "../Button/Button"
import PDFDocument from '../PDFDocument/PDFDocument'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graphic = ({ isFormValid, chartData, chartOptions, chartRef, plans, columnasPDF }) => {

    // console.log('PLANS: ' + plans)
    const [chartImage, setChartImage] = useState(null);

    useEffect(() => {
        if (chartRef?.current) {
            setTimeout(() => {
                setChartImage(chartRef.current.toBase64Image('image/png', 6));
            }, 300);
        }
    }, [chartData, chartRef]);

    const plansToRender = useMemo(() => (

        plans.map(plan => ({
            ...plan,
            name: plan.nombre || plan.name,
            costoTotal: plan.costoTotal,
        }))
    ), [plans])

    return (
        <div className="border p-4 rounded bg-white shadow mb-6">
            <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="w-5 h-5 text-gray-700" />
                <h2 className="font-semibold text-lg">VISUALIZACIÓN GRÁFICA</h2>
            </div>
            {/* {console.log('chartData', chartData)} */}

            {isFormValid ? (
                <>
                    <div id="grafico" className="bg-white p-2">
                        {chartData && chartData.labels && chartData.labels.length > 0 ? (
                            <Bar ref={chartRef} data={chartData} options={chartOptions} />
                        ) : (
                            <p>No data</p>
                        )}
                    </div>
                    <div className="mt-4 flex gap-4">
                        <PDFDownloadLink
                            document={<PDFDocument chartImage={chartImage} plansToRender={plansToRender} columnasPDF={columnasPDF} />}
                            fileName="planes.pdf"
                        >
                            {({ loading }) =>
                                <Button
                                    className="bg-sky-500 hover:bg-blue-500 text-white px-4 py-2 rounded"
                                    disabled={loading}
                                >
                                    {loading ? 'Generando PDF...' : 'Descargar PDF'}
                                </Button>
                            }
                        </PDFDownloadLink>
                    </div>
                </>
            ) : (
                <p className="text-gray-600">Agrega 2 planes para la visualización gráfica</p>
            )}
        </div>
    )
}

export default Graphic