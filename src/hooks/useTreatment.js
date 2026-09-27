import { useState, useEffect } from 'react'

/**
 * Acá manejamos los useState y useEffect del componente TreatmentList.jsx
 * @returns estados, handles, funciones necesarias
 */

const useTreatment = ( storageKey = "treatments") => {
    // Estado para almacenar todos los Treatmentes con detalles de productos
    // Controla mostrar u ocultar el formulario de carga
    const [treatments, setTreatments] = useState(() => {
        try {
            const stored = localStorage.getItem(storageKey)
            const parsed = stored ? JSON.parse(stored) : []
            return Array.isArray(parsed) ? parsed : []
        } catch (error) {
            console.error(`Error al leer "${storageKey}" desde localStorage:`, error)
            return []
        }
    });

    // Contador que solo crece: evita que se repitan nombres (ej. "Tratamiento 2")
    // cuando se borra un tratamiento y luego se agrega uno nuevo.
    const [treatmentCounter, setTreatmentCounter] = useState(() => {
        try {
            const stored = localStorage.getItem(storageKey + "Counter")
            if (stored !== null) return parseInt(stored, 10) || 0
        } catch (error) {
            console.error(`Error al leer el contador de "${storageKey}":`, error)
        }
        return treatments.length
    });

    const addTreatment = (productForms) => {

        const productsArray = Array.isArray(productForms) ? productForms : Object.values(productForms)

        const newTreatment = {
            id: crypto.randomUUID(),
            name:  `Tratamiento ${treatmentCounter + 1}`,
            productos: productsArray.map(({ id, ...content }) => content),
            costoTotal: productsArray.reduce((acc, prod) => acc + parseFloat(prod.costo), 0)
        };

        setTreatments([...treatments, newTreatment]);
        setTreatmentCounter((prev) => prev + 1);
    }

    const cleanTreatments = () => {
        setTreatments([]);
    };


    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(treatments));
    }, [treatments, storageKey])

    useEffect(() => {
        localStorage.setItem(storageKey + "Counter", String(treatmentCounter));
    }, [treatmentCounter, storageKey])

    const updateTreatmentAtIndexTreatment = (index, updatedTreatment) => {
       
        const updatedtreatments = [...treatments];

        updatedtreatments[index] = updatedTreatment;
        setTreatments(updatedtreatments);
    };


    const handleDeleteTreatment = (treatmentIndex) => {
    setTreatments((prev) => prev.filter((_, idx) => idx !== treatmentIndex));
    };
    

    return {
        treatments,
        addTreatment,
        cleanTreatments,
        handleDeleteTreatment,
        updateTreatmentAtIndexTreatment
    }
}
export default useTreatment