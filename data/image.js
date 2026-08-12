document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const imageId = params.get("id");

    if (!imageId) {
        showImageError();
        return;
    }

    const image = IMAGE_DATA[imageId];

    if (!image) {
        showImageError();
        return;
    }


    /* =========================
       PAGE INFORMATION
    ========================= */

    document.title =
        `${image.title} | BRICE IMAGE`;


    /* =========================
       CATEGORY
    ========================= */

    const category =
        document.getElementById("image-category");

    if (category) {
        category.textContent =
            `BRICE IMAGE / ${image.category.toUpperCase()}`;
    }


    /* =========================
       TITLE
    ========================= */

    const title =
        document.getElementById("image-title");

    if (title) {
        title.textContent =
            image.title;
    }


    /* =========================
       DESCRIPTION
    ========================= */

    const description =
        document.getElementById("image-description");

    if (description) {
        description.textContent =
            image.description;
    }


    /* =========================
       MAIN IMAGE
    ========================= */

    const mainImage =
        document.getElementById("main-image");

    if (mainImage) {

        mainImage.src =
            image.image;

        mainImage.alt =
            image.alt;

    }


    /* =========================
       INFO
    ========================= */

    const infoCategory =
        document.getElementById("info-category");

    if (infoCategory) {

        infoCategory.textContent =
            image.categoryName;

    }


    /* =========================
       DOWNLOAD
    ========================= */

    const downloadButton =
        document.getElementById("download-button");

    if (downloadButton) {

        downloadButton.href =
            image.image;

        downloadButton.download =
            `${image.id}.webp`;

    }

});


/* =====================================================
   ERROR
===================================================== */

function showImageError() {

    const title =
        document.getElementById("image-title");

    const description =
        document.getElementById("image-description");


    if (title) {

        title.textContent =
            "تصویر پیدا نشد";

    }


    if (description) {

        description.textContent =
            "متأسفانه تصویر موردنظر وجود ندارد یا لینک آن اشتباه است.";

    }

}
