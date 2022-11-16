var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var searchCityContainerEl = document.querySelector("#searchcity");
var citySearch = document.querySelector("#citysearch");
var apiKey = "1c0a9400ca0f8243bdd42c0e2c421139";


// working on event listener and local storage to store city's searched
$("#citysearchbtn").on("click", function(event){
    event.preventDefault();

    var cityEntered = $("#cityname").val().trim();

    if (cityEntered) {
        console.log("the city you entered is " + cityEntered)
        
    }
    else {alert("Please enter a valid City")};

    localStorage.setItem("city name", JSON.stringify(cityEntered));
    console.log("the city you entered is " + cityEntered);
    searchCity();

    function searchCity(){
    var prevCity = JSON.parse(localStorage.getItem("city name"));
    var cityList = document.createElement("li");
    cityList.setAttribute('class', 'prev-city-item');
    cityList.textContent=prevCity;

    citySearch.append(cityList);

console.log("the previous city entered is " + prevCity);
console.log("the current city entered is " + cityEntered);
}});


console.log("my api key is " + apiKey);



