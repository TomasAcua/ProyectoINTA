import Button from '../Button/Button.jsx'
import { Pill, Leaf, Tractor, Menu, X } from 'lucide-react'
import { cardData } from '../../data/cardHomeData.js'
import { useState } from 'react'

const QuickNavigate = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [translate, setTranslate] = useState('translate-x-55');
    const iconMap = {
        Leaf: <Leaf />,
        Pill: <Pill />,
        Tractor: <Tractor />,
    }

    const show = () => {
        if (!showMenu) {
            setShowMenu(true);
            setTranslate('translate-x-0')
        } else {
            setShowMenu(false);
            setTranslate('translate-x-55')
        }
    }
    return (
        <div className="z-30 fixed top-20 right-0 pointer-events-none">
            <div className="flex flex-row">
                <div className={`z-30 rounded-bl-xl bg-sky-100 w-fit flex flex-col items-center justify-center py-4 px-5 shadow-xl space-y-3 ${translate} transition-transform duration-300 ease-in-out pointer-events-auto`}>
                    <Button
                        className={`cursor-pointer p-4 absolute top-0 -left-14 bg-indigo-400 text-white rounded-l-xl transition-all duration-300`}
                        onClick={() => show()}
                    >
                        <div className="relative w-6 h-6">
                            <Menu
                                className={`absolute transition-all duration-300 ease-in-out ${translate === 'translate-x-0' ? 'opacity-0 rotate-45 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                            />
                            <X
                                className={`absolute transition-all duration-300 ease-in-out ${translate === 'translate-x-0' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-45 scale-0'}`}
                            />
                        </div>
                    </Button>
                    <h2 className="">ACCESO RAPIDO</h2>
                    {cardData.map((card) => (
                        <Button
                            key={card.id}
                            className={`${card.color} text-white hover:brightness-120 hover:scale-105 transition-all duration-300 ease-in-out py-2 px-4 rounded-lg shadow-lg grid grid-cols-4 w-45 cursor-pointer`}
                            onClick={() => {
                                window.location.href = card.href;
                            }}
                        >
                            <span className='col-span-1'>{iconMap[card.icon]}</span>
                            <span className='col-span-3'>{card.id.toLocaleUpperCase()}</span>
                        </Button>
                    ))}

                </div>
            </div>
        </div>
    )

}

export default QuickNavigate;