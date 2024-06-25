var touristDestinations = [
    { name: "Hunza Valley", latitude: 36.3167, longitude: 74.65 },
    { name: "Skardu", latitude: 35.2971, longitude: 75.6333 },
    { name: "Murree", latitude: 33.9062, longitude: 73.3903 },
    { name: "Kaghan Valley", latitude: 34.7939, longitude: 73.5793 },
    { name: "Swat Valley", latitude: 35.222, longitude: 72.4258 },
    { name: "Chitral", latitude: 35.851, longitude: 71.7864 },
    { name: "Saiful Muluk Lake", latitude: 34.8722, longitude: 73.6919 },
    { name: "Karachi", latitude: 24.8607, longitude: 67.0011 },
    { name: "Lahore", latitude: 31.5497, longitude: 74.3436 },
    { name: "Islamabad", latitude: 33.6844, longitude: 73.0479 },
    { name: "Quetta", latitude: 30.1798, longitude: 66.9750 },
    { name: "Gwadar", latitude: 25.1216, longitude: 62.3254 },
    { name: "Ziarat", latitude: 30.3791, longitude: 67.7255 },
    { name: "Peshawar", latitude: 34.0151, longitude: 71.5249 },
    { name: "Gilgit", latitude: 35.9208, longitude: 74.3139 },
    { name: "Naran", latitude: 34.8741, longitude: 73.4257 },
    { name: "London", latitude: 51.5074, longitude: -0.1278 },
    { name: "New York", latitude: 40.7128, longitude: -74.0060 },
    { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
    { name: "Dubai", latitude: 25.276987, longitude: 55.296249 },
    { name: "Sydney", latitude: -33.8688, longitude: 151.2093 }
  ];
  
  // Populate dropdown menu with locations
  var locations_dropdown = document.getElementById("locations_dropdown");
  
  touristDestinations.forEach(function(location, index) {
    var option = document.createElement("option");
    option.value = index;
    option.text = location.name;
    locations_dropdown.appendChild(option);
  });
  
  // Weather fetching and display functions remain unchanged
  
  locations_dropdown.addEventListener("change", function () {
    var selectedLocation = touristDestinations[this.value];
    fetchWeather(selectedLocation.latitude, selectedLocation.longitude, displayWeatherData);
  });
  
  function fetchWeather(lat, lon, callback) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c153479685c47f1b34a83591f3b1acbe&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      });
  }
  
  function displayWeatherData(info) {
    var icon = info.weather[0].icon;
    var description = info.weather[0].description;
    var temp = info.main.temp;
    var hum = info.main.humidity;
    var wind = info.wind.speed;
  
    var weatherIcon = document.getElementById("weather-icon");
    var weatherDescription = document.getElementById("weather-description");
    var temperature = document.getElementById("temperature");
    var humidity = document.getElementById("humidity");
    var windSpeed = document.getElementById("wind-speed");
  
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">`;
    weatherDescription.innerText = `Description: ${description}`;
    temperature.innerHTML = `<i class="fas fa-thermometer-half"></i> Temperature: ${temp} °C`;
    humidity.innerHTML = `<i class="fas fa-tint"></i> Humidity: ${hum}%`;
    windSpeed.innerHTML = `<i class="fas fa-wind"></i> Wind Speed: ${wind} m/s`;
  
    updateBackgroundVideo(info.weather[0].main);
  }
  
  function updateBackgroundVideo(weatherCondition) {
    var backgroundVideo = document.getElementById("background-video");
    var videoSrc = '';
  
    switch (weatherCondition) {
      case 'Clear':
        videoSrc = 'clear.mp4';
        break;
      case 'Clouds':
        videoSrc = 'clouds.mp4';
        break;
      case 'Rain':
        videoSrc = 'rain.mp4';
        break;
      case 'Snow':
        videoSrc = 'snow.mp4';
        break;
      case 'Thunderstorm':
        videoSrc = 'thunderstorm.mp4';
        break;
      case 'Drizzle':
        videoSrc = 'drizzle.mp4';
        break;
      case 'Smoke':
      case 'Mist':
      case 'Haze':
        videoSrc = 'haze.mp4';
        break;
      default:
        videoSrc = 'default.mp4';
        break;
    }
  
    backgroundVideo.src = videoSrc;
  }
  
  AOS.init();
  
  // Fetch weather for the initial location
  fetchWeather(touristDestinations[0].latitude, touristDestinations[0].longitude, displayWeatherData);
  