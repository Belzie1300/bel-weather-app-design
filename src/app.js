function formatDate(timestamp) {
  let days = [
    "SUNDAY",
    "MONDAY",
    "TUEDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  let month = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  month = month[date.getMonth()];
  let day = date.getDate();
  days = days[date.getDay()];
  return `${days} ${day} ${month} <div>Last updated:${hours}:${minutes}</div>`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", " Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
  <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
  <img
  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
  alt="Cloudy"
  />
  <div class="forecast-temp">
  <span class="forecast-max"> ${Math.round(forecastDay.temp.max)}°</span>
  <span class="forecast-min"> ${Math.round(forecastDay.temp.min)}°</span>
  </div>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemp(response) {
  let mainTempElement = document.querySelector(".main-temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let maxTempElement = document.querySelector("#main-overview-max");
  let minTempElement = document.querySelector("#main-overview-min");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let cityElement = document.querySelector(".city");

  celsiusTemp = response.data.main.temp;
  celsiusMaxTemp = response.data.main.temp_max;
  celsiusMinTemp = response.data.main.temp_min;

  mainTempElement.innerHTML = Math.round(celsiusTemp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  maxTempElement.innerHTML = Math.round(celsiusMaxTemp);
  minTempElement.innerHTML = Math.round(celsiusMinTemp);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  cityElement.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(displayTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let fahrenheitMaxTemp = (celsiusMaxTemp * 9) / 5 + 32;
  let fahrenheitMinTemp = (celsiusMinTemp * 9) / 5 + 32;
  let mainTempElement = document.querySelector(".main-temp");
  mainTempElement.innerHTML = Math.round(fahrenheitTemp);
  document.querySelector("#main-overview-max").innerHTML =
    Math.round(fahrenheitMaxTemp);
  document.querySelector("#main-overview-min").innerHTML =
    Math.round(fahrenheitMinTemp);
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let mainTempElement = document.querySelector(".main-temp");
  mainTempElement.innerHTML = Math.round(celsiusTemp);
  document.querySelector("#main-overview-max").innerHTML =
    Math.round(celsiusMaxTemp);
  document.querySelector("#main-overview-min").innerHTML =
    Math.round(celsiusMinTemp);
}

let celsiusTemp = null;
let celsiusMaxTemp = null;
let celsiusMinTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
search("Sydney");
