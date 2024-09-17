"use client";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteButtonProps {
  isDarkMode: boolean;
  onDelete: () => Promise<void>;
}

export default function DeleteButton({
  isDarkMode,
  onDelete,
}: DeleteButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDeleteClick = async () => {
    console.log("Se hizo clic en el icono de eliminar");
    await onDelete();
  };

  if (!isClient) {
    return null; // O renderiza algo predeterminado para el servidor
  }

  return (
    <button onClick={handleDeleteClick}>
      <DeleteIcon
        className={isDarkMode ? "text-white text-3xl" : "text-black text-3xl"}
      />
    </button>
  );
}
