function displayTemp(response) {
  console.log(response.data);
  let mainTempElement = document.querySelector(".main-temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let maxTempElement = document.querySelector("#main-overview-max");
  let minTempElement = document.querySelector("#main-overview-min");
  mainTempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
}
let apiKey = "4b3503b2f08a729413c4d33ef1186004";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Osaka&appid=${apiKey}&units=metric`;
axios(apiUrl).then(displayTemp);
