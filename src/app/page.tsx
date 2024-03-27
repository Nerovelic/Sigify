import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra superior */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 h-12 flex items-center justify-between px-4 text-white font-semibold">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
            className="dark:invert mr-10"
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

      {/* Contenido principal */}
      <main className="flex flex-col items-center justify-center flex-1 p-24">
        {/* Imagen */}
        <div className="relative flex items-center justify-center mb-24">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          />
        </div>

        {/* Resto del contenido */}
        <div className="grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-4 lg:text-left">
          {/* contenido vacio */}
        </div>
      </main>
    </div>
  );
}
