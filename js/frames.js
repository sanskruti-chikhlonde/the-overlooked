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

// Lightbox Elements
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let currentFrameIndex = 0;

const availableFrames = Array.from(frameCards).filter((card) => {
    return card.querySelector("img").getAttribute("src").trim() !== "";
});

frameCards.forEach((card) => {
    card.addEventListener("click", () => {
        const image = card.querySelector("img");

        if (!image.getAttribute("src").trim()) return;

        currentFrameIndex = availableFrames.indexOf(card);
        openLightbox();
    });
});

function openLightbox() {
    const card = availableFrames[currentFrameIndex];
    const image = card.querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = card.querySelector(".frame-caption").textContent;

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function showNextFrame() {
    currentFrameIndex = (currentFrameIndex + 1) % availableFrames.length;
    openLightbox();
}

function showPreviousFrame() {
    currentFrameIndex =
        (currentFrameIndex - 1 + availableFrames.length) % availableFrames.length;

    openLightbox();
}

closeButton.addEventListener("click", closeLightbox);
nextButton.addEventListener("click", showNextFrame);
previousButton.addEventListener("click", showPreviousFrame);  