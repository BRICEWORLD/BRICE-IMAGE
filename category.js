document.addEventListener("DOMContentLoaded", () => {

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
       GET CATEGORY
    ===================================================== */

    const category =
        window.CATEGORY_DATA?.[categoryId];


    const title =
        document.getElementById("category-title");

    const description =
        document.getElementById("category-description");

    const grid =
        document.getElementById("category-grid");


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
       LOAD IMAGES
    ===================================================== */

    const images =
        Object.values(
            window.IMAGE_DATA || {}
        ).filter(
            image =>
                image.category === categoryId
        );


    /* =====================================================
       NO IMAGES
    ===================================================== */

    if (images.length === 0) {

        if (grid) {

            grid.innerHTML = `
                <p>
                    هنوز تصویری در این دسته اضافه نشده است.
                </p>
            `;

        }

        return;
    }


    /* =====================================================
       CREATE IMAGE CARDS
    ===================================================== */

    images.forEach(image => {

        const card =
            document.createElement("a");


        card.href =
            `image.html?id=${image.id}`;


        card.className =
            "image-card";


        card.innerHTML = `
            
            <img
                src="${image.image}"
                alt="${image.alt || image.title}"
                loading="lazy"
            >

            <h3>
                ${image.title}
            </h3>

        `;


        grid.appendChild(card);

    });

});
