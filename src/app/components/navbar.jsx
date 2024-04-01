import Image from "next/image";

export default function Navbar() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 h-12 flex items-center justify-between px-4 text-white font-semibold mb-4">
      {/* Icono en el lado izquierdo */}
      <div className="flex items-center">
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={100}
          height={24}
          priority
          className="dark:invert mr-4"
        />
        {/* Opciones de navegación */}
        <nav className="flex items-center space-x-4">
          <a href="#" className="hover:underline">
            Inicio
          </a>
          <a href="#" className="hover:underline">
            Acerca de
          </a>
          <a href="#" className="hover:underline">
            Servicios
          </a>
          <a href="#" className="hover:underline">
            Contacto
          </a>
        </nav>
      </div>
    </div>
  );
}
