import Input from "../Input/Input";
import {Fuel} from "lucide-react"

const PrecioCombustibleInput = ({ value, onChange }) => {
  const error = !value || Number(value) <= 0;

  return (
    <div className='w-full p-4 bg-white'>
      <Input
        text="Precio del Combustible (USD/L)"
        icon = {<Fuel color="white"/>}
        bgColor = "bg-orange-400"
    
        type="number"
        className={`border p-2 rounded  border-black ${error ? "border-red-500" : "border-gray-300"}`}
        placeholder="Precio del Combustible"
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-xs">El precio del combustible es obligatorio</p>}
    </div>
  );
};

export default PrecioCombustibleInput;
