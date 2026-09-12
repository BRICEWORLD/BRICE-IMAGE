document.addEventListener("DOMContentLoaded", async () => {

    /* =====================================================
       PAGE LOAD
    ===================================================== */

    document.body.classList.add("page-loaded");


    /* =====================================================
       GET CATEGORY ID
    ===================================================== */

    const params = new URLSearchParams(
        window.location.search
    );

    const categoryId = params.get("id");


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const title =
        document.getElementById("category-title");

    const description =
        document.getElementById("category-description");

    const grid =
        document.getElementById("category-grid");


    /* =====================================================
       CATEGORY DATA
    ===================================================== */

    const category =
        window.CATEGORY_DATA?.[categoryId];


    /* =====================================================
       CATEGORY NOT FOUND
    ===================================================== */

    if (!category) {

        if (title) {
            title.textContent = "دسته پیدا نشد";
        }

        if (description) {
            description.textContent =
                "دسته مورد نظر وجود ندارد.";
        }

        return;
    }


    /* =====================================================
       TITLE
    ===================================================== */

    document.title =
        `${category.name} | BRICE IMAGE`;


    if (title) {
        title.textContent =
            category.name;
    }


    if (description) {
        description.textContent =
            category.description || "";
    }


    /* =====================================================
       LOADING
    ===================================================== */

    if (grid) {

        grid.innerHTML = `
            <p class="loading-text">
                در حال بارگذاری تصاویر...
            </p>
        `;

    }


    /* =====================================================
       GITHUB API
    ===================================================== */

    const REPO =
        "BRICEWORLD/BRICE-IMAGE";

    const BRANCH =
        "main";


    async function getFolder(path) {

        const url =
            `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`;

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error(
                `GitHub API Error: ${response.status}`
            );
        }

        return await response.json();
    }


    /* =====================================================
       IMAGE FILE CHECK
    ===================================================== */

    function isImage(file) {

        if (file.type !== "file") {
            return false;
        }

        return /\.(jpg|jpeg|png|webp|gif)$/i.test(
            file.name
        );
    }


    /* =====================================================
       GET IMAGES
    ===================================================== */

    async function loadImages() {

        let files = [];


        /* ---------------------------------------------
           NORMAL CATEGORIES
        --------------------------------------------- */

        if (categoryId !== "profile") {

            files =
                await getFolder(
                    `images/${categoryId}`
                );

        }


        /* ---------------------------------------------
           PROFILE
        --------------------------------------------- */

        else {

            const girls =
                await getFolder(
                    "images/profile/girls"
                );

            const boys =
                await getFolder(
                    "images/profile/boys"
                );

            files = [
                ...girls,
                ...boys
            ];

        }


        /* ---------------------------------------------
           ONLY IMAGES
        --------------------------------------------- */

        return files
            .filter(isImage)
            .sort((a, b) =>
                a.name.localeCompare(
                    b.name,
                    undefined,
                    {
                        numeric: true,
                        sensitivity: "base"
                    }
                )
            );

    }


    /* =====================================================
       LOAD
    ===================================================== */

    try {

        const files =
            await loadImages();


        /* =================================================
           NO IMAGES
        ================================================= */

        if (files.length === 0) {

            if (grid) {

                grid.innerHTML = `
                    <p>
                        هنوز تصویری در این دسته اضافه نشده است.
                    </p>
                `;

            }

            return;
        }


        /* =================================================
           CLEAR GRID
        ================================================= */

        grid.innerHTML = "";


        /* =================================================
           CREATE CARDS
        ================================================= */

        files.forEach((file, index) => {

            const card =
                document.createElement("a");


            card.className =
                "image-card";


            /*
             * Unique ID
             */

            const imageId =
                file.path
                    .replace(/\//g, "-")
                    .replace(/\.[^/.]+$/, "");


            /*
             * GitHub Pages image URL
             */

            const imageUrl =
                `https://briceworld.github.io/BRICE-IMAGE/${file.path}`;


            /*
             * Image title
             */

            const imageTitle =
                file.name
                    .replace(/\.[^/.]+$/, "")
                    .replace(/[-_]/g, " ");


            /*
             * Link
             */

            card.href =
    `image.html?id=${encodeURIComponent(imageId)}`;


            /*
             * Card HTML
             */

            card.innerHTML = `

                <img
                    src="${imageUrl}"
                    alt="${imageTitle} | BRICE IMAGE"
                    loading="lazy"
                    decoding="async"
                >

                <h3>
                    ${imageTitle}
                </h3>

            `;


            grid.appendChild(card);

        });


    } catch (error) {

        console.error(
            "BRICE IMAGE ERROR:",
            error
        );


        if (grid) {

            grid.innerHTML = `
                <p>
                    خطا در بارگذاری تصاویر.
                    لطفاً دوباره تلاش کنید.
                </p>
            `;

        }

    }

});
