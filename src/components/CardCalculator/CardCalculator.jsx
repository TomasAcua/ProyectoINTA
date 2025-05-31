
import Button from '../Button/Button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CardCalculator = ({ title, subtitle, description, icon, color, href }) => {

  const navigateTo = useNavigate()

  return (
    <div className="cursor-default h-105 flex flex-col space-y-1.5 w-100  shadow-lg text-white items-center justify-between bg-white hover:shadow-2x1 hover:scale-102 transition duration-400 rounded-xl group/card">
      <div className={`h-55 ${color} group-hover/card:brightness-105 flex flex-col items-center justify-center w-full rounded-t-xl px-4`}>
        {icon ? (
          <div className={`${color} flex justify-center items-center w-15 h-15 brightness-125 p-4 m-6 scale-160 rounded-xl group-hover/card:scale-170 transition duration-400 shadow-lg`}>
            {icon}
          </div>
        ) : (<></>)}
        <h2 className={'font-extrabold text-xl text-nowrap'} >{title}</h2>
        <h4 className='font-medium text-sm'>{subtitle}</h4>
      </div>

      <div className="h-[140px] text-sm/5 text-start flex items-start mx-6 mt-2 text-slate-800">
        {description}
      </div>

      <div className="pb-5 w-40 hover:scale-105 transition duration-400 group/button">
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