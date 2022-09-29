function formatDate(timestamp) {
  //calculate the data given to give proper date
  return "Wednesday 29 September 11:45";
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
  mainTempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  dateElement.innerHtml = formatDate(response.data.dt * 1000);
}
let apiKey = "4b3503b2f08a729413c4d33ef1186004";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Osaka&appid=${apiKey}&units=metric`;
axios(apiUrl).then(displayTemp);
