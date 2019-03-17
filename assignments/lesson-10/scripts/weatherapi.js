let weatherRequest = new XMLHttpRequest();
let apiURLstring = "api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&APPID=ce65a8d7c7b2b3226cf302518813322f"
weatherRequest.open('Get', apiURLstring, true);
weatherRequest.send();


weatherRequest.onload =  function () {
    let weatherData = JSON.parse(weatherRequest.responseText);
    console.log(weatherData);
}