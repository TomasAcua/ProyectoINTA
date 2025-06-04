const Button = ({ className, disabled, onClick, children }) => {
    return (
        <button
            className={`${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:brightness-110"} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button