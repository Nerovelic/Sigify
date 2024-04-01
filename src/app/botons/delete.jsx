import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useClient } from "../hooks/useClient";

export default function Delete() {
  const { deleteItem } = useClient();

  const handleDeleteClick = () => {
    console.log("Se hizo clic en el icono de eliminar");
    deleteItem();
  };

  return (
    <button
      onClick={handleDeleteClick}
      className="flex items-center justify-center"
    >
      <DeleteIcon className="text-white text-3xl" />
    </button>
  );
}
