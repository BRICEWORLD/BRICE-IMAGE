document.addEventListener("DOMContentLoaded", () => {


    const params =
        new URLSearchParams(
            window.location.search
        );


    const categoryId =
        params.get("id");


    if (!categoryId) {
        showCategoryError();
        return;
    }


    const category =
        window.CATEGORY_DATA?.[categoryId];


    if (!category) {
        showCategoryError();
        return;
    }



    /* TITLE */

    document.title =
        `${category.title} | BRICE IMAGE`;



    /* CATEGORY INFO */

    const name =
        document.getElementById(
            "category-name"
        );


    if (name) {

        name.textContent =
            category.name;

    }



    const description =
        document.getElementById(
            "category-description"
        );


    if (description) {

        description.textContent =
            category.description;

    }



    /* COVER IMAGE */

    const cover =
        document.getElementById(
            "category-cover"
        );


    if (cover) {

        cover.src =
            category.image;

        cover.alt =
            category.title;

    }



    loadCategoryImages(
        categoryId
    );


});





function loadCategoryImages(categoryId){


    const grid =
        document.getElementById(
            "category-grid"
        );


    if (!grid) return;



    const images =
        Object.values(
            window.IMAGE_DATA || {}
        );



    const result =
        images.filter(image =>
            image.category === categoryId
        );



    grid.innerHTML = "";



    result.forEach(image => {



        const card =
            document.createElement("a");


        card.className =
            "image-card";


        card.href =
            `../image.html?id=${image.id}`;



        const img =
            document.createElement("img");


        img.src =
            `../${image.image}`;


        img.alt =
            image.alt ||
            image.title;


        img.loading =
            "lazy";



        card.appendChild(img);


        grid.appendChild(card);


    });


}




function showCategoryError(){


    const title =
        document.getElementById(
            "category-name"
        );


    if(title){

        title.textContent =
        "دسته پیدا نشد";

    }

}
