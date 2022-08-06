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
        .then(res => {

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
            popupModel.style.display = 'flex'
            console.log("clicked reciepe btn")
            const popupContent = document.querySelector('.popup-content')
            let popuHTML = `<h1 id="meal-name">${mealsData[0].strMeal}</h1>
            <div class="category-name">
                <h2 id="category-name">${input.value}</h2>
            </div>
            <h2 id="instruction">Instructions</h2>
            <p id="ins-content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem sunt itaque corporis quasi molestias
                eveniet quisquam beatae, non ut et ex accusantium eaque iure facere rem mollitia assumenda natus.
                Voluptatem iusto consequuntur similique? Eum rerum aliquam facilis adipisci doloremque architecto
                ducimus similique, at beatae atque possimus quaerat fugit amet minus?</p>
            <img src="./assets/food.jpg" alt="" class="circle-img">
            <br>
            <a href="#" id="watch-video">Watch Video</a>`
            popupContent.innerHTML = popuHTML
        })
    })
}

const noResultsFoundScreen = () => {
    results.innerHTML = `<h2>NO Results Found<h2/>`
}