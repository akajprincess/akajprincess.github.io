var tempF = parseFloat(document.getElementById('tempF').innerHTML);
var speed = parseFloat(document.getElementById('windspeed').innerHTML);
var chill = windChill(tempF, speed)

document.getElementById("windchill").innerHTML = chill.toFixed(2) + "&deg;F";


function windChill(tempF, speed) {
    return 35.74 + 0.6215 * tempF + (0.4275 * tempF - 35.75) * Math.pow(speed, 0.16);
}

