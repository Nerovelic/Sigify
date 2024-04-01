import { useState } from "react";

export const useClient = () => {
  // Estado para controlar la visibilidad de la carpeta
  const [folderVisible, setFolderVisible] = useState(false);

  // Función para abrir la carpeta
  const openFolder = () => {
    setFolderVisible(true);
    console.log("Carpeta abierta");
    // Agrega aquí la lógica adicional que necesites al abrir la carpeta
  };

  // Función para cerrar la carpeta
  const closeFolder = () => {
    setFolderVisible(false);
    console.log("Carpeta cerrada");
    // Agrega aquí la lógica adicional que necesites al cerrar la carpeta
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
  };
};
