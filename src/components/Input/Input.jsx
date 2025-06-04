const Input = ({ text, value, onChange, type, name, placeholder, readOnly }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="text-sm text-gray-700 font-medium">
        {text}
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        className="text-sm shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-100 outline-none transition"
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
};
export default Input;
