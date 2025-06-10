import Input from "../Input/Input";

const PrecioCombustibleInput = ({ value, onChange, error }) => {
  return (
    <div className='w-full p-4'>
      <Input
        text="Precio del Combustible (USD/L)"
        type="number"
        className={`border p-2 rounded  border-black ${error ? "border-red-500" : "border-gray-300"}`}
        placeholder="Precio del Combustible"
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default PrecioCombustibleInput;
