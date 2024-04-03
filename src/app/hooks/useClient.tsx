import { useState } from "react";
import FolderDialog from "../components/FolderDialog";

interface UseClientProps {
  // Define tus tipos de propiedades aquí si es necesario
}

export const useClient = () => {
  // Estado para controlar la visibilidad de la carpeta
  const [folderVisible, setFolderVisible] = useState(false);

  // Función para abrir la carpeta
  const openFolder = () => {
    setFolderVisible(true);
    console.log("Carpeta abierta");
    console.log("folderVisible:", folderVisible);
  };

  // Función para cerrar la carpeta
  const closeFolder = () => {
    setFolderVisible(false);
    console.log("Carpeta cerrada");
  };

  // Función para eliminar un elemento
  const deleteItem = (itemId: any) => {
    console.log("Elemento eliminado:", itemId);
    // Agrega aquí la lógica adicional que necesites para eliminar el elemento
  };

  // Retorna las funciones y estados que quieres que estén disponibles fuera del hook
  return {
    folderVisible,
    openFolder,
    closeFolder,
    deleteItem,
    FolderDialog, // Agrega FolderDialog aquí si necesitas usarlo fuera del hook
  };
};
