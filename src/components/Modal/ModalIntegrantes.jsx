import Button from "../Button/Button";
import { X } from "lucide-react";

const ModalIntegrantes = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-100 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[95%] max-w-7xl max-h-[90vh] flex flex-col relative">
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-lg w-8 h-8 flex items-center justify-center text-lg hover:scale-105 transition-transform duration-300 shadow-md shadow-black/30"
        >
          <X />
        </Button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-center mb-8 shrink-0">
          Integrantes
        </h2>

        {/* Tarjetas (CardIntegrantes pasadas como children) */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5">{children}</div>

        {/* Botones UNCo y FAIWEB */}
        <div className="flex justify-center gap-6 mt-10 shrink-0">
          <a
            href="https://uncoma.edu.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-gradient-to-br from-blue-400 via-indigo-500 to-blue-600 text-white px-6 py-2 rounded-xl shadow-md shadow-black/50 hover:scale-105 transition-transform duration-300">
              UNCo
            </Button>
          </a>
          <a
            href="https://www.fi.uncoma.edu.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-gradient-to-br from-blue-400 via-indigo-500 to-blue-600 text-white px-6 py-2 rounded-xl shadow-md shadow-black/50 hover:scale-105 transition-transform duration-300">
              FAIWEB
            </Button>
          </a>
        </div>
        <div className="my-4 h-0.5 border-t-0 bg-black/15 w-[70%] mx-auto"></div>
        <p className="text-center text-gray-500 text-sm ">
          Esta página fue realizada por estudiantes de la Facultad de
          Informática - UNCo | 2025.
        </p>
      </div>
    </div>
  );
};

export default ModalIntegrantes;
