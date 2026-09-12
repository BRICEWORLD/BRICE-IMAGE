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

            const url =
                `https://api.github.com/repos/${REPO}/contents/images/${category}?ref=${BRANCH}`;

            const response =
                await fetch(url);

            if (!response.ok) {
                continue;
            }

            const files =
                await response.json();


            const file =
                files.find(item => {

                    const generatedId =
                        item.path
                            .replace(/\//g, "-")
                            .replace(/\.[^/.]+$/, "");

                    return generatedId === imageId;
                });


            if (file) {

                return createImageData(
                    file,
                    category
                );

            }

        }


        /* ---------------------------------------------
           PROFILE
        --------------------------------------------- */

        const profileFolders = [
            "girls",
            "boys"
        ];


        for (const folder of profileFolders) {

            const url =
                `https://api.github.com/repos/${REPO}/contents/images/profile/${folder}?ref=${BRANCH}`;

            const response =
                await fetch(url);

            if (!response.ok) {
                continue;
            }

            const files =
                await response.json();


            const file =
                files.find(item => {

                    const generatedId =
                        item.path
                            .replace(/\//g, "-")
                            .replace(/\.[^/.]+$/, "");

                    return generatedId === imageId;
                });


            if (file) {

                return createImageData(
                    file,
                    "profile"
                );

            }

        }


        return null;

    }


    /* =====================================================
       CREATE IMAGE DATA
    ===================================================== */

    function createImageData(
        file,
        categoryId
    ) {

        const categoryNames = {

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


        const categoryName =
            categoryNames[categoryId] ||
            "BRICE IMAGE";


        const title =
            file.name
                .replace(/\.[^/.]+$/, "")
                .replace(/[-_]/g, " ");


        const imageUrl =
            `https://briceworld.github.io/BRICE-IMAGE/${file.path}`;


        return {

            id: imageId,

            category:
                categoryId,

            categoryName:
                categoryName,

            title:
                title,

            description:
                `تصویری از مجموعه ${categoryName} در BRICE IMAGE.`,

            image:
                imageUrl,

            alt:
                `${title} | BRICE IMAGE`,

            format:
                file.name
                    .split(".")
                    .pop()
                    .toUpperCase()

        };

    }


    /* =====================================================
       LOAD
    ===================================================== */

    try {

        const image =
            await findImage();


        if (!image) {

            showImageError();

            return;
        }


        /* =================================================
           PAGE TITLE
        ================================================= */

        document.title =
            `${image.title} | BRICE IMAGE`;


        /* =================================================
           CATEGORY
        ================================================= */

        const category =
            document.getElementById(
                "image-category"
            );


        if (category) {

            category.textContent =
                `BRICE IMAGE / ${image.categoryName}`;

        }


        /* =================================================
           TITLE
        ================================================= */

        const title =
            document.getElementById(
                "image-title"
            );


        if (title) {

            title.textContent =
                image.title;

        }


        /* =================================================
           DESCRIPTION
        ================================================= */

        const description =
            document.getElementById(
                "image-description"
            );


        if (description) {

            description.textContent =
                image.description;

        }


        /* =================================================
           MAIN IMAGE
        ================================================= */

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


        /* =================================================
           CATEGORY INFO
        ================================================= */

        const infoCategory =
            document.getElementById(
                "info-category"
            );


        if (infoCategory) {

            infoCategory.textContent =
                image.categoryName;

        }


        /* =================================================
           FORMAT
        ================================================= */

        const formatElement =
            document.getElementById(
                "info-format"
            );


        if (formatElement) {

            formatElement.textContent =
                image.format;

        }


        /* =================================================
           DOWNLOAD
        ================================================= */

        const downloadButton =
            document.getElementById(
                "download-button"
            );


        if (downloadButton) {

            downloadButton.href =
                image.image;

            downloadButton.download =
                image.id +
                "." +
                image.format.toLowerCase();

            downloadButton.setAttribute(
                "aria-label",
                `دانلود ${image.title}`
            );

        }


        /* =================================================
           SEO
        ================================================= */

        updateMetaDescription(
            image.description
        );


        /* =================================================
           PAGE READY
        ================================================= */

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
