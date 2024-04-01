"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "./components/navbar";
import FolderButton from "./buttons/folder";
import DeleteButton from "./buttons/delete";
import { toggleTheme } from "./components/themeMode";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme(!isDarkMode);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra de navegación */}
      <Navbar isDarkMode={isDarkMode} toggleMode={toggleMode} />
      {/* Resto del contenido */}
      <div className="-mb-2" />
      <div className="flex flex-col items-center space-y-4 mb-10">
        <div className="flex justify-between items-center w-full">
          <span
            className={`${
              isDarkMode ? "text-white" : "text-black"
            } text-lg ml-2`}
          >
            Documentos Recientes:
          </span>
          <div className="flex items-center space-x-4 mr-2">
            {/* Botón de carpeta */}
            <FolderButton isDarkMode={isDarkMode} />
            {/* Botón de eliminar */}
            <DeleteButton isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
      <main className="flex flex-col items-center justify-center flex-1 p-24">
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
        <div className="grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-4 lg:text-left">
          {/* contenido vacio */}
        </div>
      </main>
    </div>
  );
}
