let fulldate = new Date();
let day = fulldate.getDate();
let numericmonth = fulldate.getMonth();
let year = fulldate.getFullYear();
let numericweekday = fulldate.getDay();
let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

document.getElementById("currentdate").innerHTML = weekday[numericweekday] + ", "+day+ " "+month[numericmonth]+" "+year;