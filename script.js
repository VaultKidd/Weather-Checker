const apiKey = "516e2e494eba1de1363529fbb76f3445";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search__bar input');
const searchBtn = document.querySelector('.search__bar button');


async function checkWeather (city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json()
    console.log(data)
    
    document.querySelector('.city').innerHTML = data.name + ', ' + data.sys.country;
    document.querySelector('.temp').innerHTML = (Math.round(data.main.temp * 10) / 10) + ' °C';
    document.querySelector('.humidity__percent').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind__speed').innerHTML = data.wind.speed + 'km/h';
    
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
