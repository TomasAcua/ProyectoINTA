import { useState, useEffect } from 'react'

/**
 * Básicamente acá manejamos los useState y useEffect del componente PlanList.jsx
 * @returns estados, handles, funciones necesarias
 */

const usePlanList = (storageKey = "plans") => {

    // Estado para almacenar todos los planes con detalles de productos
    // Controla mostrar u ocultar el formulario de carga
    const [plans, setPlans] = useState(JSON.parse(localStorage.getItem(storageKey)) || []);
    const [showForm, setShowForm] = useState(true);

    //     {Object.keys(subjects).map((keyName, i) => (
    //     <li className="travelcompany-input" key={i}>
    //         <span className="input-label">key: {i} Name: {subjects[keyName]}</span>
    //     </li>
    // ))}

    const addPlan = (productForms) => {
        
        const productsArray = Array.isArray(productForms) ? productForms : Object.values(productForms)
  
        const newPlan = {
            name: `Plan ${String.fromCharCode(65 + plans.length)}`,
            productos: productsArray.map(({ id, ...content }) => content),
            costoTotal: productsArray.reduce((acc, prod) => acc + parseFloat(prod.costo), 0)
        };

        setPlans([...plans, newPlan]);
        setShowForm(true);
    }

    const cleanPlans = () => {
        setPlans([]);
        setShowForm(true)
    };

    const showAddPlanForm = () => {
        setShowForm(true);
    };

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(plans));
    }, [plans, storageKey])

    const updatePlanAtIndex = (index, updatedPlan) => {
  const updatedPlans = [...plans];
  updatedPlans[index] = updatedPlan;
  setPlans(updatedPlans);
  localStorage.setItem("plansMaquinarias", JSON.stringify(updatedPlans));
};


    return {
        plans,
        showForm,
        addPlan,
        cleanPlans,
        showAddPlanForm,
        updatePlanAtIndex
    }
}

export default usePlanList