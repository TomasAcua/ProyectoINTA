import { integrantesData } from "../../data/integrantesData";

const CardIntegrantes = () => {
  return (
    <div className="flex flex-row justify-space-between ">
      {integrantesData.map((integrante, key) => {
        return (
          <div
            key={key}
            className="flex flex-col justify-center items-center col-span-1 sm:mb-5 bg-white shadow-lg p-0"
          >
            <h4>{integrante.nombre}</h4>
            <div>
            { integrante.rol ? (  <p>{integrante.rol}</p>) : (null)}
            </div>
            <p>{integrante.legajo}</p>
            <div >
                {integrante.github ? <p>{integrante.github}</p> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardIntegrantes;
