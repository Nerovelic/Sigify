"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Documento = () => {
  const params = useParams();
  const id = params?.id; // Obtenemos el id desde params

  const [filePath, setFilePath] = useState<string | null>(null);

  console.log("Parámetros obtenidos de la URL:", params);

  useEffect(() => {
    if (id) {
      console.log(`ID obtenido de la URL: ${id}`);

      try {
        // Recuperar todos los archivos guardados desde el localStorage
        const storedFiles = JSON.parse(
          localStorage.getItem("uploadedPdfs") ?? "[]"
        );

        // Encontrar el archivo correspondiente al ID
        const fileData = storedFiles.find(
          (file: { id: number }) => file.id === Number(id)
        );

        if (fileData) {
          console.log(`Ruta recuperada de localStorage: ${fileData.path}`);
          setFilePath(fileData.path);
        } else {
          console.log("No se encontró ningún archivo para este ID.");
        }
      } catch (error) {
        console.error("Error al recuperar archivos del localStorage:", error);
      }
    } else {
      console.log("ID no está definido en la URL.");
    }
  }, [id]);

  return (
    <div>
      {filePath ? (
        <>
          {console.log("Ruta que se intentará incrustar:", filePath)}
          <iframe src={filePath} width="600" height="800"></iframe>
        </>
      ) : (
        <p>No se ha seleccionado ningún documento.</p>
      )}
    </div>
  );
};

export default Documento;
