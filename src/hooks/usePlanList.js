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

    const addPlan = (treatments) => {

        // const productsArray = Array.isArray(treatments) ? treatments : Object.values(treatments)

        const newPlan = {
            id: crypto.randomUUID(),
            name: `Plan ${String.fromCharCode(65 + plans.length)}`,
            tratamientos: treatments,
            costoTotal: treatments.reduce((acc, treat) => acc + parseFloat(treat.costoTotal), 0)
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
    };

    const handleDeletePlan = (id) => {
        const updatedPlans = plans.filter(plan => plan.id !== id);
        setPlans(updatedPlans);
    };
    
    const updateTreatmentAtIndex = (editPlan, index, updatedTreatment) => {
        const updatedPlans = [...plans]

        updatedPlans[editPlan].tratamientos[index] = updatedTreatment

        setPlans(updatedPlans);
    };
    return {
        plans,
        showForm,
        addPlan,
        cleanPlans,
        showAddPlanForm,
        updatePlanAtIndex,
        handleDeletePlan,
        updateTreatmentAtIndex
    }
}

export default usePlanList