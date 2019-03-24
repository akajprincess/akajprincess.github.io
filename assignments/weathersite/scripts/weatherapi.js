let list = document.getElementsByTagName("title");
let weatherCode;
let town = list[0].innerText;
if("Preston" === town) {
    weatherCode = 5604473;
    town = "preston";
} else if ("Soda Springs" === town) {
    weatherCode = 5678757;
    town = "sodasprings";
} else {
    weatherCode = 5585010;
    town = "fishhaven";
}
let weatherRequest = new XMLHttpRequest();
let apiURLstring = "https://api.openweathermap.org/data/2.5/weather?id=" + weatherCode + "&units=imperial&APPID=ce65a8d7c7b2b3226cf302518813322f"
weatherRequest.open('Get', apiURLstring, true);
weatherRequest.send();

let forecastRequest = new XMLHttpRequest();
let apiURLstringForecast = "https://api.openweathermap.org/data/2.5/forecast?id=" + weatherCode + "&units=imperial&APPID=ce65a8d7c7b2b3226cf302518813322f"
forecastRequest.open('Get', apiURLstringForecast, true);
forecastRequest.send(); 

let townRequest = new XMLHttpRequest();
let townURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
townRequest.open("GET", townURL, true);
townRequest.send();


weatherRequest.onload =  function () {
    let weatherData = JSON.parse(weatherRequest.responseText);
    console.log(weatherData);
    setWeatherData(town, weatherData);
}

function setWeatherData(town, weatherData) {
    let currentTemp = weatherData.main.temp;

    document.getElementById(town + "-current-temp").innerHTML = currentTemp.toFixed(2);

    let icon = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
    let desc = weatherData.weather[0].description;
    let windspeed = weatherData.wind.speed;

    document.getElementById(town + "-weather-icon").setAttribute('src', icon);
    document.getElementById(town + "-weather-icon").setAttribute("alt", desc);
    document.getElementById(town + "-weather").innerHTML = weatherData.weather[0].main;
    document.getElementById(town + "-windspeed").innerHTML = windspeed.toFixed(2);

    let windchill = 35.74 + 0.6215 * currentTemp + (0.4275 * currentTemp - 35.75) * Math.pow(windspeed, 0.16);
    document.getElementById(town + "-windchill").innerHTML = windchill.toFixed(2) + "&deg;F"
}

forecastRequest.onload = function() {
    let forecastData = JSON.parse(forecastRequest.responseText);
    console.log(forecastData);
    setForecastData(town, forecastData);
}

function setForecastData(town, forecastData) {
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
    document.getElementById(town + "-day0").innerHTML = day0;
    document.getElementById(town + "-day1").innerHTML = day1;
    document.getElementById(town + "-day2").innerHTML = day2;
    document.getElementById(town + "-day3").innerHTML = day3;
    document.getElementById(town + "-day4").innerHTML = day4;

    let index = 0;

    for(var i = 0; i < forecastData.list.length; i ++) {
        let tmp = forecastData.list[i];
        let dateString = tmp.dt_txt;
        if(dateString.includes("18:00:00")) {
            let temperature = tmp.main.temp;
            let icon = "http://openweathermap.org/img/w/" + tmp.weather[0].icon + ".png";
            let desc = tmp.weather[0].description;

            let divId = town + "-temp" + index;
            let imgId = town + "-temp_img" + index;
            document.getElementById(divId).innerHTML = temperature + "&deg;F";
            document.getElementById(imgId).setAttribute("src", icon);
            document.getElementById(imgId).setAttribute("alt", desc);

            index += 1;
        }
    }
}

townRequest.onload =  function () {
    let townData = JSON.parse(townRequest.responseText);
    console.log(townData);
    setTownData(townData);
}

function setTownData(townData) {
    var towns = townData['towns'];
    let list = document.getElementsByTagName("title");
    let townName = list[0].innerText;
    for (var i = 0; i < towns.length; i++) {
        if (towns[i].name == townName) {
            var myList = document.getElementById(town + "-events");
            var events = towns[i].events;
            for (var j = 0; j < events.length; j++) {
                var listItem = document.createElement('li');
                listItem.textContent = events[j];
                myList.appendChild(listItem);
            }
        }
    }
}