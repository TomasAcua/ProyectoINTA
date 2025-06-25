import { Calculator } from "lucide-react"
import Badge from '../Badge/Badge'

const CalculatorTitle = ({ title }) => {
    return (
        <div className="flex flex-col items-center text-center justify-center bg-gradient-to-r from-sipan-orange via-sipan-yellow to-sipan-green text-white w-full py-12 mb-2 px-3 md:px-0 ">
            <Badge variant="title">Herramienta Profesional</Badge>
            <h1 className="text-2xl md:text-3xl font-bold mt-4 ">
                Calculadora de <span className="block m-0 p-0 md:inline-block">Costos de&nbsp;</span>
                <span className="text-white">
                    {title.toUpperCase()}
                </span>
            </h1>
        </div>
    )
}

export default CalculatorTitle;
