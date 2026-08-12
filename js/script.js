/* =========================================================
   BRICE IMAGE - MAIN JAVASCRIPT
   Version 1.0
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            mainNav.classList.toggle("active");
            menuToggle.classList.toggle("active");

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICK
       ===================================================== */

    document.querySelectorAll(".main-nav a").forEach(link => {

        link.addEventListener("click", () => {

            if (mainNav) {
                mainNav.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

        });

    });


    /* =====================================================
       IMAGE LOADING
       ===================================================== */

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        const showImage = () => {
            image.classList.add("loaded");
        };


        // اگر تصویر قبلاً لود شده باشد
        if (image.complete && image.naturalWidth > 0) {

            showImage();

        } else {

            image.addEventListener("load", showImage, {
                once: true
            });

            image.addEventListener("error", () => {

                image.classList.add("image-error");

            }, {
                once: true
            });

        }

    });


    /* =====================================================
       IMAGE VIEWER
       ===================================================== */

    function openImageViewer(src, alt = "") {

        const viewer = document.createElement("div");

        viewer.className = "image-viewer";


        viewer.innerHTML = `
            <div class="viewer-overlay"></div>

            <div class="viewer-content"
                 role="dialog"
                 aria-modal="true">

                <button
                    class="viewer-close"
                    type="button"
                    aria-label="Close image">
                    ×
                </button>

                <img
                    src="${src}"
                    alt="${alt}">

                ${alt ? `<p>${alt}</p>` : ""}

            </div>
        `;


        document.body.appendChild(viewer);

        document.body.classList.add("viewer-open");


        const closeButton =
            viewer.querySelector(".viewer-close");

        const overlay =
            viewer.querySelector(".viewer-overlay");


        /* Close Viewer */

        const closeViewer = () => {

            viewer.remove();

            document.body.classList.remove(
                "viewer-open"
            );

        };


        if (closeButton) {
            closeButton.addEventListener(
                "click",
                closeViewer
            );
        }


        if (overlay) {
            overlay.addEventListener(
                "click",
                closeViewer
            );
        }


        /* Close with ESC */

        const escapeHandler = event => {

            if (event.key === "Escape") {

                closeViewer();

                document.removeEventListener(
                    "keydown",
                    escapeHandler
                );

            }

        };


        document.addEventListener(
            "keydown",
            escapeHandler
        );


        if (closeButton) {
            closeButton.focus();
        }

    }


    /* =====================================================
       IMAGE CARD CLICK
       ===================================================== */

    const imageCards =
        document.querySelectorAll(".image-card");


    imageCards.forEach(card => {

        card.addEventListener("click", () => {

            const image =
                card.querySelector("img");


            if (!image || !image.src) {
                return;
            }


            openImageViewer(
                image.src,
                image.alt
            );

        });

    });


    /* =====================================================
       SEARCH
       ===================================================== */

    const searchInput =
        document.querySelector("#searchInput");


    if (searchInput) {

        const searchableCards =
            document.querySelectorAll(".image-card");


        searchInput.addEventListener(
            "input",
            () => {

                const searchValue =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                searchableCards.forEach(card => {

                    const image =
                        card.querySelector("img");


                    const altText =
                        image?.alt?.toLowerCase() || "";


                    const matches =
                        altText.includes(searchValue);


                    card.style.display =
                        matches ? "" : "none";

                });

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".image-card, .section-heading, .category-hero"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show"
                            );


                            observerInstance.unobserve(
                                entry.target
                            );

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

    } else {

        // برای مرورگرهای قدیمی

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop =
        document.createElement("button");


    backToTop.className =
        "back-to-top";


    backToTop.type =
        "button";


    backToTop.innerHTML =
        "↑";


    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );


    document.body.appendChild(
        backToTop
    );


    const updateBackToTop = () => {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    };


    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    document.querySelectorAll(
        ".main-nav a"
    ).forEach(link => {

        const linkPage =
            link.getAttribute("href");


        if (!linkPage ||
            linkPage.startsWith("#")) {

            return;

        }


        const cleanLink =
            linkPage
                .split("/")
                .pop()
                .split("?")[0]
                .split("#")[0];


        if (cleanLink === currentPage) {

            link.classList.add(
                "active"
            );

        }

    });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    document.querySelectorAll(
        ".current-year"
    ).forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       PAGE READY
       ===================================================== */

    window.requestAnimationFrame(() => {

        document.body.classList.add(
            "page-loaded"
        );

    });

});
