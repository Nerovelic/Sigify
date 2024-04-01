export const toggleTheme = (isDarkMode: boolean) => {
  if (!isDarkMode) {
    document.documentElement.style.setProperty(
      "--background-start-rgb",
      "255, 255, 255"
    );
    document.documentElement.style.setProperty(
      "--background-end-rgb",
      "214, 219, 220"
    );
  } else {
    document.documentElement.style.setProperty(
      "--background-start-rgb",
      "0, 0, 0"
    );
    document.documentElement.style.setProperty(
      "--background-end-rgb",
      "0, 0, 0"
    );
  }
};
