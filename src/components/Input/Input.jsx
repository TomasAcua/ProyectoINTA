const Input = ({ text, value, onChange, type = "text", name, placeholder = "", id }) => {
  const inputId = id || name;

  const numberExtraClasses = type === "number"
    ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    : "";

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 w-full">
      <label htmlFor={inputId} className="text-sm font-medium w-32">
        {text}
      </label>
      <input
        id={inputId}
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
        className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${numberExtraClasses}`}
      />
    </div>
  );
};

export default Input;
