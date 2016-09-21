global.$ = global.jQuery = require('jquery');
var foundation = require('../../node_modules/foundation-sites/dist/foundation.js');

$(document).foundation();

var gKey = "AIzaSyBOJ0bIBihgCBv5i0msRI2aOPe9j-UuiV0";
var units = "metric";
var openWeatherApi = "&appid=41bdff37ae42874d9066356544230f3b";
var iconUrl = "http://openweathermap.org/img/w/";
var celc = "&deg;C";
// var latitude = 37.386052;
// var longitude = -122.083851;
var getWeather = function(latitude, longitude) {

    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + openWeatherApi + "&units=";
    console.log(url);
    $.getJSON(url + units, function(data) {
        console.log(data);
        $(".weathericon").html('<img src=' + iconUrl + data.weather[0].icon + ".png" + ">");
        $(".weatherdiv").text(data.weather[0].main);
        $(".citydiv").text(data.name);
        $(".tempdiv").html(data.main["temp"] + celc);
    });
};


$(".tempbutton").click(function() {
		$(".tempdiv").html("<h6>Processing...</h6>");
    units = units === "metric" ? "imperial" : "metric";
    getGeo();
    celc = celc === "&deg;C" ? "&deg;F" : "&deg;C";
});

var getGeo = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('Geolocation is not supported');
    }

    function error() {
        alert("That's weird! We couldn't find you!");
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        getWeather(latitude, longitude);
    }
};
getGeo();