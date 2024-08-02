import React, { useEffect, useState } from "react";

// Componente para mostrar el preview del archivo subido
const UploadedDocument = ({ file, size }: { file: File; size: string }) => {
  const [fileContent, setFileContent] = useState<string>("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === "string") {
        setFileContent(reader.result);
      }
    };
    reader.readAsText(file);
  }, [file]);

  return (
    <div
      className={`flex flex-col items-center p-4 border border-gray-200 rounded-md mr-2 mb-4 hover:bg-gray-100 hover:bg-opacity-50 transition duration-300 ${size}`}
    >
      {/* Mostrar el contenido del archivo en un iframe */}
      <div style={{ minHeight: "300px", padding: "16px", width: "100%" }}>
        <iframe
          src={URL.createObjectURL(file)}
          style={{ width: "100%", height: "100%" }}
        ></iframe>
      </div>
    </div>
  );
};

export default UploadedDocument;
