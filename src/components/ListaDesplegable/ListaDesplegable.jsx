import { useEffect } from "react";

const ListaDesplegable = ({ text, name, id, array, value, onChange }) => {
  useEffect;
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
        </option>{" "}
        {array.map((item) => (
          <option
            value={typeof item === "object" ? item.producto : item}
            key={typeof item === "object" ? item.id : item}
          >
            {typeof item === "object" ? item.producto : item}
          </option>
        ))}
      </select>
    </div>
  );
};
export default ListaDesplegable;
