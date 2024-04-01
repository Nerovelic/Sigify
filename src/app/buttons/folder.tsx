import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { useClient } from "../hooks/useClient";

interface FolderButtonProps {
  isDarkMode: boolean;
}

export default function FolderButton({ isDarkMode }: FolderButtonProps) {
  const { openFolder } = useClient();

  const handleFolderClick = () => {
    console.log("Se hizo clic en el icono de la carpeta");
    openFolder();
  };

  return (
    <button onClick={handleFolderClick}>
      <FolderIcon
        className={isDarkMode ? "text-white text-3xl" : "text-black text-3xl"}
      />
    </button>
  );
}
