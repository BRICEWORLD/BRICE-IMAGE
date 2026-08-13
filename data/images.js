const IMAGE_DATA = {

    /* =====================================================
       AI IMAGES
    ===================================================== */

    "ai-001": {

        id: "ai-001",

        category: "ai",

        categoryName: "تصاویر هوش مصنوعی",

        title: "تصویر خلاقانه هوش مصنوعی",

        description:
            "یک تصویر خلاقانه تولیدشده با هوش مصنوعی از مجموعه BRICE IMAGE.",

        image:
    "images/ai/ai-001.jpg",

        alt:
            "تصویر خلاقانه تولیدشده با هوش مصنوعی",

        format: "jpg",

        free: true

    }

};


/* =====================================================
   BRICE IMAGE DATA SYSTEM
===================================================== */

window.IMAGE_DATA = IMAGE_DATA;


/* =====================================================
   HELPER FUNCTIONS
===================================================== */

window.BRICE = window.BRICE || {};


/*
   Get one image
*/

BRICE.getImage = function (id) {

    return IMAGE_DATA[id] || null;

};


/*
   Get all images
*/

BRICE.getAllImages = function () {

    return Object.values(IMAGE_DATA);

};


/*
   Get images by category
*/

BRICE.getByCategory = function (category) {

    return Object.values(IMAGE_DATA).filter(
        image => image.category === category
    );

};


/*
   Get related images
*/

BRICE.getRelatedImages = function (
    currentImage,
    limit = 6
) {

    if (!currentImage) {
        return [];
    }

    return Object.values(IMAGE_DATA)
        .filter(image =>
            image.id !== currentImage.id &&
            image.category === currentImage.category
        )
        .slice(0, limit);

};
