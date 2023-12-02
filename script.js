const apiKey = "516e2e494eba1de1363529fbb76f3445";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=";

const searchBox = document.querySelector(".search__bar input");
const searchBtn = document.querySelector(".search__bar button");
const weatherIcon = document.querySelector(".temp__icon");
const searchBar = document.querySelector(".search__bar");
let units = "metric&q=";

async function checkWeather(city) {
  const response = await fetch(apiUrl + units + city + `&appid=${apiKey}`);
  const data = await response.json();
  console.log(data);

  document.getElementById("weather").style.opacity = "1";
  document.getElementById("weather").style.transition = "all 700ms ease";

  document.querySelector(".city").innerHTML =
    data.name + ", " + data.sys.country;
  document.querySelector(".temp").innerHTML = getTemperatureString(
    data.main.temp
  );
  document.querySelector(".humidity__percent").innerHTML =
    data.main.humidity + "%";
  document.querySelector(".wind__speed").innerHTML = data.wind.speed + " km/h";

  setWeatherIcon(data.weather[0].main);
}

function getTemperatureString(tempInCelsius) {
  if (units === "metric&q=") {
    return tempInCelsius.toFixed(1) + " °C";
  } else {
    return tempInCelsius.toFixed(1) + " °F";
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
