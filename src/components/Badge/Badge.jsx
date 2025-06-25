
const Badge = ({ variant = "", children}) => {
 
  const variantClasses = {
    
    primary: "border rounded bg-gray-200 text-xs",
    disabled: "bg-gray-200 text-xs",
    active: "bg-green-600/50 text-xs",
    title: "border-white w-fit text-2sm hover:bg-white/10"
  };

  return <div className={` cursor-default px-2 rounded-xl border-2 border-slate-500/20 ${variantClasses[variant]}`}>{children}</div>;
};

export default Badge;
