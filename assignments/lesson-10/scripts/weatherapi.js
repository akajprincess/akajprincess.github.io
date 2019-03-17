let weatherRequest = new XMLHttpRequest();
let apiURLstring = "https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=ce65a8d7c7b2b3226cf302518813322f"
weatherRequest.open('Get', apiURLstring, true);
weatherRequest.send();

let forecastRequest = new XMLHttpRequest();
let apiURLstringForecast = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&APPID=ce65a8d7c7b2b3226cf302518813322f"
forecastRequest.open('Get', apiURLstringForecast, true);
forecastRequest.send(); 


weatherRequest.onload =  function () {
    let weatherData = JSON.parse(weatherRequest.responseText);
    console.log(weatherData);
    let currentTemp = weatherData.main.temp;

    document.getElementById('current-temp').innerHTML = currentTemp.toFixed(2);

    let icon = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
    let desc = weatherData.weather[0].description;
    let windspeed = weatherData.wind.speed;

    document.getElementById("weather-icon").setAttribute('src', icon);
    document.getElementById("weather-icon").setAttribute("alt", desc);
    document.getElementById("weather").innerHTML = weatherData.weather[0].main;
    document.getElementById("windspeed").innerHTML = windspeed.toFixed(2);

    let windchill = 35.74 + 0.6215 * currentTemp + (0.4275 * currentTemp - 35.75) * Math.pow(windspeed, 0.16);
    document.getElementById("windchill").innerHTML = windchill.toFixed(2) + "&deg;F"
}

forecastRequest.onload = function() {
    let forecastData = JSON.parse(forecastRequest.responseText);
    console.log(forecastData);
    var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    var d = new Date();
    var day0 = days[d.getDay()];
    d.setDate(d.getDate() + 1);
    var day1 = days[d.getDay()];
    d.setDate(d.getDate() + 1);
    var day2 = days[d.getDay()];
    d.setDate(d.getDate() + 1);
    var day3 = days[d.getDay()];
    d.setDate(d.getDate() + 1);
    var day4 = days[d.getDay()];
    document.getElementById("day0").innerHTML = day0;
    document.getElementById("day1").innerHTML = day1;
    document.getElementById("day2").innerHTML = day2;
    document.getElementById("day3").innerHTML = day3;
    document.getElementById("day4").innerHTML = day4;

    let index = 0;

    for(var i = 0; i < forecastData.list.length; i ++) {
        let tmp = forecastData.list[i];
        let dateString = tmp.dt_txt;
        if(dateString.includes("18:00:00")) {
            let temperature = tmp.main.temp;
            let icon = "http://openweathermap.org/img/w/" + tmp.weather[0].icon + ".png";
            let desc = tmp.weather[0].description;

            let divId = "temp" + index;
            let imgId = "temp_img" + index;
            document.getElementById(divId).innerHTML = temperature + "&deg;F";
            document.getElementById(imgId).setAttribute("src", icon);
            document.getElementById(imgId).setAttribute("alt", desc);

            index += 1;
        }
    }
}