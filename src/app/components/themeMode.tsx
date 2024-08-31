export const toggleTheme = (isDarkMode: boolean) => {
  const body = document.body;
  const menu = document.querySelector(".menu-dialog");

  if (!isDarkMode) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    menu?.classList.remove("dark-mode");
    menu?.classList.add("light-mode");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    menu?.classList.remove("light-mode");
    menu?.classList.add("dark-mode");
  }
};
