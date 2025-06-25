import { Calculator } from "lucide-react"
import Badge from '../Badge/Badge'

const CalculatorTitle = ({ title }) => {
    return (
        <div className="flex flex-col items-center text-center justify-center bg-gradient-to-r from-sipan-orange via-sipan-yellow to-sipan-green text-white w-full py-12 mb-2 ">
            <Badge variant="title">Herramienta Profesional</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mt-4">
                Calculadora de Costos de <br />
                <span className="text-white">
                    {title.toUpperCase()}
                </span>
            </h1>
        </div>
    )
}

export default CalculatorTitle;
