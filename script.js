const apiKey = "516e2e494eba1de1363529fbb76f3445";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=olsztyn";

async function checkWeather () {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    const data = await response.json()
    console.log(data)
}
checkWeather();