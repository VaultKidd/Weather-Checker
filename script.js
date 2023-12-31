const apiKey = "516e2e494eba1de1363529fbb76f3445";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=";

const searchBox = document.querySelector(".search__bar input");
const searchBtn = document.querySelector(".search__bar button");
const weatherIcon = document.querySelector(".temp__icon");
const searchBar = document.querySelector(".search__bar");
let units = "metric&q=";

async function checkWeather(city) {
  const response = await fetch(apiUrl + units + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error__msg").style.opacity = "1";
    document.querySelector(".error__msg").style.transition = "all 700ms ease";
    document.querySelector(".weather").style.opacity = "0";
  } else {
    const data = await response.json();
    console.log(data);

    document.querySelector(".error__msg").style.opacity = "0";
    document.getElementById("weather").style.opacity = "1";
    document.getElementById("weather").style.transition = "all 700ms ease";

    document.querySelector(".city").innerHTML =
      data.name + ", " + data.sys.country;
    document.querySelector(".temp").innerHTML = getTemperatureString(
      data.main.temp
    );
    document.querySelector(".humidity__percent").innerHTML =
    data.main.humidity + "%";
    document.querySelector(".wind__speed").innerHTML = getSpeedString(
      data.wind.speed
    );

    setWeatherIcon(data.weather[0].main);
  }
}

function getTemperatureString(tempInCelsius) {
  if (units === "metric&q=") {
    return tempInCelsius.toFixed(1) + " °C";
  } else {
    return tempInCelsius.toFixed(1) + " °F";
  }
}

function getSpeedString(kmh) {
  if (units === "metric&q=") {
    return kmh.toFixed(2) + " km/h";
  } else {
    return kmh.toFixed(1) + " mph";
  }
}

function setWeatherIcon(weatherCondition) {
  switch (weatherCondition) {
    case "Clouds":
      weatherIcon.src = "./assets/overcast.png";
      break;
    case "Clear":
      weatherIcon.src = "./assets/sunny.png";
      break;
    case "Rain":
      weatherIcon.src = "./assets/rain.png";
      break;
    case "Snow":
      weatherIcon.src = "./assets/snowy.png";
      break;
    case "Mist":
      weatherIcon.src = "./assets/mist.png";
      break;
    case "Fog":
      weatherIcon.src = "./assets/mist.png";
      break;
    case "Haze":
      weatherIcon.src = "./assets/mist.png";
      break;
    case "Thunderstorm":
      weatherIcon.src = "./assets/heavy-rain.png";
      break;
    default:
      weatherIcon.src = "./assets/unknown.png";
      break;
  }
}

function switchUnits() {
  units = units === "metric&q=" ? "imperial&q=" : "metric&q=";
  const city = document.querySelector(".city").innerHTML.split(",")[0].trim();
  checkWeather(city);
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBar.addEventListener("click", () => {
  document.getElementById("search__bar").style.top = "24px";
});
