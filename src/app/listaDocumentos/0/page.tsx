"use client";
import React, { useEffect, useState } from "react";

const Cero = () => {
  const [filePath, setFilePath] = useState<string | null>(null);

  useEffect(() => {
    const storedFilePath = localStorage.getItem("uploadedPdf");
    if (storedFilePath) {
      setFilePath(storedFilePath);
    }
  }, []);

  return (
    <div>
      {filePath ? (
        <embed src={filePath} width="600" height="800" type="application/pdf" />
      ) : (
        <p>No se ha seleccionado ningún documento.</p>
      )}
    </div>
  );
};

export default Cero;
