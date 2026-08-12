document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const imageId = params.get("id");

    if (!imageId) {
        showImageError();
        return;
    }

    const image = window.IMAGE_DATA?.[imageId];

    if (!image) {
        showImageError();
        return;
    }

    document.title =
        `${image.title} | BRICE IMAGE`;

    const category =
        document.getElementById("image-category");

    if (category) {
        category.textContent =
            `BRICE IMAGE / ${image.category.toUpperCase()}`;
    }

    const title =
        document.getElementById("image-title");

    if (title) {
        title.textContent =
            image.title;
    }

    const description =
        document.getElementById("image-description");

    if (description) {
        description.textContent =
            image.description;
    }

    const mainImage =
        document.getElementById("main-image");

    if (mainImage) {

        mainImage.src =
            image.image;

        mainImage.alt =
            image.alt;

    }

    const infoCategory =
        document.getElementById("info-category");

    if (infoCategory) {

        infoCategory.textContent =
            image.categoryName;

    }

    const downloadButton =
        document.getElementById("download-button");

    if (downloadButton) {

        downloadButton.href =
            image.image;

        downloadButton.download =
            `${image.id}.webp`;

    }

});


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
