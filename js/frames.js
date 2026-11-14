const filterButtons = document.querySelectorAll(".filter-btn");
const frameCards = document.querySelectorAll(".frame-card");
const searchInput = document.querySelector("#frame-search");
const framesCount = document.querySelector(".frames-count");
const noResults = document.querySelector(".no-results");

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

    let visibleFrames = 0;

    frameCards.forEach((card) => {
        const cardCategory = card.dataset.category;
        const cardText = card.textContent.toLowerCase();

        const matchesCategory =
            selectedCategory === "all" || selectedCategory === cardCategory;

        const matchesSearch = cardText.includes(searchValue);

        card.style.display = matchesCategory && matchesSearch ? "block" : "none";

        if (matchesCategory && matchesSearch) {
            visibleFrames++;
    }
    
    });

    framesCount.textContent = `${String(visibleFrames).padStart(2, "0")} FRAMES`;

    noResults.style.display = visibleFrames === 0 ? "block" : "none";
}

searchInput.addEventListener("input", filterFrames);

filterFrames();