"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import FolderButton from "./buttons/folder";
import DeleteButton from "./buttons/delete";
import ListDocuments from "./listaDocumentos/listDocuments";
import { toggleTheme } from "./components/themeMode";
import { useClient } from "./hooks/useClient";
import FolderDialog from "./components/FolderDialog";
import {
  getBlobFromIndexedDB,
  deleteBlobFromIndexedDB,
} from "./utils/indexedDB";

interface StoredFile {
  id: string;
  name: string;
  url?: string;
}

export default function Home() {
  const { folderVisible, openFolder, closeFolder, deleteItem } = useClient();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [documents, setDocuments] = useState<StoredFile[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<StoredFile[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // Estado para las casillas seleccionadas

  useEffect(() => {
    const savedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    setIsDarkMode(savedTheme === "dark");

    if (savedTheme === null) {
      toggleTheme(isDarkMode);
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const files: StoredFile[] = JSON.parse(
        localStorage.getItem("uploadedPdfs") ?? "[]"
      );
      const updatedFiles = await Promise.all(
        files.map(async (file) => {
          try {
            const blob = await getBlobFromIndexedDB(file.id);
            const url = blob ? URL.createObjectURL(blob) : "";
            return { ...file, url };
          } catch (error) {
            console.error("Error al obtener el blob de IndexedDB:", error);
            return { ...file, url: "" };
          }
        })
      );
      setDocuments(updatedFiles);
    };

    fetchDocuments();
  }, []);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme(!isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  const handleFolderButtonClick = () => {
    openFolder();
  };

  const handleSearch = (filteredDocs: StoredFile[]) => {
    setFilteredDocuments(filteredDocs);
  };

  // Función para manejar cuando un archivo es subido exitosamente
  const handleFileUploadSuccess = (newFile: StoredFile) => {
    setDocuments((prevDocuments) => [newFile, ...prevDocuments]);
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = async () => {
    // Eliminar los documentos seleccionados
    for (const id of selectedIds) {
      await deleteItem(id);
      await deleteBlobFromIndexedDB(id); // Asegúrate de definir esta función
    }
    // Actualiza la lista de documentos después de la eliminación
    setDocuments((prevDocuments) =>
      prevDocuments.filter((doc) => !selectedIds.includes(doc.id))
    );
    setSelectedIds([]); // Limpiar la selección
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <Navbar
        isDarkMode={isDarkMode}
        toggleMode={toggleMode}
        documents={documents}
        onSearch={handleSearch}
      />
      <div className="flex flex-col items-center space-y-1">
        <div className="flex justify-between items-center w-full mb-4">
          <span
            className={`text-lg ml-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Documentos Recientes:
          </span>
          <div className="flex items-center space-x-4 mr-2">
            <FolderButton
              isDarkMode={isDarkMode}
              onClick={handleFolderButtonClick}
            />
            <button onClick={handleDeleteSelected}>
              <DeleteButton
                isDarkMode={isDarkMode}
                onDelete={handleDeleteSelected}
              />
            </button>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <ListDocuments
            documents={filteredDocuments}
            size={""}
            selectedIds={selectedIds}
            onSelect={handleSelect}
          />
        </div>
      </div>
      <FolderDialog
        isOpen={folderVisible}
        onClose={closeFolder}
        onFileUploadSuccess={handleFileUploadSuccess}
      />
    </div>
  );
}
