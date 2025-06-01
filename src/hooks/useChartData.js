import { useMemo } from 'react';

/**
 * Básicamente acá manejamos los useState y useEffect del componente Chart.jsx
 * useMemo es un hook de react que 'guarda' el resultado de una funcion
 * En este caso lo usamos para que 'guarde' lo que se calcula en Chart.jsx y no vuelva a calcularse acá. Si usaramos un useEffect se generaría un gráfico todo el tiempo cuando se renderice la app, aunque no tngamos nada. Si no se detectan cambios en los 'plans' entonces se sigue calculando con los resultados de antes.
 * @returns estados, handles, funciones necesarias
 */

const useChartData = (plans) => {

    const hasProducts = plans.some(plan => plan.productos && plan.productos.length > 0)

    const datasets = [
        {
            label: "Costo",
            data: plans.map((plan) => plan.costoTotal ?? plan.total),
            backgroundColor: 'rgba(234, 144, 95, 0.59)',
            borderColor: 'rgb(228,109,48)', 
            borderWidth: 1,
        }
    ]

    const chartData = useMemo(() => ({
        labels: plans.map((plan) => plan.name || plan.nombre),
        datasets: datasets
    }), [plans])

    if (hasProducts) {
        datasets.push({
            label: "Cantidad de Principios Activos",
            data: plans.map(plan => plan.productos.reduce((acc, producto) => acc + (producto.cantidad || 0), 0)),
            backgroundColor: 'rgba(108, 172, 140, 0.57)',
            borderColor: 'rgb(20,107,59)',
            borderWidth: 1,
        })
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: { size: 12 },
                    color: '#333'
                }
            },
            title: {
                display: true,
                text: 'Comparación de costos por Plan',
                font: { size: 18 }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.raw;
                        return `${label}: ${value.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grace: '10%',
                title: {
                    display: true,
                    text: 'Valores',
                    font: { size: 14 }
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Planes',
                    font: { size: 14 }
                }
            }
        }
    };

    const isFormValid = plans.length >= 2

    return { chartData, chartOptions, isFormValid }
};

export default useChartData