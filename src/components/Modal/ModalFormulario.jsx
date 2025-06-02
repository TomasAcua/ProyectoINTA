import ListaDesplegable from "../ListaDesplegable/ListaDesplegable";
import Input from "../Input/Input";
import Button from "../Button/Button";

const ModalFormulario = ({
  isOpen,
  title = "Editar",
  fields = [],
  data,
  setData,
  onSave,
  onClose,
  type,
}) => {
  if (!isOpen) return null;

  const handleChange = (index, fieldKey, value) => {
    const updated = [...data];
    updated[index][fieldKey] = value;

    if (fieldKey === "tractor") {
      updated[index]["implemento"] = "";
    }

    setData(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-100 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-xl h-[80%] m-auto overflow-y-auto ">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {data?.map((item, i) => (
          <div className="border-b border-gray-400">
          <div key={i} className="mb-4  pb-2 grid grid-cols-2">
            {console.log(fields)}
            {fields.map((field) => (
              <div key={field.key} >
                <label className="block font-semibold mb-1">
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <ListaDesplegable
                    value={item[field.key] || ""}
                    onChange={(e) => handleChange(i, field.key, e.target.value)}
                    array={
                      typeof field.options === "function"
                        ? field.options(item)
                        : field.options
                    }
                    className="w-full border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 px-2 py-1 rounded transition"
                  />
                ) : (
                  <Input
                    type={field.type || "text"}
                    value={item[field.key] || ""}
                    onChange={(e) => handleChange(i, field.key, e.target.value)}
                    className="w-full border border-gray-300 focus:outline-none focus:emerald-500 focus:border-emerald-500 px-2 py-1 rounded transition"
                  />
                )}
              </div>
            ))}
          </div>
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={onClose}
            className="flex justify-center items-center text-white text-center py-2 px-4 rounded-lg shadow-lg grid grid-cols-4 w-40 bg-gradient-to-br from-gray-500 to-gray-400"
          >
            Cancelar
          </Button>
          <Button
            onClick={onSave}
            className="flex justify-center items-center text-center text-white py-2 px-4 rounded-lg shadow-lg grid grid-cols-4 w-40  bg-gradient-to-br from-emerald-600 to-emerald-500"
          >
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ModalFormulario;
