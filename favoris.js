const mealsInLs = JSON.parse(localStorage.getItem("favoris")) || [];

if(mealsInLs == ""){
    const noMealTitle = document.getElementById("title").innerHTML = `No <span id="text-orange">favorite</span> meals yet`
    const coloredText = document.getElementById("text-orange");
    const blockMain = document.querySelector(".block-main");
    const wrapper = document.querySelector(".wrapper")
    wrapper.style.position = "absolute"
    wrapper.style.top = "50%"
    wrapper.style.margin = "0"
    blockMain.style.display = "none"
    coloredText.style.color = "orange";
}
const blockMain = document.querySelector(".block-main");
blockMain.innerHTML = "";
mealsInLs.forEach((el, index) => {
    const isFavori = mealsInLs.some((fav) => fav.idMeal.toString() === el.idMeal);
    // <i class="fa-solid fa-rectangle-xmark" onclick="deleteMealFromLs(${index})" data-index="${index}"></i>

    blockMain.innerHTML += `
    <div class="block-meal">
        <a href="./meal.html?id=${el.idMeal}">
            <div class="block-photo">
                <img class="photo-meal" src="${el.strMealThumb}" alt="">
            </div>
        </a>
        <div class="description">
            <p class="name-meal">${el.strMeal}</p>
            <span><i class="fa-solid fa-heart heart-meal" onclick="deleteMealFromLs(${index})" data-index="${index}"></i></span>

           
        </div>
    </div>`;
});

function deleteMealFromLs(index) {

    if(confirm("Erase this meal from favorite ?")){
        let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
        // Vérifiez si l'index est valide
        if (index >= 0 && index < favoris.length) {
            // Supprimer l'élément à cet index
            favoris.splice(index, 1);
            localStorage.setItem("favoris", JSON.stringify(favoris));
            // Rechargez la page ou mettez à jour votre interface ici
            location.reload();
        } 
    }else {
        return
    }
}


const activePage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a").
forEach(link =>{
    if (link.href.includes(`${activePage}`)){
        link.classList.add("active")
    }

})