import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

interface FolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FolderDialog: React.FC<FolderDialogProps> = ({ isOpen, onClose }) => {
  console.log("isOpen:", isOpen);
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Abrir un archivo</DialogTitle>
      <DialogContent>
        <p>Recientes:</p>
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
