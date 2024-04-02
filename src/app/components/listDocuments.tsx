import React from "react";

// Componente de documento individual con placeholder
const DocumentItem = () => {
  return (
    <div className="flex flex-col items-center p-4 border border-gray-200 rounded-md mr-2 mb-4 hover:bg-gray-100 hover:bg-opacity-50 transition duration-300">
      {/* Contenedor para el avatar con animación de resaltado */}
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-2"></div>
      {/* Contenedor para el título con animación de resaltado */}
      <div className="w-36 h-4 bg-gray-200 rounded mb-1"></div>
      {/* Contenedor para la descripción con animación de resaltado */}
      <div className="w-24 h-3 bg-gray-200 rounded"></div>
    </div>
  );
};

// Componente de lista de documentos con placeholders
export default function ListDocuments() {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {documentRows.map(
          (row: any[], rowIndex: React.Key | null | undefined) => (
            <React.Fragment key={rowIndex}>
              {row.map((_: any, colIndex: React.Key | null | undefined) => (
                <DocumentItem key={colIndex} />
              ))}
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
}
