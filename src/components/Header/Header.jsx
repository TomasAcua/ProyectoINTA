import { Link } from "react-router-dom";
import LogoHeader from "../../assets/Logos_Header.png";
import { ROUTES } from "../../const/routes"

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-white to-gray-200 shadow-sm sticky top-0 z-50 border-b border-gray-300">
      <div className="flex items-center justify-between px-4 md:px-8 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src={LogoHeader} alt="Logo SIPAN" className="h-[45px] w-auto" />
        </div>

        {/* Menú de navegación */}
        <nav className="hidden md:flex space-x-6 text-sm font-semibold text-gray-700">
          <Link
            to={ROUTES.home}
            className="hover:text-cyan-600 border-b-2 border-transparent hover:border-cyan-500 px-2 py-1"
          >
            HOME
          </Link>
          <Link
            to={ROUTES.costoSanitario}
            className="hover:text-cyan-600 border-b-2 border-transparent hover:border-cyan-500 px-2 py-1"
          >
            COSTO SANITARIO
          </Link>
            <Link
            to={ROUTES.costoMaquinaria}
            className="hover:text-cyan-600 border-b-2 border-transparent hover:border-cyan-500 px-2 py-1"
          >
            COSTO MAQUINARIA
          </Link>
          <Link
            to={ROUTES.fertilizacion}
            className="hover:text-cyan-600 border-b-2 border-transparent hover:border-cyan-500 px-2 py-1"
          >
            FERTILIZACIÓN
          </Link>
          <a
            href="#"
            className="hover:text-cyan-600 border-b-2 border-transparent hover:border-cyan-500 px-2 py-1"
          >
            QUIÉNES SOMOS
          </a>
          <a
            href="#"
            className="hover:text-cyan-600 border-b-2 border-transparent hover:border-cyan-500 px-2 py-1"
          >
            UNIDADES
          </a>
          <a
            href="#"
            className="hover:text-cyan-600 border-b-2 border-transparent hover:border-cyan-500 px-2 py-1"
          >
            MÓDULOS
          </a>
          <a
            href="#"
            className="hover:text-cyan-600 border-b-2 border-transparent hover:border-cyan-500 px-2 py-1"
          >
            ACCESO USUARIOS
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
