import { ROUTES } from '../const/routes'

export const cardData = [
    {
      id: "sanitario",
      title: "Cálculos de Plan Sanitario",
      subtitle: "Optimización de costos en tratamientos sanitarios",
      description:
        "Este módulo permite calcular el costo total de tratamientos sanitarios en función de los productos utilizados. Se pueden evaluar diferentes estrategias de control, comparar productos específicos y el gasto total por hectárea, ayudando a tomar decisiones más estratégicas de prevención y control.",
      icon: 'Leaf',
      color: "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500",
      href: ROUTES.costoSanitario,
    },
    {
      id: "fertilizar",
      title: "Cálculos de Insumos para Fertilizar",
      subtitle: "Análisis de costos en fertilización y tratamiento de suelos",
      description:
        "Este módulo permite calcular el costo de fertilización por hectárea considerando diferentes productos, dosis y estrategias aplicadas. Integra la eficiencia económica de los planes de fertilización.",
      icon: 'Pill',
      color: "bg-gradient-to-br from-blue-600 via-indigo-500 to-sky-500",
      
      href: ROUTES.fertilizacion,
    },
    {
      id: "maquinaria",
      title: "Cálculos de Maquinaria",
      subtitle: "Evaluación de costos operativos y mantenimiento de equipos",
      description:
        "Aquí se pueden calcular los costos de operación de tractores y implementos, incluyendo gastos de combustible, mantenimiento y depreciación. También permite incluir la planificación de maquinaria y la eficiencia del uso de la misma en las tareas productivas.",
      icon: 'Tractor',
      color: "bg-gradient-to-br from-yellow-500 via-amber-500 to-red-500",
      href: ROUTES.costoMaquinaria,
  }
];

