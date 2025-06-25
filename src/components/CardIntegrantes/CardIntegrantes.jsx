import { integrantesData } from "../../data/integrantesData";
import { FaGithub } from "react-icons/fa";
import Button from "../../components/Button/Button";

const CardIntegrantes = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
      {integrantesData.map((integrante, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-blue-200/50 to-green-200/50 p-4 rounded-xl shadow-lg shadow-black/10 text-center w-full max-w-xs hover:scale-103 transition-transform duration-400 min-h-[140px] flex flex-col justify-between"
        >
          <h3 className="text-lg font-bold text-blue-900">{integrante.nombre}</h3>
          {integrante.rol && (
            <p className="text-green-600 font-medium">{integrante.rol}</p>
          )}
          <p className="text-gray-700 mb-3">Legajo: {integrante.legajo}</p>

          {integrante.github ? (
            <a href={integrante.github} target="_blank" rel="noopener noreferrer">
              <Button
                className="w-auto mx-auto inline-flex items-center bg-blue-900 saturate-50 hover:saturate-100 transition-color duration-300 hover:scale-102 text-white px-2 rounded-md gap-2 shadow-sm shadow-slate-500 cursor-pointer"
              >
                <FaGithub/> GitHub
              </Button>
            </a>
          ) : (null)}
        </div>
      ))}
    </div>
  );
};

export default CardIntegrantes;
