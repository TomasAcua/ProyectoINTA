const AboutUsDev = () => {
  return (
    <section className="bg-gradient-to-br from-white to-sky-50 text-gray-800">
      {/* Imagen de encabezado */}
      <div className="w-full h-64 md:h-96 overflow-hidden shadow-md">
        <img
          src="https://www.fi.uncoma.edu.ar/wp-content/uploads/2022/05/FAI-hallCentral.jpeg"
          alt="Equipo de desarrollo"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="py-16 px-6 md:px-20 lg:px-40 max-w-5xl mx-auto text-center">
        <h1 className="mb-8 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600">
            Sobre Nosotros
          </span>
        </h1>
        <p className="text-xl leading-relaxed text-gray-700 text-justify mb-6">
          Este proyecto fue desarrollado por estudiantes de la Universidad Nacional del Comahue (UNCo),
          pertenecientes a la Facultad de Informática, con el objetivo de brindar una herramienta útil al
          Instituto Nacional de Tecnología Agropecuaria (INTA).
        </p>
        <p className="text-xl leading-relaxed text-gray-700 text-justify mb-6">
          Durante el proceso trabajamos en conjunto, divididos en dos equipos: uno centrado en el módulo de Costo Sanitario
          y otro en el de Fertilización. Cada grupo aportó sus ideas, conocimientos y compromiso para llevar adelante esta propuesta.
        </p>
        <p className="text-xl leading-relaxed text-gray-700 text-justify">
          Agradecemos a la Facultad y a nuestros docentes por su acompañamiento, y valoramos haber sido parte de un proceso formativo
          que refuerza el trabajo en equipo y el espíritu de colaboración dentro de la UNCo.
        </p>
      </div>

      <div className="pb-20 px-6 md:px-20 lg:px-40 max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-2xl p-8">
          <h2 className="text-5xl font-bold text-center mb-10 text-gray-800">
            Equipo de Desarrollo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
            <div>
              <h3 className="text-3xl font-semibold text-sky-600 mb-4">Módulo Costo Sanitario</h3>
              <ul className="text-gray-700 space-y-2">
                {[
                  "Acuña Tomás",
                  "Celayes Brisa",
                  "Fernández Rocío",
                  "Russo Florencia",
                ]
                  .sort()
                  .map((name) => (
                    <li key={name} className="text-xl">{name}</li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-sky-600 mb-4">Módulo Fertilización</h3>
              <ul className="text-gray-700 space-y-2">
                {[
                  "Cruz Jesús Ramón Alexis",
                  "García Facundo",
                  "Mondaca Araceli",
                  "Villablanca Rodrigo",
                ]
                  .sort()
                  .map((name) => (
                    <li key={name} className="text-xl">{name}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsDev;