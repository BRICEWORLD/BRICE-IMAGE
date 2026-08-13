document.addEventListener(
"DOMContentLoaded",
()=>{


const params =
new URLSearchParams(
window.location.search
);


const categoryId =
params.get("id");


const category =
window.CATEGORY_DATA?.[categoryId];


if(!category){

document.getElementById(
"category-title"
).textContent =
"دسته‌بندی پیدا نشد";

return;

}



document.title =
`${category.title} | BRICE IMAGE`;



document.getElementById(
"category-label"
).textContent =
`BRICE IMAGE / ${category.title}`;



document.getElementById(
"category-title"
).textContent =
category.name;



document.getElementById(
"category-description"
).textContent =
category.description;



});
