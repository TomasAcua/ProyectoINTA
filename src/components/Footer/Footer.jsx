import FooterImage from '../../assets/Logos_INTAFooter.png'
import CardFooter from '../Card/CardFooter';

const informationArray = [
    {
        nombre: "INTA CR PATAGONIA NORTE",
        telefono: "+54 (02944) 442 3241",
        direccion: "Santiago del Estero 46",
        ciudad: "Neuquén",
        codigo_postal: "8300",
        provincia: "Neuquén"
    },
    {
        nombre: "INTA EEA BARILOCHE",
        telefono: "+54 (0294) 442 2731",
        email: "eeabariloche@inta.gob.ar",
        direccion: "Modesta Victoria 4450",
        ciudad: "Viedma",
        codigo_postal: "8500",
        provincia: "Río Negro"
    },
    {
        nombre: "INTA EEA ALTO VALLE",
        telefono: "+54 (0298) 443 9000",
        direccion: "Ruta Nacional 22 Km 1190",
        ciudad: "Allen",
        codigo_postal: "8332",
        provincia: "Río Negro"
    },
    {
        nombre: "INTA EEA VALLE INFERIOR",
        telefono: "+54 (02920) 42 3474",
        direccion: "Ruta Nacional 3 Km 971 Camino 4 IDEVI",
        ciudad: "Viedma",
        codigo_postal: "8500",
        provincia: "Río Negro"
    }
];

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-black py-2 px-3 flex flex-col items-center text-[#6f8497]">
            <div className="flex justify-around flex-wrap py-5 md:w-320">
                {informationArray.map((info, index) => (
                    <CardFooter key={index} info={info} />
                ))}
            </div>
            <div className='w-full pt-5'>
                <div className='flex justify-end'>
                    <img src={FooterImage} alt="Logos INTA" className='h-[75px]' />
                </div>
                <div className='text-right text-xs md:text-sm leading-relaxed pt-5'>
                    <p>SIPAN © 2021. Todos los derechos reservados</p>
                    <p>Unidad: Sin unidad detectada</p>
                    <p>IP Cliente:</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
