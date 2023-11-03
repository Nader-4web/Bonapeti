performSearch()
getMealByCategory()


async function getmealByName(){
    const searchbar = document.getElementById("searchbar")
    const searchedMeal = searchbar.value
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`)
    const mealsArray = await resp.json();
    const meals = mealsArray.meals
    console.log(meals)
    if(!meals){
        alert("This meal is not in our database")
    }
    const blockMain = document.querySelector(".block-main");
    blockMain.innerHTML ="";

    meals.forEach(el => {

        blockMain.innerHTML+=`
        <div class="block-meal">
            <div class="block-photo">
                <img class="photo-meal" src="${el.strMealThumb}" alt="">
            </div>
        <div class="description">
            <p class="name-meal">${el.strMeal}</p>
            <span><i class="fa-solid fa-heart heart-meal"></i></span>
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
        console.log(clickedCategory)

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${clickedCategory}`)
        .then(resp => resp.json())
        .then(data =>{
            const meals = data.meals
                const blockMain = document.querySelector(".block-main");
                blockMain.innerHTML ="";
                meals.forEach(el => {
            
                    blockMain.innerHTML+=`
                    <div class="block-meal">
                        <div class="block-photo">
                            <img class="photo-meal" src="${el.strMealThumb}" alt="">
                        </div>
                    <div class="description">
                        <p class="name-meal">${el.strMeal}</p>
                        <span><i class="fa-solid fa-heart heart-meal"></i></span>
                    </div>
                    </div>`
            
                });
            
            console.log(meals)
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
    console.log(meals)
    if(!meals){
        alert("This meal is not in our database")
    }
    const blockMain = document.querySelector(".block-main");
    blockMain.innerHTML ="";

    meals.forEach(el => {

        blockMain.innerHTML+=`
        <div class="block-meal">
            <div class="block-photo">
                <img class="photo-meal" src="${el.strMealThumb}" alt="">
            </div>
        <div class="description">
            <p class="name-meal">${el.strMeal}</p>
            <span><i class="fa-solid fa-heart heart-meal"></i></span>
        </div>
        </div>`

    });

}

getrandomCategory()