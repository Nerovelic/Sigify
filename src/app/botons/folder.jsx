import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { useClient } from "../hooks/useClient";

export default function FolderButton() {
  // Funciones de manejo de clics para los iconos
  const { openFolder } = useClient();

  const handleFolderClick = () => {
    // Lógica para abrir una carpeta
    console.log("Se hizo clic en el icono de la carpeta");
    openFolder();
  };

  return (
    <button onClick={handleFolderClick}>
      <FolderIcon className="text-white text-3xl" />
    </button>
  );
}
