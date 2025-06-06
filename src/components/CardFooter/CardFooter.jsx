const CardFooter = ({ info }) => {
    return (
        <div className="w-72 md:w-70 px-4 py-2 flex flex-col justify-start text-left text-[16px] text-[#6f8497]">
            <div className="font-semibold text-white mb-1">{info.nombre}</div>
            <hr className="h-[2px] bg-[#6f8497] border-none mb-2" />
            <div className="mb-1">
                <span className="font-medium text-[#8ba5bc]">Tel:</span> {info.telefono}
            </div>
            {info.email && (
                <div className="mb-1">
                    <span className="font-medium text-[#8ba5bc]">Email:</span> {info.email}
                </div>
            )}
            <div>
                {info.direccion} ({info.codigo_postal}) {info.ciudad}, {info.provincia}
            </div>
        </div>
    );
}

export default CardFooter;
