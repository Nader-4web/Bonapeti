let id = new URL(location.href).searchParams.get("id")

async function getMealFromId(){

    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const arrayMeal = await resp.json()
    const meal = arrayMeal.meals[0]
    displayMeal(meal)

}

getMealFromId()

const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

function displayMeal(meal){
    const isFavori = favoris.some(favMeal => favMeal.idMeal.toString() === meal.idMeal);
    const heartClass = isFavori ? "fa-heart active" : "fa-heart";
    const header = document.getElementById("header");
    const instructions = document.querySelector(".instructions");
    const button = document.getElementById("see-more");
    instructions.innerHTML = meal.strInstructions
    // Si le texte instruction ne fait qu'une ligne, alors enlever le bouton "Read more"
    if(instructions.clientHeight < "25"){
        button.style.display ="none"
    }


    header.innerHTML+=
    `<div class="block-photo">

        <div id="block-youtube">
            <div id="meal-name-youtube">Watch video instructions for ${meal.strMeal}</div>
                <a href="${meal.strYoutube}"><div class="block-play"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                <linearGradient id="PgB_UHa29h0TpFV_moJI9a_9a46bTk3awwI_gr1" x1="9.816" x2="41.246" y1="9.871" y2="41.301" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5a"></stop><stop offset=".443" stop-color="#ee3d4a"></stop><stop offset="1" stop-color="#e52030"></stop></linearGradient><path fill="url(#PgB_UHa29h0TpFV_moJI9a_9a46bTk3awwI_gr1)" d="M45.012,34.56c-0.439,2.24-2.304,3.947-4.608,4.267C36.783,39.36,30.748,40,23.945,40	c-6.693,0-12.728-0.64-16.459-1.173c-2.304-0.32-4.17-2.027-4.608-4.267C2.439,32.107,2,28.48,2,24s0.439-8.107,0.878-10.56	c0.439-2.24,2.304-3.947,4.608-4.267C11.107,8.64,17.142,8,23.945,8s12.728,0.64,16.459,1.173c2.304,0.32,4.17,2.027,4.608,4.267	C45.451,15.893,46,19.52,46,24C45.89,28.48,45.451,32.107,45.012,34.56z"></path><path d="M32.352,22.44l-11.436-7.624c-0.577-0.385-1.314-0.421-1.925-0.093C18.38,15.05,18,15.683,18,16.376	v15.248c0,0.693,0.38,1.327,0.991,1.654c0.278,0.149,0.581,0.222,0.884,0.222c0.364,0,0.726-0.106,1.04-0.315l11.436-7.624	c0.523-0.349,0.835-0.932,0.835-1.56C33.187,23.372,32.874,22.789,32.352,22.44z" opacity=".05"></path><path d="M20.681,15.237l10.79,7.194c0.689,0.495,1.153,0.938,1.153,1.513c0,0.575-0.224,0.976-0.715,1.334	c-0.371,0.27-11.045,7.364-11.045,7.364c-0.901,0.604-2.364,0.476-2.364-1.499V16.744C18.5,14.739,20.084,14.839,20.681,15.237z" opacity=".07"></path><path fill="#fff" d="M19,31.568V16.433c0-0.743,0.828-1.187,1.447-0.774l11.352,7.568c0.553,0.368,0.553,1.18,0,1.549	l-11.352,7.568C19.828,32.755,19,32.312,19,31.568z"></path>
                </svg></div></a>
                <div id="overlay"></div>
            </div>
                <img src="${meal.strMealThumb}" alt="" class="img-meal">
        </div>
        <div class="block-name-heart">
            <p id="name-meal">${meal.strMeal}</p>
            <span><i class="fa-solid fa-heart heart-meal ${heartClass}" onclick="addToFavorite(this,'${meal.strMeal}', ${meal.idMeal}, '${meal.strMealThumb}')"></i></span>
        </div>
        <div class="location">
            <i class="fa-solid fa-location-dot"></i>
            <span id="location">${meal.strArea}</span>
    </div>`

    if(meal.strYoutube == ""){
        const blockYoutube = document.getElementById("block-youtube");
        blockYoutube.remove()
    }

    const ingredients = []

for(let i =1; i < 20; i++){
    if(meal["strIngredient" + i]){
        ingredients.push(`<span class="ingredients-el">${meal["strIngredient" +i]}</span>` + " - " + `<span class="measure-el">${meal["strMeasure" + i]}</span>`)
    }
}
const ingredientsList = document.querySelector(".ingredients");
ingredientsList.innerHTML = `<ul>   
        ${ingredients.map((ing) =>`<li>${ing}</li>`).join("")}
    </ul>`
 
}


function addToFavorite(heartElement,strMeal, idMeal, strMealThumb) {

    heartElement.classList.toggle("active")
   
    // Récupérer la liste depuis le localStorage (si elle existe)
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    const mealObject = { strMeal, idMeal, strMealThumb };

    let favMealInLs = favoris.find(m => m.idMeal == mealObject.idMeal)
    if(favMealInLs && !heartElement.classList.contains("active")){
        deleteMealFromLs(idMeal)
        return
        
    }else if(heartElement.classList.contains("active")){
        // Ajouter le nouvel élément à la liste
        favoris.push(mealObject);
    
        // Stocker la liste mise à jour dans le localStorage
        localStorage.setItem("favoris", JSON.stringify(favoris));
         
    }  
    
}


function deleteMealFromLs(idMeal){

    let favoris = JSON.parse(localStorage.getItem("favoris"));
    const index = favoris.findIndex(meal => meal.idMeal === idMeal)
    if (index !== -1) {
        // Supprimer l'élément à cet index
        favoris.splice(index, 1);
        localStorage.setItem("favoris", JSON.stringify(favoris));
        
    }
   
}


 function seeMore() {
    const instructions = document.querySelector(".instructions");
    const button = document.getElementById("see-more");

    let isExpanded = false;

    button.addEventListener("click", () => {
        instructions.classList.toggle("see-instructions");

        // Change le texte du bouton en fonction de l'état actuel
        if (isExpanded) {
            button.textContent = "Read more...";
        } else {
            button.textContent = "Read less";
        }

        // Inverse l'état actuel
        isExpanded = !isExpanded;
    });

}

seeMore();