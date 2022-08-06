const getReciepebtn = document.querySelector('.get-reciepe-btn')
const popupModel = document.querySelector('.popup-model')
const popupCloseBtn = document.getElementById('close-btn')
const searchBtn = document.getElementById('search-btn')
const input = document.getElementById('input-ingredient')
const results = document.querySelector('.results')

popupCloseBtn.addEventListener('click', (event) => {
    popupModel.style.display = 'none'
    console.log("clicked popup close btn")
})

searchBtn.addEventListener('click', (event) => {
    console.log("search btn clicked")
    console.log(input.value);
    let inputIngredient = input.value
    getReciepeList(inputIngredient)
})

const getReciepeList = (search) => {
    const trimmedInput = search.trim()
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=' + trimmedInput.toString())
        .then(res => res.json())
        .then(data => {
            let mealsData = data.meals
            console.log(mealsData.length)
            addReciepeToScreen(mealsData)
        }).catch(error => {
            console.log(error)
            noResultsFoundScreen()
        })
}

const addReciepeToScreen = (mealsData) => {
    let generatedHtml = ''
    mealsData.forEach((meal, index) => {
        generatedHtml +=
            `<div class="result-container">
            <img src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
            <button class="get-reciepe-btn">Get Reciepe</button>
        </div>`
    })
    results.innerHTML = generatedHtml
    // getReciepebtn.addEventListener('click', (event) => {
    //     popupModel.style.display = 'flex'
    //     console.log("clicked reciepe btn")
    // })
}

const noResultsFoundScreen = () => {
    results.innerHTML = `<h2>NO Results Found<h2/>`
}