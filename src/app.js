function displayTemp(response) {
  console.log(response.data.main.temp);
  let mainTempElement = document.querySelector(".main-temp");
  mainTempElement.innerHTML = Math.round(response.data.main.temp);
}
let apiKey = "4b3503b2f08a729413c4d33ef1186004";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Osaka&appid=${apiKey}&units=metric`;
axios(apiUrl).then(displayTemp);
