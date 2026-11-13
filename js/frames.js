const filterButtons = document.querySelectorAll(".filter-btn");
const frameCards = document.querySelectorAll(".frame-card");
const searchInput = document.querySelector("#frame-search");
let selectedCategory = "all";


filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.filter;
        filterFrames();
    });
});

function filterFrames() {
    const searchValue = searchInput.value.toLowerCase();

    frameCards.forEach((card) => {
        const cardCategory = card.dataset.category;
        const cardText = card.textContent.toLowerCase();

        const matchesCategory =
            selectedCategory === "all" || selectedCategory === cardCategory;

        const matchesSearch = cardText.includes(searchValue);

        card.style.display = matchesCategory && matchesSearch ? "block" : "none";
    });
}

searchInput.addEventListener("input", filterFrames);