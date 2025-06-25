import ListaDesplegable from "../ListaDesplegable/ListaDesplegable";
import Input from "../Input/Input";
import Button from "../Button/Button";

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-100 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-xl h-[80%] m-auto overflow-y-auto ">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-4">
          {children}
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={onClose}
            className="flex justify-center items-center text-white text-center py-2 px-4 rounded-lg shadow-lg grid grid-cols-4 w-40 bg-gradient-to-br from-gray-500 to-gray-400"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
