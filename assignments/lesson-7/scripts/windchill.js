<script>
function doInputOutput() {
    var tempF = parseFloat(document.getElementById('tempF').value);
    var speed = parseFloat(document.getElementById('speed').value);
    var chill = windChill(tempF, speed)

    document.getElementById("outputDiv").innerHTML = chill;
}

function windChill(tempF, speed) {
    return 35.74 + 0.6215 * tempF + (0.4275 * tempF - 35.75) * Math.pow(speed, 0.16);
}

</script>