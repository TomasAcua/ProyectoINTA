const Input = ({text, value, onChange, type, name, placeholder }) =>{
    return (
       <div className="flex flex-col md:flex-row gap-x-5 items-start md:items-center justiffy-center">
        <label htmlFor={name} className="block">{text}</label>
         <input type={type} 
         onChange={onChange} 
         value={value} 
         name={name} 
         className="border rounded-md no-spinner px-2 py-1"
          placeholder={placeholder}/>
       </div>
    )
}
export default Input