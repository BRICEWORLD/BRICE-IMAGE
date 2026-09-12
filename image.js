document.addEventListener("DOMContentLoaded", async () => {

    /* =====================================================
       GET IMAGE ID
    ===================================================== */

    const params =
        new URLSearchParams(window.location.search);

    const imageId =
        params.get("id");


    if (!imageId) {

        showImageError();

        return;
    }


    /* =====================================================
       GITHUB CONFIG
    ===================================================== */

    const REPO =
        "BRICEWORLD/BRICE-IMAGE";

    const BRANCH =
        "main";


    /* =====================================================
       CATEGORY NAMES
    ===================================================== */

    const CATEGORY_NAMES = {

        ai:
            "تصاویر هوش مصنوعی",

        branding:
            "برندسازی",

        hero:
            "تصاویر خلاقانه",

        profile:
            "تصاویر پروفایل",

        tattoo:
            "طرح‌های تتو",

        wallpaper:
            "والپیپر"

    };


    /* =====================================================
       GET GITHUB FOLDER
    ===================================================== */

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
       CHECK IMAGE
    ===================================================== */

    function isImage(file) {

        return (
            file.type === "file" &&
            /\.(jpg|jpeg|png|webp|gif)$/i.test(
                file.name
            )
        );

    }


    /* =====================================================
       CREATE IMAGE OBJECT
    ===================================================== */

    function createImageData(
        file,
        categoryId
    ) {

        const title =
            file.name
                .replace(/\.[^/.]+$/, "")
                .replace(/[-_]/g, " ");


        const imageUrl =
            `https://briceworld.github.io/BRICE-IMAGE/${file.path}`;


        const format =
            file.name
                .split(".")
                .pop()
                .toUpperCase();


        return {

            id:
                file.path
                    .replace(/\//g, "-")
                    .replace(/\.[^/.]+$/, ""),

            category:
                categoryId,

            categoryName:
                CATEGORY_NAMES[categoryId] ||
                "BRICE IMAGE",

            title:
                title,

            description:
                `تصویری از مجموعه ${
                    CATEGORY_NAMES[categoryId] ||
                    "BRICE IMAGE"
                } در BRICE IMAGE.`,

            image:
                imageUrl,

            alt:
                `${title} | BRICE IMAGE`,

            format:
                format,

            free:
                true

        };

    }


    /* =====================================================
       FIND IMAGE
    ===================================================== */

    async function findImage() {

        const categories = [

            "ai",
            "branding",
            "hero",
            "tattoo",
            "wallpaper"

        ];


        /* ---------------------------------------------
           NORMAL CATEGORIES
        --------------------------------------------- */

        for (const category of categories) {

            try {

                const files =
                    await getFolder(
                        `images/${category}`
                    );


                const file =
                    files.find(item => {

                        if (!isImage(item)) {

                            return false;

                        }


                        const id =
                            item.path
                                .replace(/\//g, "-")
                                .replace(/\.[^/.]+$/, "");


                        return id === imageId;

                    });


                if (file) {

                    return createImageData(
                        file,
                        category
                    );

                }

            }

            catch (error) {

                console.warn(
                    `Could not load ${category}`,
                    error
                );

            }

        }


        /* ---------------------------------------------
           PROFILE GIRLS / BOYS
        --------------------------------------------- */

        for (const folder of [
            "girls",
            "boys"
        ]) {

            try {

                const files =
                    await getFolder(
                        `images/profile/${folder}`
                    );


                const file =
                    files.find(item => {

                        if (!isImage(item)) {

                            return false;

                        }


                        const id =
                            item.path
                                .replace(/\//g, "-")
                                .replace(/\.[^/.]+$/, "");


                        return id === imageId;

                    });


                if (file) {

                    return createImageData(
                        file,
                        "profile"
                    );

                }

            }

            catch (error) {

                console.warn(
                    `Could not load profile/${folder}`,
                    error
                );

            }

        }


        return null;

    }

async function loadRelatedImages(currentImage) {

    const grid =
        document.getElementById("related-grid");

    if (!grid) {
        return;
    }

    try {

        let files = [];

        /* =============================================
           GET CATEGORY FILES
        ============================================= */

        if (currentImage.category === "profile") {

            const girls =
                await getFolder("images/profile/girls");

            const boys =
                await getFolder("images/profile/boys");

            files = [
                ...girls,
                ...boys
            ];

        } else {

            files =
                await getFolder(
                    `images/${currentImage.category}`
                );

        }


        /* =============================================
           FILTER + SORT
        ============================================= */

        const related =
            files
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
                )
                .map(file =>
                    createImageData(
                        file,
                        currentImage.category
                    )
                )
                .filter(image =>
                    image.id !== currentImage.id
                )
                .slice(0, 6);


        /* =============================================
           NO RELATED
        ============================================= */

        if (!related.length) {

            grid.innerHTML = `
                <p class="no-related">
                    تصاویر بیشتری از این مجموعه
                    به‌زودی اضافه می‌شود.
                </p>
            `;

            return;
        }


        /* =============================================
           CLEAR
        ============================================= */

        grid.innerHTML = "";


        /* =============================================
           CREATE CARDS
        ============================================= */

        related.forEach(image => {

            const card =
                document.createElement("a");

            card.className =
                "image-card";

            card.href =
                `image.html?id=${encodeURIComponent(
                    image.id
                )}`;


            card.innerHTML = `

                <img
                    src="${image.image}"
                    alt="${image.alt}"
                    loading="lazy"
                    decoding="async"
                >

                <div class="related-card-info">

                    <h3>
                        ${image.title}
                    </h3>

                    <span>
                        ${image.categoryName}
                    </span>

                </div>

            `;

            grid.appendChild(card);

        });

    }

    catch (error) {

        console.error(
            "Related Images Error:",
            error
        );

        grid.innerHTML = `
            <p class="no-related">
                امکان بارگذاری تصاویر مشابه وجود ندارد.
            </p>
        `;

    }

}
    

    /* =====================================================
       LOAD MAIN IMAGE
    ===================================================== */

    try {

        const image =
            await findImage();


        if (!image) {

            showImageError();

            return;

        }


        /* ---------------------------------------------
           PAGE TITLE
        --------------------------------------------- */

        document.title =
            `${image.title} | BRICE IMAGE`;


        /* ---------------------------------------------
           CATEGORY
        --------------------------------------------- */

        const category =
            document.getElementById(
                "image-category"
            );


        if (category) {

            category.textContent =
                `BRICE IMAGE / ${image.categoryName}`;

        }


        /* ---------------------------------------------
           TITLE
        --------------------------------------------- */

        const title =
            document.getElementById(
                "image-title"
            );


        if (title) {

            title.textContent =
                image.title;

        }


        /* ---------------------------------------------
           DESCRIPTION
        --------------------------------------------- */

        const description =
            document.getElementById(
                "image-description"
            );


        if (description) {

            description.textContent =
                image.description;

        }


        /* ---------------------------------------------
           MAIN IMAGE
        --------------------------------------------- */

        const mainImage =
            document.getElementById(
                "main-image"
            );


        if (mainImage) {

            mainImage.src =
                image.image;

            mainImage.alt =
                image.alt;

            mainImage.loading =
                "eager";

            mainImage.decoding =
                "async";

        }


        /* ---------------------------------------------
           CATEGORY INFO
        --------------------------------------------- */

        const infoCategory =
            document.getElementById(
                "info-category"
            );


        if (infoCategory) {

            infoCategory.textContent =
                image.categoryName;

        }


        /* ---------------------------------------------
           FORMAT
        --------------------------------------------- */

        const formatElement =
            document.getElementById(
                "info-format"
            );


        if (formatElement) {

            formatElement.textContent =
                image.format;

        }


        /* ---------------------------------------------
           FREE STATUS
        --------------------------------------------- */

        const statusElement =
            document.querySelector(
                ".image-info-item:nth-child(3) strong"
            );


        if (statusElement) {

            statusElement.textContent =
                image.free
                    ? "رایگان"
                    : "غیر رایگان";

        }


        /* ---------------------------------------------
           DOWNLOAD
        --------------------------------------------- */

        const downloadButton =
            document.getElementById(
                "download-button"
            );


        if (downloadButton) {

            downloadButton.href =
                image.image;

            downloadButton.download =
                `${image.id}.${image.format.toLowerCase()}`;

            downloadButton.setAttribute(
                "aria-label",
                `دانلود ${image.title}`
            );

        }


        /* ---------------------------------------------
           SEO
        --------------------------------------------- */

        updateMetaDescription(
            image.description
        );


        /* ---------------------------------------------
           RELATED
        --------------------------------------------- */

        await loadRelatedImages(
            image
        );


        /* ---------------------------------------------
           PAGE READY
        --------------------------------------------- */

        document.body.classList.add(
            "image-page-loaded"
        );

    }

    catch (error) {

        console.error(
            "BRICE IMAGE ERROR:",
            error
        );

        showImageError();

    }

});



/* =========================================================
   META DESCRIPTION
========================================================= */

function updateMetaDescription(text) {

    let meta =
        document.querySelector(
            'meta[name="description"]'
        );


    if (!meta) {

        meta =
            document.createElement("meta");

        meta.name =
            "description";

        document.head.appendChild(meta);

    }


    meta.content =
        text;

}



/* =========================================================
   IMAGE ERROR
========================================================= */

function showImageError() {

    const title =
        document.getElementById(
            "image-title"
        );


    const description =
        document.getElementById(
            "image-description"
        );


    const image =
        document.getElementById(
            "main-image"
        );


    const download =
        document.getElementById(
            "download-button"
        );


    if (title) {

        title.textContent =
            "تصویر پیدا نشد";

    }


    if (description) {

        description.textContent =
            "متأسفانه تصویر موردنظر وجود ندارد یا لینک آن اشتباه است.";

    }


    if (image) {

        image.style.display =
            "none";

    }


    if (download) {

        download.style.display =
            "none";

    }

}
