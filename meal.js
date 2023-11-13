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
            <a href="${meal.strYoutube}"><div class="block-play"><i class="fa-brands fa-youtube"></i></div></a>
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