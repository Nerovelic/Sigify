import React from "react";
import Link from "next/link";

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
        <div
          className={`w-24 h-24 bg-gray-200 rounded-full mb-2 ${size}`}
        ></div>
        <div className={`w-36 h-4 bg-gray-200 rounded mb-1 ${size}`}></div>
        <div className={`w-24 h-3 bg-gray-200 rounded ${size}`}></div>
      </a>
    </Link>
  );
};

export default function ListDocuments({ size }: { size: string }) {
  const documentCount = 12;

  const chunkArray = (array: any[], size: number) => {
    return array.reduce((acc: any[], _: any, index: number) => {
      if (index % size === 0) {
        acc.push(array.slice(index, index + size));
      }
      return acc;
    }, []);
  };

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
