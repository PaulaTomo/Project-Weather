"use strict";
const key = "131bc4a92696c10d42b9e5b0c940c041";

const select= document.querySelector(".form-select");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".icon");
const weatherType = document.querySelector(".weather-type")
const clouds = document.querySelector(".clouds");
const time = document.querySelector(".time");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");



const kelvinToCelsius = (degrees) => {
    const celsius = degrees - 273.15;
    return celsius.toFixed(1);

};

const getCities = () => {
    fetch('cities.json', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
        data.forEach(city => {
            const option = document.createElement("option");
            option.value = city.id;
            option.text = city.name;
            if (city.id === 3165194 ){
                option.setAttribute("selected", true)
            }
            select.appendChild(option)
            console.log("success" ,data)
        })
        })
        .catch((error) => {
            console.log('Error:', error)
        })
}


const getWeather = (cityId = 3165194 ) =>{
    fetch( `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${key}`
        , {
        method: 'GET',
    })
        .then((response) => response.json())
        .then(data => {
            const date = new Date()
            city.innerText = data.name;
            temp.innerText = kelvinToCelsius(data.main.temp) +  "\xB0C";
            icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherType.innerText = data.weather[0].description;
            clouds.innerText = `Clouds ${data.clouds.all}`;
            time.innerText = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
            wind.innerText= `Wind ${data.wind.speed} m/s`;
            humidity.innerText = `Humidity ${data.main.humidity} % `;


console.log("success" ,data)

        })
        .catch((error) => {
            console.log('Error:', error)
        })
}
getCities();
getWeather();

select.addEventListener("change", function (e){
    const cityId = e.target.value;
    getWeather(cityId)

})