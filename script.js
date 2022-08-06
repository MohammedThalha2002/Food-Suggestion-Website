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
        })
        .catch(error => {
            console.log(error)
            noResultsFoundScreen()
        })
}

const addReciepeToScreen = (mealsData) => {
    let generatedHtml = ``
    mealsData.forEach((meal, index) => {
        generatedHtml +=
            `<div class="result-container">
            <img src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
            <button class="get-reciepe-btn">Get Reciepe</button>
        </div>`
    })
    results.innerHTML = generatedHtml
    const getReciepebtn = document.querySelectorAll('.get-reciepe-btn')
    getReciepebtn.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            getDescriptionAndShowPopup(mealsData[index].idMeal)

        })
    })
}

const getDescriptionAndShowPopup = (id) => {
    let mealsDescription;
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
        .then(res => res.json())
        .then(data => {
            mealsDescription = data.meals
            console.log(mealsDescription)
            popupModel.style.display = 'flex'
            console.log("clicked reciepe btn")
            const popupContent = document.querySelector('.popup-content')
            let popuHTML =
                `<h1 id="meal-name">${mealsDescription[0].strMeal}</h1>
            <div class="category-name">
                <h2 id="category-name">${mealsDescription[0].strCategory}</h2>
            </div>
            <h2 id="instruction">Instructions</h2>
            <p id="ins-content">${mealsDescription[0].strInstructions}</p>
            <img src="${mealsDescription[0].strMealThumb}" alt="" class="circle-img">
            <br>
            <a href="${mealsDescription[0].strYoutube}" id="watch-video" target="_blank">Watch Video</a>`

            popupContent.innerHTML = popuHTML
        })
        .catch(error => {
            console.log(error)
            noResultsFoundScreen()
        })
    return mealsDescription
}

const noResultsFoundScreen = () => {
    results.innerHTML = `<h2>NO Results Found<h2/>`
}