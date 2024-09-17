"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import ListDocuments from "../listaDocumentos/listDocuments";
import { useRouter } from "next/navigation";

interface FolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUploadSuccess: (newFile: any) => void;
}

const FolderDialog: React.FC<FolderDialogProps> = ({
  isOpen,
  onClose,
  onFileUploadSuccess,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const router = useRouter();

  const handleFileUpload = (file: File) => {
    setUploadInProgress(true);
    setFileUploaded(file);
    const totalSize = file.size;
    let loadedSize = 0;

    const reader = new FileReader();
    reader.onload = () => {
      loadedSize += reader.result?.toString().length ?? 0;
      const percentage = Math.round((loadedSize / totalSize) * 100);
      setProgress(percentage);

      if (loadedSize < totalSize) {
        setTimeout(() => reader.readAsText(file.slice(loadedSize)), 1000);
      } else {
        setTimeout(() => {
          const storedFiles = JSON.parse(
            localStorage.getItem("uploadedPdfs") ?? "[]"
          ) as Array<{ id: number; name: string; path: string }>;

          const newId =
            storedFiles.length > 0
              ? storedFiles[storedFiles.length - 1].id + 1
              : 0;

          const newFile = {
            id: newId,
            name: file.name,
            path: URL.createObjectURL(file),
          };

          storedFiles.push(newFile);

          localStorage.setItem("uploadedPdfs", JSON.stringify(storedFiles));

          onFileUploadSuccess(newFile);

          onClose();
          setUploadInProgress(false);
          setProgress(0);

          router.push(`/listaDocumentos/${newId}`);
        }, 100);
      }
    };

    reader.readAsText(file.slice(0, 1024));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  if (!isClient) {
    return null; // O un fallback para la renderización en el servidor
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Abrir un archivo</DialogTitle>
      <DialogContent>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Recientes" />
          <Tab label="Subir documentos" />
        </Tabs>
        {activeTab === 0 && (
          <div style={{ minHeight: "400px", padding: "16px" }}>
            <ListDocuments
              size="w-2/5 h-32"
              documents={[]} // Aquí deberías pasar documentos reales
              selectedIds={selectedIds}
              onSelect={handleSelect}
            />
          </div>
        )}
        {activeTab === 1 && (
          <div
            style={{
              minHeight: "400px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={handleFileDrop}
          >
            {!uploadInProgress && (
              <FileUploadIcon style={{ fontSize: 150, color: "#374347" }} />
            )}
            {uploadInProgress ? (
              <div
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <InsertDriveFileIcon style={{ marginRight: "10px" }} />
                <div style={{ flexGrow: 1 }}>
                  <LinearProgressWithLabel
                    value={progress}
                    fileName={fileUploaded?.name || "Nombre no disponible"}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="fileInput"
                  className={`${
                    uploadInProgress ? "hidden" : "block"
                  } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-14 rounded inline-block relative cursor-pointer`}
                >
                  Subir archivo
                  <input
                    id="fileInput"
                    type="file"
                    accept=".docx,.pdf"
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    onChange={handleFileInputChange}
                  />
                </label>
                <p className={`${uploadInProgress ? "hidden" : "block"}`}>
                  o arrastrar aquí un archivo
                </p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FolderDialog;
