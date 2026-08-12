/* =========================================================
   BRICE IMAGE - MAIN JAVASCRIPT
   Version 1.0
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("active");
        menuToggle.classList.toggle("active");

    });

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
   ========================================================= */

const navLinks = document.querySelectorAll(".main-nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (mainNav) {
            mainNav.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }

    });

});


/* =========================================================
   IMAGE LOADING EFFECT
   ========================================================= */

const images = document.querySelectorAll("img");

images.forEach(image => {

    image.addEventListener("load", () => {

        image.classList.add("loaded");

    });

});


/* =========================================================
   IMAGE CLICK EFFECT
   ========================================================= */

const imageCards = document.querySelectorAll(".image-card");

imageCards.forEach(card => {

    card.addEventListener("click", () => {

        const image = card.querySelector("img");

        if (!image) return;

        openImageViewer(image.src, image.alt);

    });

});


/* =========================================================
   IMAGE VIEWER
   ========================================================= */

function openImageViewer(src, alt) {

    const viewer = document.createElement("div");

    viewer.className = "image-viewer";

    viewer.innerHTML = `
        <div class="viewer-overlay"></div>

        <div class="viewer-content">

            <button class="viewer-close" aria-label="Close">
                ×
            </button>

            <img src="${src}" alt="${alt}">

            <p>${alt}</p>

        </div>
    `;

    document.body.appendChild(viewer);

    document.body.classList.add("viewer-open");


    const closeButton =
        viewer.querySelector(".viewer-close");

    const overlay =
        viewer.querySelector(".viewer-overlay");


    function closeViewer() {

        viewer.remove();

        document.body.classList.remove("viewer-open");

    }


    closeButton.addEventListener("click", closeViewer);

    overlay.addEventListener("click", closeViewer);


    document.addEventListener("keydown", function escapeHandler(event) {

        if (event.key === "Escape") {

            closeViewer();

            document.removeEventListener(
                "keydown",
                escapeHandler
            );

        }

    });

}


/* =========================================================
   SEARCH
   ========================================================= */

const searchInput =
    document.querySelector("#searchInput");

const searchableCards =
    document.querySelectorAll(".image-card");


if (searchInput) {

    searchInput.addEventListener("input", () => {

        const searchValue =
            searchInput.value.trim().toLowerCase();


        searchableCards.forEach(card => {

            const image =
                card.querySelector("img");

            if (!image) return;


            const altText =
                image.alt.toLowerCase();


            if (altText.includes(searchValue)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".image-card, .section-heading, .category-hero"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

const backToTop =
    document.createElement("button");

backToTop.className = "back-to-top";

backToTop.innerHTML = "↑";

backToTop.setAttribute(
    "aria-label",
    "Back to top"
);

document.body.appendChild(backToTop);


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const currentPage =
    window.location.pathname.split("/").pop();


navLinks.forEach(link => {

    const linkPage =
        link.getAttribute("href");

    if (!linkPage) return;


    const cleanLink =
        linkPage.split("/").pop();


    if (cleanLink === currentPage) {

        link.classList.add("active");

    }

});


/* =========================================================
   YEAR
   ========================================================= */

const yearElements =
    document.querySelectorAll(".current-year");


yearElements.forEach(element => {

    element.textContent =
        new Date().getFullYear();

});


/* =========================================================
   PAGE READY
   ========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});
