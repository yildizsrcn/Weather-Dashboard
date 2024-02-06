// Create a weather dashboard with form inputs.
// When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
// When a user views the current weather conditions for that city they are presented with:
// The city name
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// The wind speed
// When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// When a user click on a city in the search history they are again presented with current and future conditions for that city


const dateElement= $("#date")
const timeElement= $("#time");
const todayElement= $("#today");
const forecastElement= $("#forecast");
const weatherHeader = document.querySelector("#search-button")
const formInput = document.querySelector(".formInput")
const searchInput =document.querySelector("#search-input")
const card = document.querySelector(".card")
const apiKey = "37de0b482272503a256fd01e7d37cfeb"

todayElement.textContent = dayjs("2024-02-05").toDate();



async function getWeatherData(city){
    const apiURL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiURL);

    if(!response.ok){
        throw new Error ("Could not get Data");
    }

    const data = await response.json()

    console.log(data);
    return data;
}



function displayWeatherInfo(data){

    const {
        name: city, 
        main: {temp , humidity}, 
        weather :[{description,icon,id}],
        wind: {speed},
    } =data;
console.log(data);
    const iconUrl =  `https://api.openweathermap.org/img/w/${data.weather[0].icon}.png`
    const iconImg=`<img src="${iconUrl}" />`

    card.textContent ="";
    card.style.display ="flex"

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const windSpeedDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherIcon = document.createElement("div");

    weatherIcon.innerHTML = iconImg;
    cityDisplay.textContent =city;
    tempDisplay.textContent = `${(temp -273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    windSpeedDisplay.textContent = `Wind: ${speed} km/h`;
    descDisplay.textContent = description;



    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    windSpeedDisplay.classList.add("windSpeedDisplay");
    descDisplay.classList.add("descDisplay");
    weatherIcon.classList.add("weatherIcon");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(windSpeedDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherIcon);
}

function getWeatherIcon(weatherId){
//  script has been added to html for icons  

}

function displayError(message){

    const errorDisplay = document.createElement("p")
    errorDisplay.textContent.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display ="flex";
    card.appendChild(errorDisplay);
}

function setDateAndTime() {
    dateEl.text(currentDay.format("DD, MM, YYYY")); 
    timeEl.text(currentDay.format("h:mm"));
}


weatherHeader.addEventListener("click", async function (event){

    console.log("click");
    event.preventDefault();

    const city = searchInput.value.trim();

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            console.log(weatherData);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }}

        else {
        displayError("Please write a City name");
        console.log(displayError);
    }

});