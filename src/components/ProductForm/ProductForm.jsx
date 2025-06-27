import { Plus, Trash2 } from "lucide-react";
import Button from "../Button/Button";
import ListaDesplegable from "../ListaDesplegable/ListaDesplegable";
import Input from "../Input/Input";
import TreatmentList from "../Treatment/Treatment";
import { cardData } from "../../data/cardHomeData";
import { useEffect, useRef, useState } from "react";
import { Leaf, Pill, Truck } from "lucide-react";

const ProductForm = ({
  cardId,
  plans,
  fields,
  treatments,
  productForms,
  handleInputChange,
  addProductForm,
  deleteProductForm,
  cleanProducts,
  handleCargarProductos,
  type,
  handleAddPlan,
  onCleanTreatments,
  handleDeleteTreatment,
  onSaveTreatment,
  columnasPDF,
}) => {
  const productRefs = useRef({});
  const [highlightedId, setHighlightedId] = useState(null);
  const iconMap = {
    Leaf: <Leaf />,
    Pill: <Pill />,
    Tractor: <Truck />,
  };

  const bgMap = {
    "costo-sanitario": "bg-blue-500",
    "costo-maquinaria": "bg-orange-600",
    fertilizacion: "bg-sipan-green",
  };
  const cardItem = cardData.find((card) => card.id === cardId);
  const icon = cardItem ? iconMap[cardItem.icon] : null;
  const bgColor = bgMap[cardId];

  return (
    <div className="rounded-lg mb-6 w-full bg-white shadow-lg px-0 md:px-5 lg:px-5">
      <div className="flex justify-between items-center flex-col md:flex-row">
        <div className="flex justify-between flex-col mb-2">
          <h2 className="text-xl font-bold text-gray-700 flex items-center gap-1">
            <div
              className={`${bgColor} flex items-center justify-center w-12 p-2 rounded-xl text-white flex-c my-3 mr-2`}
            >
              {icon}
            </div>
            Carga de Plan{" "}
            {plans && plans.length > 0
              ? String.fromCharCode(65 + plans.length)
              : "A"}
          </h2>
          {type !== "Costo Maquinarias" && (
            <div>
              <h3>
                {" "}
                Tratamiento{" "}
                {treatments && treatments.length > 0
                  ? treatments.length + 1
                  : "1"}
              </h3>

            </div>
          )}
        </div>

        <div className="">
          {type !== "Costo Maquinarias" && (
            <Button
              onClick={() => {
                const newProduct = addProductForm();

                setTimeout(() => {
                  const ref = productRefs.current[newProduct.id];
                  if (ref) {
                    ref.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                    setHighlightedId(newProduct.id);
                    setTimeout(() => setHighlightedId(null), 2500);
                  }
                }, 0);
              }}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md mb-2 ms:mb-0"
            >
              <Plus size={16} />
              <span>Ingresar nuevo producto</span>
            </Button>

          )}
        </div>

      </div>
      {productForms.map((product, index) => (
        <div
          key={product.id}
          ref={(el) => (productRefs.current[product.id] = el)}
          className={`border sm:border-none mb-6 p-4 border-gray-200 rounded-xl ${bgMap[cardId] + "/50"}`}
        >
          {productForms.length > 0 && (
            <div className="px-2 flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl text-slate-800">
                {type !== "Costo Maquinarias"
                  ? `Producto ${index + 1}`
                  : "Maquinaria"}
              </h2>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      array={[
                        { value: "", label: "Seleccioná una opción" },
                        ...(typeof field.options === "function"
                          ? field.options(product)
                          : field.options),
                      ]}
                      value={product[field.key]}
                      onChange={(e) =>
                        handleInputChange(product.id, field.key, e.target.value)
                      }
                    />
                  ) : (
                    <Input
                      text={field.label}
                      type={field.type || "text"}
                      className={`border p-2 rounded w-full ${product.errors[field.key]
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
              <div className="">
                <span className="block text-sm text-gray-700 font-medium mb-1">Costo</span>
                {
                  product.costo
                    ? `$USD ${product.costo.toFixed(2)} / AR$ ${localStorage.getItem("dolar") * product.costo.toFixed(2)
                    }`
                    : ""
                }
              </div>
            </div>
            {type !== "Costo Maquinarias" && (
              <>
                {" "}
                <Button
                  onClick={() => deleteProductForm(product.id)}
                  className="text-white bg-red-700 px-3 py-2 transition-colors rounded-md flex items-center gap-2"
                >
                  <Trash2 size={20} />
                  <span>Eliminar Producto</span>
                </Button>
              </>
            )}
          </div>
        </div>
      ))}

      <div className="flex gap-2 mt-4 mx-4 md:mx-0 pb-4">
        {type !== "Costo Maquinarias" ? (
          <>
            <Button
              onClick={handleCargarProductos}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded cursor-pointer"
            >
              Agregar Tratamiento
            </Button>
            <Button
              onClick={handleAddPlan}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded cursor-pointer"
            >
              Cargar Plan
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleAddPlan}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded cursor-pointer"
            >
              Cargar Maquinarias
            </Button>
          </>
        )}

        <Button
          onClick={cleanProducts}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded cursor-pointer"
        >
          Limpiar
        </Button>
      </div>
      <div className="pb-5">
        {type !== "Costo Maquinarias" && (
          <TreatmentList
            variante="mini"
            treatments={treatments}
            maxItems={3}
            handleDeleteTreatment={handleDeleteTreatment}
            onCleanTreatments={onCleanTreatments}
            className="mt-4"
          />
        )}
      </div>
    </div>
  );
};

export default ProductForm;
