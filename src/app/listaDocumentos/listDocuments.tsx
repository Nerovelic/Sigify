"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getBlobFromIndexedDB } from "../utils/indexedDB"; // Importa la función

interface StoredFile {
  id: string;
  name: string;
  url?: string;
}

const ListDocuments = ({ size }: { size: string }) => {
  const [storedFiles, setStoredFiles] = useState<StoredFile[]>([]);

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
      setStoredFiles(updatedFiles);
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      {storedFiles.length > 0 ? (
        storedFiles.map((doc) => (
          <Link
            href={`/[id]/${doc.id}`} // Ruta dinámica basada en el ID del documento
            key={doc.id}
            passHref
            legacyBehavior
          >
            <a
              className={`flex flex-col items-center p-4 border border-gray-200 rounded-md mr-2 mb-4 hover:bg-gray-100 hover:bg-opacity-50 transition duration-300 ${size}`}
            >
              <div
                className={`w-24 h-24 bg-gray-200 rounded-full mb-2 ${size}`}
                style={{
                  backgroundImage: `url(${doc.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className={`w-36 h-4 bg-gray-200 rounded mb-1 ${size}`}>
                {doc.name}
              </div>
              <div className={`w-24 h-3 bg-gray-200 rounded ${size}`} />
            </a>
          </Link>
        ))
      ) : (
        <p>No hay documentos cargados.</p>
      )}
    </div>
  );
};

export default ListDocuments;
