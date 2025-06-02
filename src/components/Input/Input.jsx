const Input = ({text, value, onChange, type, name, placeholder, readOnly }) =>{
    return (
       <div className="rounded px-2 py-1">
        <label htmlFor={name} className="block text-sm">{text}</label>
         <input type={type} 
         onChange={onChange} 
         value={value} 
         name={name} 
         className="rounded-md w-full sm:w-[25%] md:w-[50%] no-spinner px-2 py-1 border border-gray-400 focus:border-emerald-400 focus:outline"
          placeholder={placeholder}
          readOnly={readOnly}/>
       </div>
    )
}
export default Input