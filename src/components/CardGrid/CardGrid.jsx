import CardCalculator from '../CardCalculator/CardCalculator';
import { cardData } from '../../data/cardHomeData.js';
import { Leaf, Pill, Tractor } from 'lucide-react';


const CardGrid = () => {

    const iconMap = {
        Leaf: <Leaf />,
        Pill: <Pill />,
        Tractor: <Tractor />
    }

    return (
        <div className='w-full bg-[#f2f7fe] grid lg:grid-cols-3 sm:grid-cols-1 gap-8 justify-center content-center  h-fit px-5'>
            {cardData.map((card) => {
                return (
                    <div key={card.id} className="flex justify-center items-center col-span-1 sm:mb-5 mb-8">
                        <CardCalculator
                            title={card.title}
                            subtitle={card.subtitle}
                            description={card.description}
                            icon={iconMap[card.icon]}
                            color={card.color}
                            href={card.href} 
                        />

                    </div>
                )
            })}
        </div>
    )



}

export default CardGrid;