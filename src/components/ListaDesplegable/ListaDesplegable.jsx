const ListaDesplegable = ({ text, name, id, array = [], value, onChange }) => {
  const capitalizar = (texto) =>
    texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="text-sm text-gray-700 font-medium">
        {text}
      </label>
      <div className="relative">
        <select
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className="text-sm w-full bg-white border border-gray-300 rounded-md px-3 py-2.5 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none cursor-pointer"
        >
          <option value="" disabled>Seleccione una opción</option>
          {array.map((item, idx) => {
            const valor =
              typeof item === "object" ? item.producto || item.value || item.label : item;
            const key = (typeof item === "object" ? item.id || valor : valor) + "_" + idx;
            const label = capitalizar(valor);

            return (
              <option value={valor} key={key}>
                {label}
              </option>
            );
          })}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ListaDesplegable;
