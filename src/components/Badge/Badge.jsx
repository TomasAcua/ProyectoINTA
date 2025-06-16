
const Badge = ({ variant = "", children}) => {
  // const baseClasses =
  //   "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variantClasses = {
    
    primary: "border rounded bg-gray-200 text-xs",
    disabled: "bg-gray-200 text-xs",
    active: "bg-green-600/50 text-xs",
    title: "border-white w-fit text-2sm hover:bg-white/10"
  };

  return <div className={` cursor-default px-2 rounded-xl border-2 border-slate-500/20 ${variantClasses[variant]}`}>{children}</div>;
};

export default Badge;
