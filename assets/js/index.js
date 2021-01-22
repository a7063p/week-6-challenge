var cityHeaderEl = document.querySelector('#response-city-name');
var weatherDetailsEl = document.querySelector('#response-weather');


// Moment.Js Date)

var date = moment().format("(M/DD/YYYY)" );
console.log(date);

var day = moment(1611259200);
console.log(moment.d);

var searchWeather = function() {
    cityHeaderEl.innerHTML = "";
    weatherDetailsEl.innerHTML = "";

var searchTerm = document.querySelector('#search-term').value
console.log(searchTerm);

// --------daily weather promise---------------//

fetch('https://api.openweathermap.org/data/2.5/weather?q='
+ searchTerm +
'&appid=d649823ba74d47f1330b1e1bee44ba38&units=imperial')
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log("1st api", data);
    var lat = data.coord.lat
    console.log(lat);
    var lon = data.coord.lon
    console.log(lon);  
    
    return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=alerts,hourly,minutely&appid=d649823ba74d47f1330b1e1bee44ba38&units=imperial')
    
})

.then(function(response){
    return response.json()
})
.then(function(data) {
    var icon = data.current.weather[0].icon
    var iconText = data.current.weather[0].main
    var temp = data.current.temp
    var humid = data.current.humidity   
    var wind = data.current.wind_speed
    var uvi = data.current.uvi
    

    var cityHeader = document.createElement('h5');
    cityHeader.innerHTML = searchTerm + " " + date;

    var iconImg = document.createElement('img');
    iconImg.setAttribute('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png");
    iconImg.setAttribute('alt', iconText);

    var temperature = document.createElement('p')
    temperature.innerHTML ='Temperature:' + " " + temp + " " + '&#8457';

    var humidity = document.createElement('p')
    humidity.innerHTML ='Humidity:' + " " + humid + '%';

    var windSpeed = document.createElement('p')
    windSpeed.innerHTML ='Wind Speed:' + " " + wind + " " + 'MPH'    


    cityHeaderEl.appendChild(cityHeader);
    cityHeaderEl.appendChild(iconImg);
    weatherDetailsEl.appendChild(temperature);
    weatherDetailsEl.appendChild(humidity);
    weatherDetailsEl.appendChild(windSpeed);

    uvIndex(uvi)

})
};




var uvIndex = function (uvi) {
    
    if (uvi > 5) {
    var uvIndex = document.createElement('p');
    uvIndex.innerHTML = "UV Index:" + " " + uvi
    uvIndex.removeAttribute('class', "")
    uvIndex.setAttribute('class', "uv-high")

    } else if (uvi < 5 && uvi > 2) {
        var uvIndex = document.createElement('p');
        uvIndex.innerHTML = "UV Index:" + " " +uvi
        uvIndex.removeAttribute('class', "")
        uvIndex.setAttribute('class', "uv-medium")

    } else {
        var uvIndex = document.createElement('p');
        uvIndex.innerHTML = "UV Index:" + " " + uvi
        uvIndex.removeAttribute('class', "")
        uvIndex.setAttribute('class', "uv-low")

    }

    weatherDetailsEl.appendChild(uvIndex)
};








var btnHandler = function(event) {
    event.target.matches("#search-btn")    
    searchWeather()
}

document.getElementById("search-btn").addEventListener('click', btnHandler)