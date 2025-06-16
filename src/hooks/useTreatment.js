import { useState, useEffect } from 'react'

/**
 * Básicamente acá manejamos los useState y useEffect del componente TreatmentList.jsx
 * @returns estados, handles, funciones necesarias
 */

const useTreatment = (storageKey = "treatments") => {

    // Estado para almacenar todos los Treatmentes con detalles de productos
    // Controla mostrar u ocultar el formulario de carga
    const [treatments, setTreatments] = useState(JSON.parse(localStorage.getItem(storageKey)) || []);
    //     {Object.keys(subjects).map((keyName, i) => (
    //     <li className="travelcompany-input" key={i}>
    //         <span className="input-label">key: {i} Name: {subjects[keyName]}</span>
    //     </li>
    // ))}

    const addTreatment = (productForms) => {

        const productsArray = Array.isArray(productForms) ? productForms : Object.values(productForms)

        const newTreatment = {
            id: crypto.randomUUID(),
            name:  `Tratamiento ${treatments.length +1}`,
            productos: productsArray.map(({ id, ...content }) => content),
            costoTotal: productsArray.reduce((acc, prod) => acc + parseFloat(prod.costo), 0)
        };

        setTreatments([...treatments, newTreatment]);
    }

    const cleanTreatments = () => {
        setTreatments([]);
    };


    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(treatments));
    }, [treatments, storageKey])

    const updateTreatmentAtIndexTreatment = (index, updatedTreatment) => {
       
        const updatedtreatments = [...treatments];

        updatedtreatments[index] = updatedTreatment;
        setTreatments(updatedtreatments);
    };
    console.log("TREATMENTS", treatments)
    const handleDeleteTreatment = (planId, id) => {
        const updatedtreatments = treatments.filter(Treatment => Treatment.id !== id);
        setTreatments(updatedtreatments);
    };

    return {
        treatments,
        addTreatment,
        //cleanTreatments,
        cleanTreatments,
        handleDeleteTreatment,
        updateTreatmentAtIndexTreatment
    }
}
export default useTreatment