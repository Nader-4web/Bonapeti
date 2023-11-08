performSearch()
getMealByCategory()
getrandomCategory()


async function getmealByName(){
    const searchbar = document.getElementById("searchbar")
    const searchedMeal = searchbar.value
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`)
    const mealsArray = await resp.json();
    const meals = mealsArray.meals
    if(!meals){
        alert("This meal is not in our database")
    }
    const blockMain = document.querySelector(".block-main");
    const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

    blockMain.innerHTML ="";

    meals.forEach(el => {
        const isFavori = favoris.some(favMeal => favMeal.idMeal.toString() === el.idMeal);  
        const heartClass = isFavori ? "fa-heart active" : "fa-heart";
        blockMain.innerHTML+=`
        <div class="block-meal">
        <a href="./meal.html?id=${el.idMeal}"><div class="block-photo">
                <img class="photo-meal" src="${el.strMealThumb}" alt="">
            </div></a>
        <div class="description">
            <p class="name-meal">${el.strMeal}</p>
            <span><i class="fa-solid fa-heart heart-meal ${heartClass}" onclick="addToFavorite(this,'${el.strMeal}', ${el.idMeal}, '${el.strMealThumb}')"></i></span>
        </div>
        </div>`

    });

    
}
function performSearch(){
    const searchbar = document.getElementById("searchbar")
    searchbar.addEventListener("keydown", (e)=>{
        if (e.key === "Enter"){
            getmealByName()
        }
    })
   
}


 function getMealByCategory(){
    const blockCategories = document.querySelector(".block-categories");
    blockCategories.addEventListener("click", (e)=>{
        e.preventDefault()
        const clickedCategory = e.target.id

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${clickedCategory}`)
        .then(resp => resp.json())
        .then(data => {
            const meals = data.meals;
            const blockMain = document.querySelector(".block-main");
            const favoris = JSON.parse(localStorage.getItem("favoris")) || [];
            blockMain.innerHTML = "";
        
            meals.forEach(el => {
                const isFavori = favoris.some(favMeal => favMeal.idMeal.toString() === el.idMeal);  
                const heartClass = isFavori ? "fa-heart active" : "fa-heart";
                blockMain.innerHTML += `
                    <div class="block-meal">
                        <a href="./meal.html?id=${el.idMeal}">
                            <div class="block-photo">
                                <img class="photo-meal" src="${el.strMealThumb}" alt="">
                            </div>
                        </a>
                        <div class="description">
                            <p class="name-meal">${el.strMeal}</p>
                            <span><i class="fa-solid heart-meal ${heartClass}" onclick="addToFavorite(this,'${el.strMeal}', ${el.idMeal}, '${el.strMealThumb}')"></i></span>
                        </div>
                    </div>`;
            });
        
        })
        

        .catch(error => {
            console.log(error("erreur:  " + error))
        })
       
    })
 }


async function getrandomCategory(){
    const arrayCategories = ["beef", "chicken", "dessert","lamb","miscellaneous","pasta","pork","seafood","side","starter","vegan","vegetarian",
    "breakfast","goat"];
    const randomIndex = Math.floor(Math.random() * arrayCategories.length);
    const randomCategory = arrayCategories[randomIndex]
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${randomCategory}`)
    const mealsArray = await resp.json();
    const meals = mealsArray.meals
    if(!meals){
        alert("This meal is not in our database")
    }
    const mealsInLs = JSON.parse(localStorage.getItem("favoris")) || [];
    const blockMain = document.querySelector(".block-main");
    blockMain.innerHTML ="";

    meals.forEach(el => {
        const isFavori = mealsInLs.some((fav) => fav.idMeal.toString() === el.idMeal);
        const heartClass = isFavori ? "fa-heart active" : "fa-heart";
        blockMain.innerHTML+=`
        <div class="block-meal">
                <a href="./meal.html?id=${el.idMeal}"><div class="block-photo">
                    <img class="photo-meal" src="${el.strMealThumb}" alt="">
                </div></a>
            <div class="description">
                <p class="name-meal">${el.strMeal}</p>
                <span><i class="fa-solid fa-heart heart-meal ${heartClass}" onclick="addToFavorite(this,'${el.strMeal}', ${el.idMeal}, '${el.strMealThumb}')"></i></span>
            </div>
        </div>`

        
    });
    
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

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a").
forEach(link =>{
    if (link.href.includes(`${activePage}`)){
        link.classList.add("active")
    }

})