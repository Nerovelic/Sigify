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
  selectedIds: string[];
  onSelect: (id: string) => void;
}

const ListDocuments: React.FC<ListDocumentsProps> = ({
  documents = [],
  size,
  selectedIds,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {documents.length > 0 ? (
        documents.map((doc) => (
          <div
            key={doc.id}
            className="relative border border-gray-200 rounded-md p-4 hover:bg-gray-100 hover:bg-opacity-50 transition duration-300"
          >
            {/* Casilla de verificación en la esquina superior izquierda */}
            <input
              type="checkbox"
              checked={selectedIds.includes(doc.id)}
              onChange={() => onSelect(doc.id)}
              className="absolute top-2 left-2"
            />
            {/* Contenido del documento */}
            <Link href={`/listaDocumentos/${doc.id}`} passHref legacyBehavior>
              <a className="flex flex-col items-center w-full">
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
                    width: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {doc.name}
                </div>
              </a>
            </Link>
          </div>
        ))
      ) : (
        <p>No hay documentos cargados.</p>
      )}
    </div>
  );
};

export default ListDocuments;
