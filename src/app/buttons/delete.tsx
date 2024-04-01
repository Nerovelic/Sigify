import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useClient } from "../hooks/useClient";

interface DeleteButtonProps {
  isDarkMode: boolean;
}

export default function DeleteButton({ isDarkMode }: DeleteButtonProps) {
  const { deleteItem } = useClient();

  const handleDeleteClick = () => {
    console.log("Se hizo clic en el icono de eliminar");
    const itemId = "";
    deleteItem(itemId);
  };

  return (
    <button onClick={handleDeleteClick}>
      <DeleteIcon
        className={isDarkMode ? "text-white text-3xl" : "text-black text-3xl"}
      />
    </button>
  );
}
