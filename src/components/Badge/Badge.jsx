
const Badge = ({ variant = "", children}) => {
  // const baseClasses =
  //   "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variantClasses = {
    
    primary: "border rounded bg-gray-200",
    disabled: "bg-gray-200",
    active: "bg-green-600/50",
    
  };

  return <div className={`${variantClasses[variant]} cursor-default text-xs px-2 rounded-xl border-2 border-slate-500/20`}>{children}</div>;
};

export default Badge;
