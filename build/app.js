const searchBtn = document.getElementById('search-btn')
const mealList = document.getElementById('meal');
const mealContent = document.getElementById('meal-content')
const closeBtn = document.getElementById('close-btn');


searchBtn.addEventListener('click', getMealList)
closeBtn.addEventListener('click', () => {
  mealContent.parentElement.classList.remove('showRecipe')
})

//get meal list
function getMealList() {
  let searchInput = document.getElementById('search-input').value.trim()
  if (searchInput === "") {
    mealList.innerHTML = "You must enter an ingredient first 👆🏼"
    mealList.classList.add('enter-ingredient')
    return;
  }
  
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(res => res.json())
    .then(data => {
      let html = "";
        if(data.meals) {
          data.meals.map(meal => {
            html += `
            <div data-id="${meal.idMeal}" class="rounded-lg bg-white shadow-lg p-0 pb-12 mb-8 lg:p-8 ">
              <div class="relative overflow-hidden rounded-t-lg lg:shadow-md pb-80 lg:pb-60 mb-6 lg:rounded-lg">
                <img 
                  alt="food" src="${meal.strMealThumb}"
                  class="object-top absolute h-80 lg:h-60 w-full object-cover shadow-lg lg:rounded-lg"
                >
              </div>
              <div class="block">
                <h3 class="font-bold text-transparent text-lg bg-clip-text bg-gradient-to-r from-slate-500 to-slate-900 my-5">
                  ${meal.strMeal}
                </h3>
                <div class="recipe-btn flex justify-center align-middle rounded-full bg-orange-500 opacity-90 hover:bg-orange-600 py-2 px-7 mx-2 text-slate-100 font-medium text-center lg:w-44 lg:mx-auto">
                  <a href="#" class="recipe-btn">
                    Get Recipe
                  </a>
                </div>
              </div>
            </div>
            `
          })
          mealList.classList.remove('meal-not-found')
          
        } else {
          html = "Sorry😞, we didn't find any meal! Try different keywords."
          mealList.classList.add('meal-not-found')
          mealList.classList.remove('enter-ingredient')
        }
        mealList.innerHTML = html;
    })
}

mealList.addEventListener('click', function(e) {
  e.preventDefault()
  if (e.target.classList.contains('recipe-btn')) {
    let selectedMeal = e.target.closest('[data-id]');
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMeal.dataset.id}`)
      .then(res => res.json())
      .then(data => recipeModal(data.meals))
  }
})

function recipeModal(meal) {
  meal = meal[0]
  let html = `
  
    <h3 class="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-slate-500 to-slate-900 my-5 py-5 lg:text-5xl">
      ${meal.strMeal}
    </h3>
    <div class="flex gap-5 my-5 text-sm font-extrabold text-orange-500 opacity-80">
      <p class="">Category: ${meal.strCategory}</p>
      <p class="">Style: ${meal.strArea}</p>
    </div>
    
    <div class="">
      <h3 class="text-md font-bold my-5 text-slate-700">Instructions:</h3>
      <p class="text-sm leading-8 md:leading-8 my-5">${meal.strInstructions}</p>
    </div>
    
    <div class="grid text-center mb-10">
    
    <img src="${meal.strMealThumb}" alt="meal" height="100px" width="100px"
    class="rounded-full mx-auto my-5 align-center ">

      <a href="${meal.strYoutube}" target="_blank" class="underline mx-auto py-2 px-12 mb-0 font-medium text-red-700">Watch Video</a>
    </div>
    
`
  mealContent.innerHTML = html
  mealContent.parentElement.classList.add('showRecipe')
}