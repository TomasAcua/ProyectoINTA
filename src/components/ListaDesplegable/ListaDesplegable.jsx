const ListaDesplegable = ({ text, name, id, array, value, onChange }) => {
  const selectId = id || name;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 w-full">
      <label htmlFor={selectId} className="text-sm font-medium w-32">
        {text}
      </label>
      <select
        name={name}
        id={selectId}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="" disabled>
        -- Seleccione una opción --
        </option>
        {array.map((item) => (
          <option
            key={typeof item === "object" ? item.id : item}
            value={typeof item === "object" ? item.producto : item}
          >
            {typeof item === "object" ? item.producto : item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ListaDesplegable;
