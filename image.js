document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GET IMAGE ID
    ===================================================== */

    const params = new URLSearchParams(window.location.search);
    const imageId = params.get("id");

    if (!imageId) {
        showImageError();
        return;
    }


    /* =====================================================
       GET IMAGE DATA
    ===================================================== */

    const image = window.IMAGE_DATA?.[imageId];

    if (!image) {
        showImageError();
        return;
    }


    /* =====================================================
       PAGE TITLE
    ===================================================== */

    document.title =
        `${image.title} | BRICE IMAGE`;


    /* =====================================================
       CATEGORY BADGE
    ===================================================== */

    const category =
        document.getElementById("image-category");

    if (category) {

        const categoryText =
            image.categoryName || image.category || "BRICE IMAGE";

        category.textContent =
            `BRICE IMAGE / ${categoryText.toUpperCase()}`;
    }


    /* =====================================================
       TITLE
    ===================================================== */

    const title =
        document.getElementById("image-title");

    if (title) {

        title.textContent =
            image.title || "تصویر";
    }


    /* =====================================================
       DESCRIPTION
    ===================================================== */

    const description =
        document.getElementById("image-description");

    if (description) {

        description.textContent =
            image.description ||
            "تصویری خلاقانه از مجموعه BRICE IMAGE.";
    }


    /* =====================================================
       MAIN IMAGE
    ===================================================== */

    const mainImage =
        document.getElementById("main-image");

    if (mainImage) {

        mainImage.src =
            image.image;

        mainImage.alt =
            image.alt ||
            image.title ||
            "BRICE IMAGE";

        mainImage.loading =
            "eager";

        mainImage.decoding =
            "async";

        /* Image error */

        mainImage.addEventListener("error", () => {

            mainImage.style.display = "none";

        });

    }


    /* =====================================================
       IMAGE CATEGORY INFO
    ===================================================== */

    const infoCategory =
        document.getElementById("info-category");

    if (infoCategory) {

        infoCategory.textContent =
            image.categoryName ||
            image.category ||
            "-";
    }


    /* =====================================================
       DOWNLOAD
    ===================================================== */

    const downloadButton =
        document.getElementById("download-button");

    if (downloadButton) {

        downloadButton.href =
            image.image;

        downloadButton.download =
            `${image.id || imageId}.webp`;

        downloadButton.setAttribute(
            "aria-label",
            `دانلود ${image.title || "تصویر"}`
        );

    }


    /* =====================================================
       SEO META DESCRIPTION
    ===================================================== */

    updateMetaDescription(
        image.description ||
        image.title ||
        "مشاهده و دانلود تصاویر باکیفیت در BRICE IMAGE."
    );


    /* =====================================================
       RELATED IMAGES
    ===================================================== */

    loadRelatedImages(
        imageId,
        image
    );


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "image-page-loaded"
    );

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
   RELATED IMAGES
========================================================= */

function loadRelatedImages(
    currentId,
    currentImage
) {

    const grid =
        document.getElementById("related-grid");

    if (!grid) {
        return;
    }


    const allImages =
        window.IMAGE_DATA || {};


    const images =
        Object.values(allImages);


    /*

       First show images from
       the same category.

    */

    let related =
        images.filter(image =>

            image.id !== currentId &&
            image.category === currentImage.category

        );


    /*
       If there are not enough images
       from the same category,
       use other images as fallback.
    */

    if (related.length < 6) {

        const others =
            images.filter(image =>

                image.id !== currentId &&
                image.category !== currentImage.category

            );

        related =
            [
                ...related,
                ...others
            ];

    }


    /*
       Limit related images.

       Later when we have 1000+
       images this keeps the page fast.
    */

    related =
        related.slice(0, 6);


    /* Clear grid */

    grid.innerHTML = "";


    /*
       No related images yet
    */

    if (related.length === 0) {

        grid.innerHTML = `
            <p class="no-related">
                تصاویر بیشتری از این مجموعه به‌زودی اضافه می‌شود.
            </p>
        `;

        return;
    }


    /* =====================================================
       CREATE CARDS
    ===================================================== */

    related.forEach(image => {

        const card =
            document.createElement("a");

        card.className =
            "image-card";

        card.href =
            `image.html?id=${encodeURIComponent(image.id)}`;


        const img =
            document.createElement("img");

        img.src =
            image.image;

        img.alt =
            image.alt ||
            image.title ||
            "BRICE IMAGE";

        img.loading =
            "lazy";

        img.decoding =
            "async";


        /* =================================================
           CARD INFO
        ================================================= */

        const content =
            document.createElement("div");

        content.className =
            "related-card-info";


        const title =
            document.createElement("h3");

        title.textContent =
            image.title ||
            "تصویر";


        const category =
            document.createElement("span");

        category.textContent =
            image.categoryName ||
            image.category ||
            "";


        content.appendChild(title);
        content.appendChild(category);


        card.appendChild(img);
        card.appendChild(content);


        grid.appendChild(card);

    });

}



/* =========================================================
   IMAGE ERROR
========================================================= */

function showImageError() {

    const title =
        document.getElementById("image-title");

    const description =
        document.getElementById("image-description");

    const image =
        document.getElementById("main-image");

    const download =
        document.getElementById("download-button");


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
