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
var getWeather = function(lat, long) {
    console.log(long);
    console.log(lat);
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + openWeatherApi + "&units=" + units;
    console.log(url);

    $.getJSON(url, function(data) {
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
        $.getJSON('http://ip-api.com/json', function(json) {
        var  lat = json.lat;
        var  long = json.lon;
        console.log(long);
        console.log(lat);
        getWeather(lat, long)
    })
};
getGeo();