const mealsInLs = JSON.parse(localStorage.getItem("favoris")) || [];

if(mealsInLs == ""){
    const noMealTitle = document.getElementById("title").innerHTML = `No <span id="text-orange">favorite</span> meals yet`
    const coloredText = document.getElementById("text-orange");
    coloredText.style.color = "orange"
}
const blockMain = document.querySelector(".block-main");
blockMain.innerHTML = "";
mealsInLs.forEach((el, index) => {
    blockMain.innerHTML += `
    <div class="block-meal">
        <i class="fa-solid fa-rectangle-xmark" onclick="deleteMealFromLs(${index})" data-index="${index}"></i>
        <a href="./meal.html?id=${el.idMeal}">
            <div class="block-photo">
                <img class="photo-meal" src="${el.strMealThumb}" alt="">
            </div>
        </a>
        <div class="description">
            <p class="name-meal">${el.strMeal}</p>
           
        </div>
    </div>`;
});

function deleteMealFromLs(index) {
    const blockMeal = document.querySelector(".block-meal");
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    // Vérifiez si l'index est valide
    if (index >= 0 && index < favoris.length) {
        // Supprimer l'élément à cet index
        favoris.splice(index, 1);
        localStorage.setItem("favoris", JSON.stringify(favoris));
        // Rechargez la page ou mettez à jour votre interface ici
        location.reload();
    } else {

    }
}


const activePage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a").
forEach(link =>{
    if (link.href.includes(`${activePage}`)){
        link.classList.add("active")
    }

})