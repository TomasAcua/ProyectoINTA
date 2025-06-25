import { useState, useEffect } from 'react';

/**
 * Hook flexible para formularios de productos
 */
const useProductForm = (fields, calcularCosto, storageKey = "productForms", precioCombustibleGlobal = 0) => {
    const defaultValues = fields.reduce((acc, field) => ({ ...acc, [field.key]: "" }), {});
    const defaultErrors = fields.reduce((acc, field) => ({ ...acc, [field.key]: "" }), {});

    const [productForms, setProductForms] = useState(() => {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
            return JSON.parse(stored).map(form => ({
                ...defaultValues,
                ...form,
                errors: { ...defaultErrors }
            }));
        }
        return [{ id: 1, ...defaultValues, errors: { ...defaultErrors } }]
    })

    const [lastProductId, setLastProductId] = useState(
        productForms.length ? productForms[productForms.length - 1].id : 1
    )

    const validate = (field, value) => {
       
        let error = ""
        if (field.required && !value) {
            error = `El campo ${field.label} es obligatorio`
        } else if (field.type === "number" && (isNaN(value) || parseFloat(value) <= 0)) {
            error = `El campo ${field.label} debe ser un número positivo`
        }
        return error
    }

    const handleInputChange = (id, key, value) => {
        const field = fields.find(f => f.key === key);
        const error = validate(field, value);

        const updatedProductForms = productForms.map(form => {
            if (form.id !== id) return form;

            const updatedForm = {
                ...form,
                [key]: value,
                errors: {
                    ...form.errors,
                    [key]: error
                }
            };

            // Recalcular solo los campos que dependan del campo modificado
            fields.forEach(f => {
                if (
                    typeof f.value === "function" &&
                    Array.isArray(f.dependsOn) &&
                    f.dependsOn.includes(key) &&
                    f.key !== key
                ) {
                    updatedForm[f.key] = f.value(updatedForm);
                }
            });

            if (key === "tractor") {
                updatedForm.implemento = "";
                updatedForm.errors.implemento = "";
            }

            updatedForm.costo = calcularCosto(updatedForm, precioCombustibleGlobal);
            return updatedForm;
        });

        setProductForms(updatedProductForms);
    };

    const addProductForm = () => {
        const newProduct = {
            id: lastProductId + 1,
            ...defaultValues,
            errors: { ...defaultErrors }
        };

        setProductForms(prev => [...prev, newProduct]);
        setLastProductId(id => id + 1);

        return newProduct;
    };

    const deleteProductForm = (id) => {
        if (productForms.length !== 1) {
            const newProductForms = productForms.filter((form) => form.id !== id)
            setProductForms(newProductForms)
        }
    }

    const cleanProducts = () => {
        if (productForms.length === 1) {
            const updatedProductForms = productForms.map((form) => ({
                ...form,
                ...defaultValues,
                errors: { ...defaultErrors }
            }));
            setProductForms(updatedProductForms)
        } else {
            setProductForms([{
                id: lastProductId,
                ...defaultValues,
                errors: { ...defaultErrors }
            }])
        }
    }

    const isCurrentPlanValid = () => {
        const updatedProductForms = productForms.map((form) => {
            const newErrors = {}
            fields.forEach(field => {
                newErrors[field.key] = validate(field, form[field.key])
            });
            return { ...form, errors: newErrors }
        })

        const valid = updatedProductForms.every((form) =>
            fields.every(field => form.errors[field.key] === "")
        )

        if (!valid) {
            setProductForms(updatedProductForms)
        }

        return valid
    }
    const resetProductForms = (newForms = null) => {
        if (Array.isArray(newForms)) {
            setProductForms(newForms);
        } else {
            setProductForms([{
                id: lastProductId + 1,
                ...defaultValues,
                errors: { ...defaultErrors }
            }]);
            setLastProductId(id => id + 1);
        }
    };


    useEffect(() => {
        const storedProductForms = productForms.map((form) => {
            const { errors, ...rest } = form
            return { ...rest }
        });
        localStorage.setItem(storageKey, JSON.stringify(storedProductForms))
    }, [productForms, storageKey])

    return {
        productForms,
        addProductForm,
        handleInputChange,
        deleteProductForm,
        cleanProducts,
        isCurrentPlanValid,
        resetProductForms
    }
}

export default useProductForm