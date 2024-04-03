"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import FolderButton from "./buttons/folder";
import DeleteButton from "./buttons/delete";
import ListDocuments from "./listaDocumentos/listDocuments";
import { toggleTheme } from "./components/themeMode";
import { useClient } from "./hooks/useClient";
import FolderDialog from "./components/FolderDialog";

export default function Home() {
  const { folderVisible, openFolder, closeFolder } = useClient();

  // Establecer el estado inicial del tema basado en el valor guardado
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Obtener el tema guardado en el almacenamiento local
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem("theme") : null;
    setIsDarkMode(savedTheme === "dark");

    // Forzar el tema solo si no se ha establecido previamente en el almacenamiento local
    if (savedTheme === null) {
      toggleTheme(isDarkMode);
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme(!isDarkMode);
    // Guardar la preferencia de tema en localStorage
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  const handleFolderButtonClick = () => {
    console.log("Se hizo clic en el botón de carpeta");
    openFolder(); // Aquí verificamos si openFolder se llama antes de abrir el FolderDialog
  };

  // Agrega un console.log para verificar el valor de folderVisible
  console.log("folderVisible antes de pasar a FolderDialog:", folderVisible);

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
            <FolderButton
              isDarkMode={isDarkMode}
              onClick={handleFolderButtonClick}
            />
            {/* Botón de eliminar */}
            <DeleteButton isDarkMode={isDarkMode} />
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <ListDocuments />
        </div>
      </div>
      {/* Renderiza FolderDialog cuando la carpeta esté abierta */}
      <FolderDialog isOpen={folderVisible} onClose={closeFolder} />
    </div>
  );
}
