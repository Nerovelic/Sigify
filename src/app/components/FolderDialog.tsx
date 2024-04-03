import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

interface FolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FolderDialog: React.FC<FolderDialogProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
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
          <div>
            <p>Contenido de Recientes:</p>
            {/* Aquí puedes mostrar los elementos recientes */}
            <p>Elemento 1</p>
            <p>Elemento 2</p>
            {/* Fin de elementos recientes */}
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <div>
              <p>Subir un archivo:</p>
              <input type="file" accept=".docx,.pdf" />
            </div>
            <button>Examinar</button>
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
