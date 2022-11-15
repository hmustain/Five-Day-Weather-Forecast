var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var searchCityContainerEl = document.querySelector("#searchcity");

// working on event listener and local storage to store city's searched
$( "#citysearchbtn" ).on("click", function(event){
    event.preventDefault();

    var cityEntered = $("#cityname").val().trim();

    localStorage.setItem("city name", JSON.stringify(cityEntered));
    console.log("the city you entered is " + cityEntered);
})