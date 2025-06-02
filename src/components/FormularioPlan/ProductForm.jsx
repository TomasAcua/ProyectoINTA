import { Plus, Trash2 } from "lucide-react";
import Button from "../Button/Button";
import ListaDesplegable from "../ListaDesplegable/ListaDesplegable";
import Input from "../Input/Input"

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
    <div className="rounded mb-6 w-[90%]">
      <h2 className="font-semibold text-lg mb-4">
        CARGA DE PRODUCTOS Y COSTOS
      </h2>
      
      {productForms.map((product) => (
        <div key={product.id} className="mb-4 p-2 border rounded">
             {productForms.length > 0 && (
              <div className="flex justify-end">
              <Button
                onClick={() => deleteProductForm(product.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-100 px-3 py-2 transition-color rounded-md border border-gray-200 hover:border-red-100"
              >
                <Trash2 size={20} />
              </Button>
              </div>
            )}
          <div className="grid lg:grid-cols-3 gap-4 mb-2 sm:grid-cols-1 px-4">
            {console.log("Fields en ProductForm: ", fields)}
            {fields.map((field) => (
              <div key={field.key}>
                {
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
                    <Input
                    text={field.label}
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
            
              <div>
                <label className="block text-sm">Costo por ha</label>
                <Input
                  type="text"
                  className="w-full border p-2 rounded bg-gray-100"
                  value={product.costo ? `$${product.costo}` : ""}
                  readOnly
                />
              </div>
            

         
          </div>
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <Button
          onClick={addProductForm}
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          <Plus size={16} />
          <span>Añadir producto</span>
        </Button>

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
