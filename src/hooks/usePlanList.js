import { useState, useEffect } from 'react'

/**
 * Básicamente acá manejamos los useState y useEffect del componente PlanList.jsx
 * @returns estados, handles, funciones necesarias
 */

const usePlanList = (storageKey = "plans") => {

    // Estado para almacenar todos los planes con detalles de productos
    // Controla mostrar u ocultar el formulario de carga
    const [plans, setPlans] = useState(() => {
        try {
            const stored = localStorage.getItem(storageKey)
            const parsed = stored ? JSON.parse(stored) : []
            return Array.isArray(parsed) ? parsed : []
        } catch (error) {
            console.error(`Error al leer "${storageKey}" desde localStorage:`, error)
            return []
        }
    });
    const [showForm, setShowForm] = useState(true);

    // Contador que solo crece: evita que se repitan nombres (ej. "Plan C")
    // cuando se borra un plan y luego se agrega uno nuevo.
    const [planCounter, setPlanCounter] = useState(() => {
        try {
            const stored = localStorage.getItem(storageKey + "Counter")
            if (stored !== null) return parseInt(stored, 10) || 0
        } catch (error) {
            console.error(`Error al leer el contador de "${storageKey}":`, error)
        }
        return plans.length
    });

    const addPlan = (data, type = "tratamientos") => {
        const isTratamientos = type === "tratamientos"
        const costoTotal = isTratamientos
            ? data.reduce((acc, item) => acc + parseFloat(item.costoTotal), 0)
            : data.reduce((acc, item) => acc + parseFloat(item.costo), 0)

        const newPlan = {
            id: crypto.randomUUID(),
            name: `Plan ${String.fromCharCode(65 + planCounter)}`,
            [type]: data,
            costoTotal
        };

        setPlans([...plans, newPlan]);
        setPlanCounter((prev) => prev + 1);
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

    useEffect(() => {
        localStorage.setItem(storageKey + "Counter", String(planCounter));
    }, [planCounter, storageKey])

    
    const updatePlanAtIndex = (index, updatedPlan) => {
  setPlans((prevPlans) => {
    const updatedPlans = [...prevPlans];
    updatedPlans[index] = updatedPlan;
    return updatedPlans;
  });
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
    const deleteTreatmentFromPlan = (planIndex, treatmentIndex) => {
  setPlans((prevPlans) => {
    const updatedPlans = [...prevPlans];
    const selectedPlan = updatedPlans[planIndex];
    if (!selectedPlan) return prevPlans;
    if (selectedPlan.tratamientos.length === 1) {
      const plansWithoutThisOne = updatedPlans.filter((_, i) => i !== planIndex);
      return plansWithoutThisOne;
    }
    updatedPlans[planIndex] = {
      ...selectedPlan,
      tratamientos: selectedPlan.tratamientos.filter((_, i) => i !== treatmentIndex),
    };
    return updatedPlans;
  });
};
    return {
        plans,
        showForm,
        addPlan,
        cleanPlans,
        showAddPlanForm,
        updatePlanAtIndex,
        handleDeletePlan,
        updateTreatmentAtIndex,
        deleteTreatmentFromPlan
    }
}

export default usePlanList