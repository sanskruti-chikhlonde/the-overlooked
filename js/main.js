const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");

    const isOpen = mainNav.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

const imageComparison = document.querySelector(".image-comparison");
const comparisonDark = document.querySelector(".comparison-dark");
const comparisonDivider = document.querySelector(".comparison-divider"); 

if (imageComparison && comparisonDark && comparisonDivider) {

    console.log("Slider elements:", imageComparison, comparisonDark, comparisonDivider);

    let isDragging = false;

    function updateComparison(clientX) {
        const bounds = imageComparison.getBoundingClientRect();
        const position = Math.max(
            0,
            Math.min(100, ((clientX - bounds.left) / bounds.width) * 100)
        );

        comparisonDark.style.clipPath = `inset(0 0 0 ${position}%)`;
        comparisonDivider.style.left = `${position}%`;
    }

    comparisonDivider.addEventListener("pointerdown", (event) => {
    isDragging = true;
    event.preventDefault();
    updateComparison(event.clientX);
});

imageComparison.addEventListener("pointermove", (event) => {
    if (isDragging) {
        updateComparison(event.clientX);
    }
});

window.addEventListener("pointerup", () => {
    isDragging = false;
});

window.addEventListener("pointercancel", () => {
    isDragging = false;
});
}