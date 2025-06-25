import { ROUTES } from '../const/routes'

export const cardData = [
    {
      id: "costo-sanitario",
      name:"Fitosanitario",
      title: "Planes Sanitarios",
      subtitle: "",
      description:
        "Este módulo permite calcular los costos de los insumos de un plan fitosanitario y comparar planes alternativos. Se pueden evaluar diferentes estrategias de control, analizar productos específicos y estimar el gasto total por hectárea. La herramienta facilita la toma de decisiones más eficientes, adaptadas a las necesidades productivas y económicas del productor",
      icon: 'Pill',
      color: "bg-gradient-to-br from-blue-600 via-indigo-500 to-sky-500",
      href: ROUTES.costoSanitario,
    },
    {
      id: "fertilizacion",
      title: "Planes de Fertilizacion",
      name: "Fertilización",
      subtitle: "",
      description:
        "Este módulo permite estimar el costo de los insumos de un plan de fertilización. Ofrece la posibilidad de comparar distintas estrategias nutricionales y calcular el gasto total de fertilizantes por hectárea, brindando información clave para optimizar las decisiones agronómicas y económicas.",
      icon: 'Leaf',
      color: "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500",
      
      href: ROUTES.fertilizacion,
    },
    {
      id: "costo-maquinaria",
      name: "Maquinaria",
      title: "Maquinaria",
      subtitle: "",
      description:"Este módulo permite estimar los costos asociados al uso de distintos conjuntos de maquinaria agrícola. Facilita la comparación entre alternativas mecánicas según el tipo de labores y los equipos involucrados, brindando información para cuantificar los costos de maquinaria asociados a distintas tareas del campos.",
      icon: 'Tractor',
      color: "bg-gradient-to-br from-yellow-500 via-amber-500 to-red-500",
      href: ROUTES.costoMaquinaria,
  }
];

