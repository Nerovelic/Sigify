import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { useClient } from "../hooks/useClient";

interface FolderButtonProps {
  isDarkMode: boolean;
  onClick: () => void;
}

export default function FolderButton({
  isDarkMode,
  onClick,
}: FolderButtonProps) {
  const { openFolder } = useClient();

  const handleFolderClick = () => {
    console.log("Se hizo clic en el icono de la carpeta");
    openFolder();
    onClick(); // Llama a onClick aquí
  };

  return (
    <button onClick={handleFolderClick}>
      <FolderIcon
        className={isDarkMode ? "text-white text-3xl" : "text-black text-3xl"}
      />
    </button>
  );
}
