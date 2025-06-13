import { Calculator } from "lucide-react"


const CalculatorTitle = ({ title }) => {

    return (
        <div className="flex flex-col justify-center p-6 bg-gradient-to-r from-sipan-orange via-sipan-yellow to-sipan-green text-white h-40 w-full p-6 mb-2">
            <h2 className="text-xl font-bold">{title.toLocaleUpperCase()}</h2>
        </div>
    )

}

export default CalculatorTitle