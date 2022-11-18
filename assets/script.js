var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var searchCityContainerEl = document.querySelector("#searchcity");
var citySearch = document.querySelector("#citysearch");
var cityLocation = document.querySelector("#citylocation");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHum = document.querySelector("#current-hum");
var weatherIcon = document.queryCommandValue("#weather-icon");
var apiKey = "1c0a9400ca0f8243bdd42c0e2c421139";
var day1 = document.querySelector("#day-1");
var day2 = document.querySelector("#day-2");
var day3 = document.querySelector("#day-3");
var day4 = document.querySelector("#day-4");
var day5 = document.querySelector("#day-5");

// set var for time
var currentDay = dayjs().format("MM/DD/YYYY");
var firstDay = dayjs().add('1', 'day').format("MM/DD/YYYY");
var secondDay = dayjs().add('2', 'day').format("MM/DD/YYYY");
var thirdDay = dayjs().add('3', 'day').format("MM/DD/YYYY");
var fourthDay = dayjs().add('4', 'day').format("MM/DD/YYYY");
var fifthDay = dayjs().add('5', 'day').format("MM/DD/YYYY");

// $("#1a").text(currentDay);

console.log("today is " + currentDay);
console.log("tomorrow is " + firstDay);
console.log("the next day is " + secondDay);
console.log("three days from now is " + thirdDay);
console.log("four days from now is " + fourthDay);
console.log("five days from now  is " + fifthDay);

function getApi(cityEntered) {
  // fetch request gets a list of all the repos for the node.js organization
  // below is combination from going back to ins_demo act 3 and ask bcs told me to use string template literals
  var url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityEntered}&appid=${apiKey}`;
  console.log(url);

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data[0]);
      cityLocation.textContent=data[0].name + " " + currentDay;
      console.log("my api key is " + apiKey);

      var lat = data[0].lat;
      var lon = data[0].lon;

      var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

      fetch(weatherUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          currentTemp.textContent=" Temp: " + data.main.temp + " °F";
          currentWind.textContent=" Wind Speed: " + data.wind.speed + " mph ";
          currentHum.textContent=" Humidity: " + data.main.humidity + "% ";
          console.log(
            "the temperature for " +
              cityEntered +
              " is " +
              data.main.temp +
              " F°"
          );
          console.log(
            "wind speeds for " +
              cityEntered +
              " is " +
              data.wind.speed +
              " mph, with gusts up to " +
              data.wind.gust +
              " mph "
          );
          console.log(
            "Current humidity for " +
              cityEntered +
              " is " +
              data.main.humidity +
              " %"
          );

          var iconCode = data.weather[0].icon;
          console.log(iconCode);

          var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
          console.log(iconUrl);

          console.log(weatherUrl);

          console.log("the lat, lon for " + cityEntered + " is " + [lat, lon]);
        });

      var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

      fetch(fiveDayUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          console.log(fiveDayUrl);

          console.log(data.list);

          day1.textContent=firstDay;



          day2.textContent=secondDay;



          day3.textContent=thirdDay;



          day4.textContent=fourthDay;


          
          day5.textContent=fifthDay;



        });
    });
}

$("#citysearchbtn").on("click", function (event) {
  event.preventDefault();

  var cityEntered = $("#cityname").val().trim();

  if (cityEntered) {
    console.log("the city you entered is " + cityEntered);
  } else {
    alert("Please enter a valid City");
  }

  localStorage.setItem("city name", JSON.stringify(cityEntered));
  console.log("the city you entered is " + cityEntered);
  searchCity();

  function searchCity() {
    var prevCity = JSON.parse(localStorage.getItem("city name"));
    var cityList = document.createElement("li");
    cityList.setAttribute("class", "prev-city-item");
    cityList.textContent = prevCity;

    citySearch.append(cityList);

    console.log("the previous city entered is " + prevCity);
    console.log("the current city entered is " + cityEntered);

    getApi(cityEntered);
  }
});

function currentWeather() {
  var currentTemp = data.main.temp + " F° ";
  console.log("the current temp is " + currentTemp);
}
