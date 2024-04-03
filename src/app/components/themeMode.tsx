export const toggleTheme = (isDarkMode: boolean) => {
  const body = document.body; // o selecciona el elemento contenedor
  if (!isDarkMode) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  }
};
