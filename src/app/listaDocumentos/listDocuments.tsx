"use client";
import React from "react";
import Link from "next/link";

interface StoredFile {
  id: string;
  name: string;
  url?: string;
}

interface ListDocumentsProps {
  documents: StoredFile[];
  size: string;
}

const ListDocuments: React.FC<ListDocumentsProps> = ({
  documents = [],
  size,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {documents.length > 0 ? (
        documents.map((doc) => (
          <Link
            href={`/listaDocumentos/${doc.id}`} // Ruta dinámica basada en el ID del documento
            key={doc.id}
            passHref
            legacyBehavior
          >
            <a
              className={`flex flex-col items-center p-4 border border-gray-200 rounded-md hover:bg-gray-100 hover:bg-opacity-50 transition duration-300 ${size}`}
            >
              <div
                className={`w-24 h-24 bg-gray-200 rounded-full mb-2 ${size}`}
                style={{
                  backgroundImage: `url(${doc.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div
                className={`text-center text-sm font-medium ${size}`}
                style={{
                  width: "100%", // El ancho será 100% del contenedor
                  whiteSpace: "nowrap", // Evita que el texto salte a la siguiente línea
                  overflow: "hidden", // Oculta el texto que se desborda del contenedor
                  textOverflow: "ellipsis", // Muestra "..." al final si el texto es muy largo
                }}
              >
                {doc.name}
              </div>
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
