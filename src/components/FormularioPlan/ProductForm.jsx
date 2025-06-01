import { Plus, CircleX } from "lucide-react";
import Button from "../Button/Button";
import ListaDesplegable from "../ListaDesplegable/ListaDesplegable";

const ProductForm = ({
  fields,
  productForms,
  handleInputChange,
  addProductForm,
  deleteProductForm,
  cleanProducts,
  handleCargarProductos,
}) => {

  
  

  return (
    <div className="border p-4 rounded mb-6 bg-white shadow">
      <h2 className="font-semibold text-lg mb-4">
        CARGA DE PRODUCTOS Y COSTOS
      </h2>
      
      {productForms.map((product) => (
        <div key={product.id} className="mb-4 p-2 border rounded">
          <div className="grid grid-cols-3 gap-4 mb-2">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm">{field.label}</label>
                {
                  /*field.type === "select" ? (
                                    <ListaDesplegable
                                        text={field.label}
                                        name={field.key}
                                        id={field.key}
                                        array={field.options}
                                        value={product[field.key]}
                                        onChange={e => handleInputChange(product.id, field.key, e.target.value)}
                                    />
                                ) : (
                                    <input
                                        type={field.type || "text"}
                                        className={`w-full border p-2 rounded ${product.errors[field.key] ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder={field.label}
                                        value={product[field.key]}
                                        onChange={e => handleInputChange(product.id, field.key, e.target.value)}
                                        readOnly={field.readOnly}
                                    />
                                )*/
                  field.type === "select" ? (
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
                    <input
                      type={field.type || "text"}
                      className={`w-full border p-2 rounded ${
                        product.errors[field.key]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder={field.label}
                      value={product[field.key]}
                      onChange={(e) =>
                        handleInputChange(product.id, field.key, e.target.value)
                      }
                      readOnly={field.readOnly}
                    />
                  )
                }

                {product.errors[field.key] && (
                  <p className="text-red-500 text-xs">
                    {product.errors[field.key]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            {product.costo !== undefined && (
              <div>
                <label className="block text-sm">Costo por ha</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded bg-gray-100"
                  value={product.costo ? `$${product.costo}` : ""}
                  readOnly
                />
              </div>
            )}

            {productForms.length > 1 && (
              <Button
                onClick={() => deleteProductForm(product.id)}
                className="text-red-500 bg-red-100 hover:text-red-700"
              >
                <CircleX size={18} />
              </Button>
            )}
          </div>
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <Button
          onClick={addProductForm}
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          <Plus size={16} />
          <span>Añadir producto</span>
        </Button>

       <Button
          onClick={handleCargarProductos}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
        >
          Cargar Plan
        </Button>

        <Button
          onClick={cleanProducts}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded"
        >
          Limpiar
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
