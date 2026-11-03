const themeToggle = document.querySelector(".the-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme ==="dark") {
    document.body.classList.add("dark-theme");
}

function updateThemeButton() {
    const isDark= document.body.classList.contains("dark-theme");

    themeToggle.textContent =isDark ? "the World in colors" : "The World in shadows";

    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

     const isDark = document.body.classList.contains("dark-theme");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeButton();
});