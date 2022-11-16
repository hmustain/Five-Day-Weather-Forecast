var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var searchCityContainerEl = document.querySelector("#searchcity");
var citySearch = document.querySelector("#citysearch");
var apiKey = "1c0a9400ca0f8243bdd42c0e2c421139";

function getApi(cityEntered) {
    // fetch request gets a list of all the repos for the node.js organization
    // below is combination from going back to ins_demo act 3 and ask bcs told me to use string template literals
    var url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityEntered}&appid=${apiKey}`;
    console.log(url);
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data[0]);


            console.log("my api key is " + apiKey);
        // put new fetch for lat long url here
        var lat =  data[0].lat;
        var lon =  data[0].lon;

        console.log(lat,lon);

    var weatherUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    console.log(weatherUrl);

    fetch(weatherUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            })


        })
};


var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=city name&appid=' + apiKey;
var testCity = "San Antonio";
var testUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${testCity}&appid=${apiKey}`

console.log(testUrl);

$("#citysearchbtn").on("click", function (event) {
    event.preventDefault();

    var cityEntered = $("#cityname").val().trim();

    if (cityEntered) {
        console.log("the city you entered is " + cityEntered)

    }
    else { alert("Please enter a valid City") };

    localStorage.setItem("city name", JSON.stringify(cityEntered));
    console.log("the city you entered is " + cityEntered);
    searchCity();

    function searchCity() {
        var prevCity = JSON.parse(localStorage.getItem("city name"));
        var cityList = document.createElement("li");
        cityList.setAttribute('class', 'prev-city-item');
        cityList.textContent = prevCity;

        citySearch.append(cityList);

        console.log("the previous city entered is " + prevCity);
        console.log("the current city entered is " + cityEntered);

        getApi(cityEntered);
    }
});


