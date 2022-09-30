function formatDate(timestamp) {
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
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
  return `${days} ${day} ${month} ${hours}:${minutes}`;
}

function displayTemp(response) {
  console.log(response.data);
  let mainTempElement = document.querySelector(".main-temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let maxTempElement = document.querySelector("#main-overview-max");
  let minTempElement = document.querySelector("#main-overview-min");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  mainTempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
}
let apiKey = "4b3503b2f08a729413c4d33ef1186004";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Osaka&appid=${apiKey}&units=metric`;
axios(apiUrl).then(displayTemp);
