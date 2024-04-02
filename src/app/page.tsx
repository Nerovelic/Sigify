"use client";
import React, { useState } from "react";
import Navbar from "./components/navbar";
import FolderButton from "./buttons/folder";
import DeleteButton from "./buttons/delete";
import ListDocuments from "./components/listDocuments";
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
      <div className="flex flex-col items-center space-y-1">
        <div className="flex justify-between items-center w-full mb-4">
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
        <div className="relative flex items-center justify-center">
          <ListDocuments />
        </div>
      </div>
    </div>
  );
}
