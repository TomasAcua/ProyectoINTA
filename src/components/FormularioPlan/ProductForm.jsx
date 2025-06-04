import { Plus, Trash2 } from "lucide-react";
import Button from "../Button/Button";
import ListaDesplegable from "../ListaDesplegable/ListaDesplegable";
import Input from "../Input/Input";
import { useEffect, useRef, useState } from "react";
import PrecioCombustibleInput from "../PrecioCombustibleInput/PrecioCombustibleInput";

const ProductForm = ({
  fields,
  productForms,
  handleInputChange,
  addProductForm,
  deleteProductForm,
  cleanProducts,
  handleCargarProductos,
}) => {
  const productRefs = useRef({});
  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    if (productForms.length > 0) {
      const lastProduct = productForms[productForms.length - 1];
      const ref = productRefs.current[lastProduct.id];
      if (ref) {
        ref.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setHighlightedId(lastProduct.id);
      const timeout = setTimeout(() => {
        setHighlightedId(null);
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [productForms]);

  return (
    <div className="rounded mb-6 w-[98%]">
      <div className="flex justify-between items-center my-4">
        <h2 className="font-semibold text-lg text-slate-800">
          CARGA DE PRODUCTOS Y COSTOS
        </h2>
        <Button
          onClick={addProductForm}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
        >
          <Plus size={16} />
          <span>Ingresar nuevo producto</span>
        </Button>
      </div>

      {productForms.map((product, index) => (
        <div
          key={product.id}
          ref={(el) => (productRefs.current[product.id] = el)}
          className={`mb-6 p-4 border border-gray-200 rounded-xl shadow-sm bg-white`}
        >
          {productForms.length > 0 && (
            <div className="px-2 flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl text-slate-800">
                Producto {index + 1}
              </h2>
            </div>
          )}
          <div className="flex gap-4">
            {fields.map((field) => {
              const value = product[field.key];
              const inputValue =
                value !== undefined && value !== ""
                  ? value
                  : typeof field.value === "function"
                  ? field.value(product)
                  : field.value ?? "";
              return (
                <div key={field.key} className="flex-1">
                  {field.type === "select" ? (
                    <ListaDesplegable
                      text={field.label}
                      name={field.key}
                      id={field.key}
                      array={
                        typeof field.options === "function"
                          ? field.options(product)
                          : field.options
                      }
                      value={product[field.key]}
                      onChange={(e) =>
                        handleInputChange(product.id, field.key, e.target.value)
                      }
                    />
                  ) : (
                    <Input
                      text={field.label}
                      type={field.type || "text"}
                      className={`border p-2 rounded w-full ${
                        product.errors[field.key]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder={field.label}
                      defaultValue={
                        typeof field.defaultValue === "function"
                          ? field.defaultValue(product)
                          : field.defaultValue
                      }
                      value={product[field.key]}
                      onChange={(e) =>
                        handleInputChange(product.id, field.key, e.target.value)
                      }
                      readOnly={field.readOnly}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center">
            <div className="mt-4 px-4">
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Costo por ha
              </label>
              <Input
                type="text"
                value={product.costo ? `$${product.costo}` : ""}
                readOnly
              />
            </div>
            <Button
              onClick={() => deleteProductForm(product.id)}
              className="text-white bg-red-700 px-3 py-2 transition-colors rounded-md flex items-center gap-2"
            >
              <Trash2 size={20} />
              <span>Eliminar Producto</span>
            </Button>
          </div>
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <Button
          onClick={handleCargarProductos}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded cursor-pointer"
        >
          Cargar Plan
        </Button>

        <Button
          onClick={cleanProducts}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded cursor-pointer"
        >
          Limpiar
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
