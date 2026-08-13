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
"دسته پیدا نشد";

return;

}


/*
TITLE
*/

document.title =
`${category.name} | BRICE IMAGE`;


document.getElementById(
"category-title"
).textContent =
category.name;


document.getElementById(
"category-description"
).textContent =
category.description;



/*
LOAD IMAGES
*/


const grid =
document.getElementById(
"category-grid"
);



const images =
Object.values(
window.IMAGE_DATA || {}
).filter(
image =>
image.category === categoryId
);



if(images.length === 0){

grid.innerHTML =
`
<p>
هنوز تصویری در این دسته اضافه نشده است.
</p>
`;

return;

}



images.forEach(image=>{


const card =
document.createElement("a");


card.href =
`image.html?id=${image.id}`;


card.className =
"image-card";



card.innerHTML =
`

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
