import React from "react";
import Link from "next/link";

// Componente de documento individual con placeholder
const DocumentItem = ({
  documentId,
  size,
}: {
  documentId: number;
  size: string;
}) => {
  return (
    <Link href={`/listaDocumentos/${documentId}`} passHref legacyBehavior>
      <a
        className={`flex flex-col items-center p-4 border border-gray-200 rounded-md mr-2 mb-4 hover:bg-gray-100 hover:bg-opacity-50 transition duration-300 ${size}`}
      >
        {/* Contenedor para el avatar con animación de resaltado */}
        <div
          className={`w-24 h-24 bg-gray-200 rounded-full mb-2 ${size}`}
        ></div>
        {/* Contenedor para el título con animación de resaltado */}
        <div className={`w-36 h-4 bg-gray-200 rounded mb-1 ${size}`}></div>
        {/* Contenedor para la descripción con animación de resaltado */}
        <div className={`w-24 h-3 bg-gray-200 rounded ${size}`}></div>
      </a>
    </Link>
  );
};

// Componente de lista de documentos con placeholders
export default function ListDocuments({ size }: { size: string }) {
  // Número de documentos a mostrar
  const documentCount = 12;

  // Función para dividir los documentos en filas
  const chunkArray = (array: any[], size: number) => {
    return array.reduce((acc: any[], _: any, index: number) => {
      if (index % size === 0) {
        acc.push(array.slice(index, index + size));
      }
      return acc;
    }, []);
  };

  // Agrupar documentos en filas de 4
  const documentRows = chunkArray([...Array(documentCount)], 4);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {documentRows.map((row: any[], rowIndex: number) => (
        <div key={rowIndex} className="flex mb-4">
          {row.map((_, colIndex: number) => (
            <DocumentItem
              key={colIndex}
              documentId={rowIndex * 4 + colIndex}
              size={size}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
