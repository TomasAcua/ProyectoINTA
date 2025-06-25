const Input = ({ text, icon, bgColor, value, onChange, type, name, placeholder, readOnly, className }) => {

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex gap-2 mb-1 items-center">
        
        <div className={`${bgColor} flex items-center justify-center p-2 rounded-xl`} >{icon}</div>
        {/* bg-sipan-green */}
        <label htmlFor={name} className="text-sm text-gray-700 font-bold">
        {text}
      </label>
      </div>
      
      <input
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        className={`text-sm shadow-sm rounded-md w-full px-3 py-2 outline-none transition ${className || ""}`}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
};
export default Input;
