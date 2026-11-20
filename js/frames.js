// Gallery Image Collection

const frameImages = [
    {
        title: "A Flash of Scarlet",
        category: "nature",
        image: "a-flash-of-scarlet.jpg",
        featured: true
    },
    {
        title: "Alpine Valley",
        category: "nature",
        image: "Alpine-Valley.jpg",
        featured: true
    },
    {
        title: "Blue Haze",
        category: "nature",
        image: "Blue-Haze.jpg"
    },
    {
        title: "Canopy",
        category: "nature",
        image: "Canopy.jpg"
    },
    {
        title: "Fading Bloom",
        category: "nature",
        image: "Fading-Bloom.jpg"
    },
    {
        title: "Hidden Falls",
        category: "nature",
        image: "hidden-falls.jpg"
    },
    {
        title: "Into the Wild",
        category: "nature",
        image: "Into-the-Wild.jpg"
    },
    {
        title: "Pastures",
        category: "nature",
        image: "Pastures.jpg"
    },
    {
        title: "Sparrow",
        category: "nature",
        image: "sparrow_nature.jpg"
    },
    {
        title: "Starfall",
        category: "nature",
        image: "starfall.jpg"
    },
    {
        title: "Stillwater",
        category: "nature",
        image: "stillwater.jpg"
    },
    {
        title: "Uran",
        category: "nature",
        image: "uran-wang-jcT3QhiiDE8-unsplash.jpg"
    },
    {
        title: "Veil of Green",
        category: "nature",
        image: "Veil-of-Green.jpg"
    },
    {
        title: "Verdant",
        category: "nature",
        image: "Verdant.jpg"
    },
    {
        title: "Wild Current",
        category: "nature",
        image: "wild-current.jpg"
    },
    {
        title: "Wildflower",
        category: "nature",
        image: "Wildflower.jpg"
    }
];

const framesGrid = document.querySelector("#frames-grid");

function renderFrames(images) {
    framesGrid.innerHTML = images.map((frame, index) => `
        <div class="frame-card" data-category="${frame.category}">
            <img
                src="assets/images/${frame.category}/${frame.image}"
                alt="${frame.title}"
                loading="lazy"
            >
            <span class="frame-caption">${frame.title}</span>
        </div>
    `).join("");
}

renderFrames(frameImages.filter(frame => frame.featured));


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

// Lightbox Keyboard Controls

document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight" && availableFrames.length > 1) {
        showNextFrame();
    }

    if (event.key === "ArrowLeft" && availableFrames.length > 1) {
        showPreviousFrame();
    }
});

// Closes Lightbox on Background Click

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
}); 