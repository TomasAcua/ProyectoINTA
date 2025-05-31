

import { Calculator, Leaf, ChartColumn } from 'lucide-react';

const FeaturesOverview = () => {
    return (
        <div className="h-fit w-full flex justify-center mb-8">
            <div className="w-[90%] bg-white rounded-lg shadow-md py-5 px-10">
                <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-8 justify-center content-center'>
                    <div className="flex flex-col items-center lg:col-span-1">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-3 text-white scale-130 hover:scale-145 transition-transform duration-300 shadow-lg my-2 brightness-110">
                            <Calculator />
                        </div>
                        <h2 className='font-bold my-3 text-gray-900 text-lg'>Precisión Científica</h2>
                        <p className='text-gray-600'>Cálculos exactos basados en metodologías validadas por INTA</p>
                    </div>
                    <div className="flex flex-col items-center lg:col-span-1 ">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl p-3 text-white scale-130 hover:scale-145 transition-transform duration-300 shadow-lg my-2 brightness-110">
                            <ChartColumn />
                        </div>

                        <h2 className='font-bold my-3 text-gray-900 text-lg'>Análisis Inteligente</h2>
                        <p className='text-gray-600'>Reportes detallados con visualizaciones avanzadas para la toma de decisiones estratégicas</p>
                    </div>
                    <div className="flex flex-col items-center lg:col-span-1">
                        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl p-3 text-white scale-130 hover:scale-145 transition-transform duration-300 shadow-lg my-2 brightness-110">
                            <Leaf/>
                        </div>

                        <h2 className='font-bold my-3 text-gray-900 text-lg'>Sostenibilidad</h2>
                        <p className='text-gray-600'>Optimización de recursos para una agricultura sustentable y económicamente viable.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FeaturesOverview;
{/* <div className='w-full bg-[#f2f7fe] grid lg:grid-cols-3 sm:grid-cols-1 gap-8 justify-center content-center mx-4 my-5 h-fit px-5'></div> */ }