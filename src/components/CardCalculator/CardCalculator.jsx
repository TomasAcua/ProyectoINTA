
import Button from '../Button/Button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CardCalculator = ({ title, subtitle, description, icon, color, href }) => {

  const navigateTo = useNavigate()

  return (
    <div className="cursor-default h-160 md:h-130 flex flex-col space-y-1.5 w-[] md:w-100 shadow-lg text-white items-center bg-white hover:shadow-2x1 hover:scale-102 transition duration-400 rounded-xl group/card">
      <div className={`h-60 ${color} group-hover/card:brightness-105 flex flex-col items-center justify-center w-full rounded-t-xl px-4`}>
        {icon ? (
          <div className={`${color} flex justify-center items-center w-25 h-25 md:w-20 md:h-20 brightness-125 p-4 m-6 mb-5 rounded-xl group-hover/card:scale-110 transition duration-400 shadow-lg`}>
            <div className="scale-200 md:scale-170 ">{icon}</div>
          </div>
        ) : (<></>)}
        <h1 className={'h-1/3 font-extrabold text-2xl md:text-xl flex items-center mb-5 md:mb-0'} >Calculadora de costos de <br />{title}</h1>
        {/*<h4 className='font-medium text-sm'>{subtitle}</h4>*/}
      </div>

      <div className="h-[160px]  text-start flex items-start mx-6 mt-2 text-slate-800">
        <h3>{description}</h3>
      </div>

      <div className="mt-auto pb-5 w-40 hover:scale-105 transition duration-400 group/button">
        <Button
          className={`rounded-xl font-extrabold flex justify-between w-full px-6 py-2 text-white ${color} cursor-pointer shadow-md`}
          onClick={() => navigateTo(href)}
        >
          Ingresar
          <span className="group-hover/button:translate-x-1 transition duration-300">
            <ArrowRight />
          </span>
        </Button>
      </div>
    </div>
  )
}

export default CardCalculator;