const getReciepebtn = document.querySelector('.get-reciepe-btn')
const popupModel = document.querySelector('.popup-model')
const popupCloseBtn = document.getElementById('close-btn')
const searchBtn = document.getElementById('search-btn')
const input = document.getElementById('input-ingredient')


getReciepebtn.addEventListener('click', (event) => {
    popupModel.style.display = 'flex'
    console.log("clicked reciepe btn")
})

popupCloseBtn.addEventListener('click', (event) => {
    popupModel.style.display = 'none'
    console.log("clicked popup close btn")
})

searchBtn.addEventListener('click', (event) => {
    console.log("search btn clicked")
    console.log(input.value);
    let inputIngredient = input.value
    fetch("www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast")
        .then((response) => response.json())
        .then(data => {
            console.log(data);
        })
})
