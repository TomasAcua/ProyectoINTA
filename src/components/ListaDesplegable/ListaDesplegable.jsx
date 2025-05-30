const ListaDesplegable = ({ text, name, id, array = [], value, onChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-x-5 items-start md:items-center justiffy-center">
      <label htmlFor={name} className="block">
        {text}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="border rounded-md py-1"
      >
        <option value="" disabled>
          -- Seleccione una opción --
        </option>
        {Array.isArray(array) &&
          array.map((item) => (
            <option
              value={typeof item === "object" ? item.producto || item.value : item}
              key={typeof item === "object" ? item.id || item.producto || item.value : item}
            >
              {typeof item === "object" ? item.producto || item.label : item}
            </option>
          ))}
      </select>
    </div>
  );
}

export default ListaDesplegable;
