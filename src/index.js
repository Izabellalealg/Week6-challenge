let date = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let formattedDate = `${currentDay} ${currentHours}:${currentMinutes}`;
  return formattedDate;
}

function showTemperature(response) {
  //console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let forecast = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed * 3.6);
  let cityName = response.data.name;
  //console.log(temperature, forecast, humidity, wind, cityName);

  let city = document.querySelector("#current-city");
  city.innerHTML = cityName;
  let weatherForecast = document.querySelector("#forecast");
  weatherForecast.innerHTML = forecast;
  let temp = document.querySelector("#current-temperature");
  temp.innerHTML = `${temperature}°C`;
  let humidityValue = document.querySelector("#humidity-value");
  humidityValue.innerHTML = `Humidity: ${humidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind:${wind} km/h`;
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#find-city-input");
  let apiKey = "bec91d17c82c3d6687e9852cb8d0b5bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value.trim()}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showCurrentInfo(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "bec91d17c82c3d6687e9852cb8d0b5bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentInfo() {
  navigator.geolocation.getCurrentPosition(showCurrentInfo);
}

let today = document.querySelector("#current-date");
today.innerHTML = formatDate(date);

let searchCity = document.querySelector("#city-input");
searchCity.addEventListener("submit", showCity);

let currentWeather = document.querySelector("#current-button");
currentWeather.addEventListener("click", getCurrentInfo);
