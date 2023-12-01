const apiKey = "516e2e494eba1de1363529fbb76f3445";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=";

const searchBox = document.querySelector('.search__bar input');
const searchBtn = document.querySelector('.search__bar button');
const weatherIcon = document.querySelector('.temp__icon');
const searchBar = document.querySelector('.search__bar');
let units = 'imperial&q='

async function checkWeather (city) {
    const response = await fetch(apiUrl + units + city + `&appid=${apiKey}`);
    var data = await response.json()
    console.log(data)
    
    document.getElementById('weather').style.opacity = '1';
    document.getElementById('weather').style.transition = 'all 700ms ease';

    document.querySelector('.city').innerHTML = data.name + ', ' + data.sys.country;
    document.querySelector('.temp').innerHTML = (Math.round(data.main.temp * 10) / 10) + ' °C';
    document.querySelector('.humidity__percent').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind__speed').innerHTML = data.wind.speed + 'km/h';
    
    if(data.weather[0].main == 'Clouds') {
        weatherIcon.src = "./assets/overcast.png";
    }
    else if(data.weather[0].main == 'Clear'){
        weatherIcon.src = './assets/sunny.png';
    }
    else if(data.weather[0].main == 'Rain'){
        weatherIcon.src = './assets/rain.png';
    }
    else if(data.weather[0].main == 'Snow'){
        weatherIcon.src = './assets/snowy.png';
    }
    else if(data.weather[0].main == 'Mist'){
        weatherIcon.src = './assets/mist.png';
    }
    else if(data.weather[0].main == 'Thunderstorm'){
        weatherIcon.src = './assets/heavy-rain.png';
    }
}

function switchUnits (units) {
    if (units === 'imperial&q=') {
        units === 'metric&q=';
        location.reload();
    }
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value);
})

searchBar.addEventListener('click', ()=>{
    document.getElementById('search__bar').style.top = '24px';
})

