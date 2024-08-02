import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ListDocuments from "../listaDocumentos/listDocuments";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import Typography from "@material-ui/core/Typography";

interface FolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FolderDialog: React.FC<FolderDialogProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("Archivo añadido:", file);
      handleFileUpload(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    console.log("Archivo soltado:", file);
    handleFileUpload(file);
  };

  const handleFileUpload = (file: File) => {
    setUploadInProgress(true);
    setFileUploaded(file);

    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;
      const blob = new Blob([fileContent as ArrayBuffer], { type: file.type });
      const blobUrl = URL.createObjectURL(blob);

      // Save blob URL to localStorage
      localStorage.setItem("uploadedPdf", blobUrl);

      onClose();
      setUploadInProgress(false);
      setProgress(0); // Reset progress
    };
    reader.readAsArrayBuffer(file);
  };

  const minHeight2 = "200px"; // Cambiado para mantenerlo en la vista

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
            <ListDocuments size="w-2/5 h-32" />
          </div>
        )}
        {activeTab === 1 && (
          <div
            style={{
              minHeight: minHeight2,
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <InsertDriveFileIcon style={{ marginRight: "10px" }} />
                <div style={{ marginRight: "155px" }}>
                  <Typography variant="body1" color="textSecondary">
                    {fileUploaded?.name}
                  </Typography>
                </div>
                <LinearProgressWithLabel value={progress} />
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
