"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import IosShareIcon from "@mui/icons-material/IosShare";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
  Divider,
} from "@mui/material";
import { toggleTheme } from "./themeMode";

interface StoredFile {
  id: string;
  name: string;
  url?: string;
}

interface NavbarProps {
  isDarkMode: boolean;
  toggleMode: () => void;
  documents: StoredFile[];
  onSearch: (filteredDocs: StoredFile[]) => void; // Callback for search results
}

export default function Navbar({
  isDarkMode,
  toggleMode,
  documents,
  onSearch,
}: NavbarProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>("Guardar");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (savedTheme === null) {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    } else {
      toggleTheme(savedTheme === "dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const filteredDocuments = documents.filter((doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(filteredDocuments); // Pass the filtered documents to the parent
  }, [searchTerm, documents, onSearch]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedSection("Guardar"); // Reset to "Guardar" when closing
  };

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
  };

  const handleToggleTheme = () => {
    toggleMode();
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  return (
    <div
      className={`bg-gradient-to-r from-blue-500 to-green-500 h-12 flex items-center px-4 text-white font-semibold mb-4 relative ${
        isDarkMode ? "dark-nav" : "light-nav"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={100}
          height={24}
          priority
          className={`mr-4 ${isDarkMode ? "dark:invert" : ""}`}
        />
      </div>

      {/* Search */}
      <div className="relative flex items-center mx-4 flex-1">
        <input
          type="text"
          placeholder="Nombre del Documento"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full p-2 rounded border ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
          }`}
        />
      </div>

      {/* Settings Icon */}
      <div className="flex items-center">
        <IconButton onClick={handleDialogOpen}>
          <SettingsIcon sx={{ color: isDarkMode ? "#ccc" : "#000" }} />
        </IconButton>
      </div>

      {/* Dialog for Configuration */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
        className={isDarkMode ? "dark-mode-dialog" : "light-mode-dialog"}
        PaperProps={{
          style: {
            backgroundColor: isDarkMode ? "#000" : "#fff", // Fondo del Dialog
          },
        }}
      >
        <DialogTitle
          style={{
            backgroundColor: isDarkMode ? "#222" : "#f5f5f5", // Fondo del título del Dialog
            color: isDarkMode ? "#fff" : "#000", // Color del texto del título
          }}
        >
          Configuración
        </DialogTitle>
        <DialogContent
          style={{
            backgroundColor: isDarkMode ? "#222" : "#fafafa", // Fondo del contenido del Dialog
            color: isDarkMode ? "#fff" : "#000", // Color del texto del contenido
          }}
        >
          <div className={`flex ${isDarkMode ? "dark-nav" : "light-nav"}`}>
            {/* Left side: Options List */}
            <List
              component="nav"
              className={`w-1/3 border-r ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <ListItemButton
                selected={selectedSection === "Guardar"}
                onClick={() => handleSectionClick("Guardar")}
                className={
                  selectedSection === "Guardar"
                    ? isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-100"
                    : ""
                }
              >
                <ListItemIcon>
                  <SaveIcon sx={{ color: isDarkMode ? "#ccc" : "#000" }} />
                </ListItemIcon>
                <ListItemText primary="Guardar" />
              </ListItemButton>
              <ListItemButton
                selected={selectedSection === "Compartir"}
                onClick={() => handleSectionClick("Compartir")}
                className={
                  selectedSection === "Compartir"
                    ? isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-100"
                    : ""
                }
              >
                <ListItemIcon>
                  <ShareIcon sx={{ color: isDarkMode ? "#ccc" : "#000" }} />
                </ListItemIcon>
                <ListItemText primary="Compartir" />
              </ListItemButton>
              <ListItemButton
                selected={selectedSection === "Exportar"}
                onClick={() => handleSectionClick("Exportar")}
                className={
                  selectedSection === "Exportar"
                    ? isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-100"
                    : ""
                }
              >
                <ListItemIcon>
                  <IosShareIcon sx={{ color: isDarkMode ? "#ccc" : "#000" }} />
                </ListItemIcon>
                <ListItemText primary="Exportar" />
              </ListItemButton>
              <ListItemButton
                selected={selectedSection === "Modo Oscuro"}
                onClick={() => handleSectionClick("Modo Oscuro")}
                className={
                  selectedSection === "Modo Oscuro"
                    ? isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-100"
                    : ""
                }
              >
                <ListItemIcon>
                  {isDarkMode ? (
                    <LightModeIcon sx={{ color: "#ccc" }} />
                  ) : (
                    <DarkModeIcon sx={{ color: "#000" }} />
                  )}
                </ListItemIcon>
                <ListItemText primary="Modo Oscuro" />
              </ListItemButton>
            </List>

            {/* Right side: Option Details */}
            <div
              className={`w-2/3 pl-4 ${
                isDarkMode ? "dark-mode-content" : "light-mode-content"
              }`}
            >
              {selectedSection && (
                <>
                  <Typography
                    variant="h6"
                    className={isDarkMode ? "text-white" : "text-black"}
                  >
                    {selectedSection}
                  </Typography>
                  <Divider
                    className={`my-2 ${
                      isDarkMode ? "bg-gray-600" : "bg-gray-300"
                    }`}
                  />
                  {selectedSection === "Guardar" && (
                    <div>
                      <Typography
                        variant="body2"
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                      >
                        Guarda tu documento en tu pc.
                      </Typography>
                      <Switch />
                    </div>
                  )}
                  {selectedSection === "Compartir" && (
                    <div>
                      <Typography
                        variant="body2"
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                      >
                        Comparte este documento con otras personas.
                      </Typography>
                      <Switch />
                    </div>
                  )}
                  {selectedSection === "Exportar" && (
                    <div>
                      <Typography
                        variant="body2"
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                      >
                        Exporta el documento en varios formatos.
                      </Typography>
                      <Switch />
                    </div>
                  )}
                  {selectedSection === "Modo Oscuro" && (
                    <div>
                      <Typography
                        variant="body2"
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                      >
                        Cambia entre el modo claro y oscuro.
                      </Typography>
                      <Switch
                        checked={isDarkMode}
                        onChange={handleToggleTheme}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions
          style={{
            backgroundColor: isDarkMode ? "#222" : "#f5f5f5", // Fondo del DialogActions
          }}
        >
          <Button onClick={handleDialogClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
