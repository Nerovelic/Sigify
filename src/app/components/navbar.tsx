import React from "react";
import Image from "next/image";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsIcon from "@mui/icons-material/Settings";
// @ts-ignore
import styles from "../css/modeTheme.css";

interface NavbarProps {
  isDarkMode: boolean;
  toggleMode: () => void;
}

export default function Navbar({ isDarkMode, toggleMode }: NavbarProps) {
  return (
    <div className={isDarkMode ? styles["dark-nav"] : styles["light-nav"]}>
      <div className="bg-gradient-to-r from-blue-500 to-green-500 h-12 flex items-center justify-between px-4 text-white font-semibold mb-4 relative">
        {/* Icono en el lado izquierdo */}
        <div className="flex items-center">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
            className={`mr-4 ${isDarkMode ? "dark:invert" : ""}`}
          />
          {/* Opciones de navegación */}
          <nav
            className={`flex items-center space-x-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <a
              href="#"
              className={`hover:underline ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Inicio
            </a>
            <a
              href="#"
              className={`hover:underline ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Acerca de
            </a>
            <a
              href="#"
              className={`hover:underline ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Servicios
            </a>
            <a
              href="#"
              className={`hover:underline ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Contacto
            </a>
          </nav>
        </div>
        {/* Contenedor para los botones de modo oscuro y ajustes */}
        <div className="flex items-center">
          {/* Botón de ajustes */}
          <button
            onClick={() => console.log("el boton de ajustes se presiono")}
            className="mr-4"
          >
            <SettingsIcon className={`text-gray-600`} />
          </button>
          {/* Botón de cambio de tema */}
          <button onClick={toggleMode}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}
