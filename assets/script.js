var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var searchCityContainerEl = document.querySelector("#searchcity");
var citySearch = document.querySelector("#citysearch");
var apiKey = "1c0a9400ca0f8243bdd42c0e2c421139";
var currentDay = dayjs().format('MM/DD/YYYY');
$('#1a').text(currentDay);

console.log("today is " + currentDay);

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
                    console.log("the temperature for " + cityEntered + " is " + data.main.temp + " F°");
                    console.log("wind speeds for " + cityEntered + " is " + data.wind.speed + " mph, with gusts up to " + data.wind.gust + " mph ");
                    console.log("Current humidity for " + cityEntered + " is " + data.main.humidity + " %");


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


