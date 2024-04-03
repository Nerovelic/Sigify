import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ListDocuments from "../listaDocumentos/listDocuments";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FolderDialog: React.FC<FolderDialogProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const minHeight = isMaximized ? "400px" : "200px";

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
            <ListDocuments size="w-2/3 h-32" />
          </div>
        )}
        <div
          style={{
            minHeight: minHeight,
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
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const file = e.dataTransfer.files[0];
            // Aquí puedes manejar el archivo que se soltó
            console.log("Archivo soltado:", file);
          }}
        >
          <CloudUploadIcon style={{ fontSize: 200, color: "#374347" }} />
          {activeTab === 1 && (
            <div>
              <label
                htmlFor="fileInput"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-14 rounded inline-block relative cursor-pointer"
              >
                Subir archivo
                <input
                  id="fileInput"
                  type="file"
                  accept=".docx,.pdf"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                />
              </label>
              <p>o arrastrar aquí un archivo</p>
            </div>
          )}
        </div>
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
