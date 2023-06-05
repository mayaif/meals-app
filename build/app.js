const searchBtn = document.getElementById('search-btn')
const mealList = document.getElementById('meal');
const mealDetails = document.getElementById('meal-details');
const closeBtn = document.getElementById('close-btn');


searchBtn.addEventListener('click', getMealList)
// mealList.addEventListener('click', getMealRecipe)

//get meal list
function getMealList() {
  let searchInput = document.getElementById('search-input').value.trim()
  if (searchInput === "") {
    mealList.innerHTML = "You need to enter an ingredient first 👆🏼"
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
            <div data-id="${meal.idMeal}" class="bg-white shadow-lg p-0 lg:p-8 pb-12 mb-8 rounded-lg">
              <div class="relative overflow-hidden rounded-t-lg lg:shadow-md pb-80 lg:pb-60 mb-6 lg:rounded-lg">
                <img 
                  alt="food" src="${meal.strMealThumb}"
                  class="object-top absolute h-80 lg:h-60 w-full object-cover shadow-lg lg:rounded-lg"
                >
              </div>
              <div>
                <h3 class="font-medium text-sm text-slate-800 my-5 lg:text-base">${meal.strMeal}</h3>
                <div>
                  <a href="#" class="recipe-btn flex justify-center align-middle rounded-full bg-orange-500 hover:bg-orange-600 py-2 px-7 text-slate-100 font-medium text-center lg:w-44 lg:mx-auto">
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

