const inputText = document.querySelector('.inputText');

const app = document.querySelector('.app');

const apiKey = "b41a3a5aa59fb23522ce7a9be4c1fc47";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
let lastCity = "";

async function showWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const apiData = await response.json();
  app.innerHTML = '';
  lastCity = city;
  createElements(apiData);
}

showWeather('Białystok');


function createElements(data) {

  const searchBar = document.createElement('div');
  searchBar.classList.add('searchBar');
  app.appendChild(searchBar);
  
  const inputText = document.createElement('input');
  inputText.classList.add('inputText');
  searchBar.appendChild(inputText);

  //only letters in input
  inputText.addEventListener('input', () => {
    let inputCityText = inputText.value.replace(/[^a-zA-Z]/g, ''); 
    inputText.value = inputCityText.trim(); 
  });
  //
  
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('buttonContainer');
  searchBar.appendChild(buttonContainer);

  const searchLoupe = document.createElement('img');
  searchLoupe.classList.add('searchLoupe');
  searchLoupe.src = "images/search.png";
  buttonContainer.appendChild(searchLoupe);

  buttonContainer.addEventListener('click', () => {
    showWeather(inputText.value);
  })
  
  const weatherImg = document.createElement('img');
  weatherImg.classList.add('weatherImg');
  app.appendChild(weatherImg);

  let currentWeatherImg = data.weather[0].main;

  if(currentWeatherImg == 'Clear') {
    weatherImg.src = "images/clear.png";
  }
  if(currentWeatherImg == 'Clouds') {
    weatherImg.src = "images/clouds.png";
  }
  if(currentWeatherImg == 'Drizzle') {
    weatherImg.src = "images/drizzle.png";
  }
  if(currentWeatherImg == 'Mist') {
    weatherImg.src = "images/mist.png";
  }
  if(currentWeatherImg == 'Rain') {
    weatherImg.src = "images/rain.png";
  }
  if(currentWeatherImg == 'Snow') {
    weatherImg.src = "images/snow.png";
  }

  const temperature = document.createElement('div');
  temperature.classList.add('temperature');
  app.appendChild(temperature);
  temperature.textContent = `${Math.ceil(data.main.temp - 273.15)}°C`;

  const cityName = document.createElement('div');
  cityName.classList.add('cityName');
  app.appendChild(cityName);
  cityName.textContent = lastCity;

  const weatherDetails = document.createElement('div');
  weatherDetails.classList.add('weatherDetails');
  app.appendChild(weatherDetails);

  const windSection = document.createElement('div');
  windSection.classList.add('windSection');
  weatherDetails.appendChild(windSection);

  const windImg = document.createElement('img');
  windImg.classList.add('windImg');
  windImg.src = "images/wind.png";
  windSection.appendChild(windImg);

  const windValue = document.createElement('div');
  windValue.classList.add('windValue');
  windValue.textContent = `${data.wind.speed} km/h`;
  windSection.appendChild(windValue);

  const humiditySection = document.createElement('div');
  humiditySection.classList.add('humiditySection');
  weatherDetails.appendChild(humiditySection);

  const humidityImg = document.createElement('img');
  humidityImg.classList.add('humidityImg');
  humidityImg.src = "images/humidity.png";
  humiditySection.appendChild(humidityImg);

  const humidityValue = document.createElement('div');
  humidityValue.classList.add('humidityValue');
  humidityValue.textContent = `${data.main.humidity}%`;
  humiditySection.appendChild(humidityValue);
}





