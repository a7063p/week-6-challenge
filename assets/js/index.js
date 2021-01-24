var cityHeaderEl = document.querySelector('#response-city-name');
var weatherDetailsEl = document.querySelector('#response-weather');
var currentWeatherEl = document.querySelector('#current-uvi')
var savedCityEl = document.querySelector('#city-storage');
var city= []

// Moment.Js Date)
var date = moment().format("(M/DD/YYYY)" );

// --------------------SEARCH WEATHER-------------------//

var searchWeather = function() {
    
    cityHeaderEl.innerHTML = "";
    var search= document.querySelector('#search').value.trim();
    var searchTerm = search.toUpperCase();
  


    // --------daily weather promise---------------//

    fetch('https://api.openweathermap.org/data/2.5/weather?q='
    + searchTerm +
    '&appid=d649823ba74d47f1330b1e1bee44ba38&units=imperial')
    .then(function(response){
        return response.json()
    })
        .then(function(data){        
            var lat = data.coord.lat        
            var lon = data.coord.lon         
        
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
            
            
            var cityHeader = document.getElementById('response-city-name')
            cityHeader.innerHTML += searchTerm + " " + date;

            var currentTemp = document.getElementById('current-temp')
            currentTemp.innerHTML = ""
            currentTemp.innerHTML += 'Temperature:' + " " + temp + " " + '&#8457';

            var currentHumidity = document.getElementById('current-humidity')
            currentHumidity.innerHTML = ""
            currentHumidity.innerHTML += 'Humidity:' + " " + humid + "%";

            var currentWind = document.getElementById('current-wind')
            currentWind.innerHTML = ""
            currentWind.innerHTML += 'Wind Speed:' + " " + wind + " " + "MPH";

            var iconImg = document.createElement('img');
            iconImg.setAttribute('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png");
            iconImg.setAttribute('alt', iconText);

            cityHeaderEl.appendChild(iconImg);       

            uvIndex(uvi);
            forecastDay1(data);
            forecastDay2(data);
            forecastDay3(data);
            forecastDay4(data);
            forecastDay5(data);

            saveLocation(search, searchTerm)
            
        })
};


// -------------------------Index notification and 5 day forecast-----------------//

var uvIndex = function (uvi) {
    
    
    if (uvi >= 6) {
        var currentUvi = document.getElementById('current-uvi');
        currentUvi.innerHTML = ""
        currentUvi.innerHTML += "UV Index:" + " "; 

        var uviLevel = document.createElement('span');
        uviLevel.setAttribute('class', 'uv-high')
        uviLevel.innerHTML = uvi

        currentWeatherEl.appendChild(uviLevel)

    } 
    else if (uvi < 6 && uvi > 3) {
        var currentUvi = document.getElementById('current-uvi');
        currentUvi.innerHTML = ""
        currentUvi.innerHTML += "UV Index:" + " "; 

        var uviLevel = document.createElement('span');
        uviLevel.setAttribute('class', 'uv-medium')
        uviLevel.innerHTML = uvi

        currentWeatherEl.appendChild(uviLevel)
    } else {
        var currentUvi = document.getElementById('current-uvi');
        currentUvi.innerHTML = ""
        currentUvi.innerHTML += "UV Index:" + " "; 

        var uviLevel = document.createElement('span');
        uviLevel.setAttribute('class', 'uv-low')
        uviLevel.innerHTML = uvi

        currentWeatherEl.appendChild(uviLevel)
    }    
};

var forecastDay1 = function(data) {

    
    //    -----forecast DAY 1-------------------//
    var day1 = moment().add(1, 'days').format("M/DD/YYYY");    
    var icon1 = data.daily[1].weather[0].icon;
    var text1 = data.daily[1].weather[0].description;
    var forecastTemp1 = data.daily[1].temp.max; 
    var forecastHumid1 = data.daily[1].humidity;   

    // -----UPDATE ELEMENTS------//

    var day1Header = document.getElementById("forecast-1");
    day1Header.innerHTML="";    
    day1Header.innerHTML += day1

    var day1Img = document.getElementById("day-1-img");
    day1Img.setAttribute('src',"http://openweathermap.org/img/wn/" + icon1 + ".png");
    day1Img.setAttribute('alt', text1);

    var day1Temp = document.getElementById("day-1-temp");
    day1Temp.innerHTML ="";
    day1Temp.innerHTML += 'Temp:' + " " + forecastTemp1;

    var day1Humid = document.getElementById("day-1-humid");
    day1Humid.innerHTML ="";
    
    day1Humid.innerHTML += 'Humidity:' + " " + forecastHumid1;
}


var forecastDay2 = function (data) {

    // -----forecast DAY 2-------------------//
    var day2 = moment().add(2, 'days').format("M/DD/YYYY");
    var icon2 = data.daily[2].weather[0].icon;
    var text2 = data.daily[2].weather[0].description;
    var forecastTemp2 = data.daily[2].temp.max;
    var forecastHumid2 = data.daily[2].humidity;
   
     // -----UPDATE ELEMENTS------//
    var day2Header = document.getElementById("forecast-2");
    day2Header.innerHTML ="";
    day2Header.innerHTML += day2;

    var day2Img = document.getElementById("day-2-img");
    day2Img.setAttribute('src',"http://openweathermap.org/img/wn/" + icon2 + ".png");
    day2Img.setAttribute('alt', text2);

    var day2Temp = document.getElementById("day-2-temp");
    day2Temp.innerHTML = "";
    day2Temp.innerHTML += 'Temp:' + " " + forecastTemp2;

    var day2Humid = document.getElementById("day-2-humid");
    day2Humid.innerHTML = "";
    day2Humid.innerHTML += 'Humidity:' + " " + forecastHumid2;
}

var forecastDay3 = function (data) {

        //    -----forecast DAY 3-------------------//
        var day3 = moment().add(3, 'days').format("M/DD/YYYY");
        var icon3 = data.daily[3].weather[0].icon;
        var text3 = data.daily[3].weather[0].description;
        var forecastTemp3 = data.daily[3].temp.max ;
        var forecastHumid3 = data.daily[3].humidity;       
    
    // -----UPDATE ELEMENTS------//

    var day3Header = document.getElementById("forecast-3");
    day3Header.innerHTML = "";
    day3Header.innerHTML += day3;

    var day3Img = document.getElementById("day-3-img");
    day3Img.setAttribute('src',"http://openweathermap.org/img/wn/" + icon3 + ".png");
    day3Img.setAttribute('alt', text3);

    var day3Temp = document.getElementById("day-3-temp");
    day3Temp.innerHTML="";
    day3Temp.innerHTML += 'Temp:' + " " + forecastTemp3;

    var day3Humid = document.getElementById("day-3-humid");
    day3Humid.innerHTML = "";
    day3Humid.innerHTML += 'Humidity:' + " " + forecastHumid3;
}

var forecastDay4 = function (data) {

    //    -----forecast DAY 4-------------------//   
    var day4 = moment().add(4, 'days').format("M/DD/YYYY");
    var icon4 = data.daily[4].weather[0].icon;
    var text4 = data.daily[4].weather[0].description;
    var forecastTemp4 = data.daily[4].temp.max;    
    var forecastHumid4 = data.daily[4].humidity;
   

     // -----UPDATE ELEMENTS------//
    var day4Header = document.getElementById("forecast-4")
    day4Header.innerHTML="" ; 
    day4Header.innerHTML += day4  

    var day4Img = document.getElementById("day-4-img");
    day4Img.setAttribute('src',"http://openweathermap.org/img/wn/" + icon4 + ".png");
    day4Img.setAttribute('alt', text4);

    var day4Temp = document.getElementById("day-4-temp");
    day4Temp.innerHTML ="";
    day4Temp.innerHTML += 'Temp:' + " " + forecastTemp4;

    var day4Humid = document.getElementById("day-4-humid");
    day4Humid.innerHTML = "";
    day4Humid.innerHTML += 'Humidity:' + " " + forecastHumid4;
}

var forecastDay5 = function (data) {
    //    -----forecast DAY 5-------------------//
        var day5 = moment().add(5, 'days').format("M/DD/YYYY");
        var icon5 = data.daily[5].weather[0].icon;
        var text5 = data.daily[5].weather[0].description;
        var forecastTemp5 = data.daily[5].temp.max; 
        var forecastHumid5 = data.daily[5].humidity;
        
         // -----UPDATE ELEMENTS------//
        var day5Header = document.getElementById("forecast-5");
        day5Header.innerHTML ="";
        day5Header.innerHTML += day5;
    
        var day5Img = document.getElementById("day-5-img");
        day5Img.setAttribute('src',"http://openweathermap.org/img/wn/" + icon5 + ".png");
        day5Img.setAttribute('alt', text5);
    
        var day5Temp = document.getElementById("day-5-temp");
        day5Temp.innerHTML ="";
        day5Temp.innerHTML += 'Temp:' + " " + forecastTemp5;
    
        var day5Humid = document.getElementById("day-5-humid");
        day5Humid.innerHTML ="";
        day5Humid.innerHTML += 'Humidity:' + " " + forecastHumid5;        
}


// -----------------Save Search--------------------//
var saveLocation = function(search, searchTerm) {       
     if (city.length > 6) {         
        city.splice(0,1)
        city.push(searchTerm)                  
    } else {         
        city.push(searchTerm)
    } 
    //-------------Duplicate Search Check--------//
    var dupCityArray = [...new Set (city)]
    var dupCityChecked = dupCityArray

    localStorage.setItem('cities', JSON.stringify(dupCityChecked))
    
    loadCity() 
   
    
  };

// ----------------------Load city from local storage------------------------//
var loadCity = function() {
    city=[]    
        
    var storedCities = JSON.parse(localStorage.getItem("cities"));   
             
        if( storedCities !== null) {                    
        for(var i = 0; i < storedCities.length; i++){
            var newCity = storedCities[i]          
           city.push(newCity) 
    };
    
} else {
    return
};
searchLocal()
};


// --------------create recent search list------------------//
var searchLocal = function () {
    savedCityEl.innerHTML="" 
      
    for(var i = 0; i < city.length; i++){       
        
        var cityStorage = document.createElement('li');
        cityStorage.setAttribute('class', 'list-style')
        var cityStorageAttr = document.createElement('a');
        cityStorageAttr.setAttribute('href', '#');     
        cityStorageAttr.setAttribute('id', i);
        cityStorageAttr.setAttribute('value', city[i]);
        cityStorageAttr.setAttribute('onclick' , "recentSearch(this)");
        cityStorageAttr.setAttribute('class', 'search-list')
        cityStorageAttr.setAttribute('style', 'text-decoration:none');        
        cityStorageAttr.innerHTML= city[i];
               
        savedCityEl.appendChild(cityStorage);
        cityStorage.appendChild(cityStorageAttr);
    }
}

// --------------Recent Searches onclick-------------//
var recentSearch = function (value) {
       
    var newCity = value.innerHTML    
         
    document.getElementById('search').removeAttribute('value', 'Las Vegas')      
    document.getElementById('search').setAttribute('value', newCity) 
    searchWeather()   
    
        
};

var btnHandler = function (event){
    event.target.matches('#search-btn') 

    searchWeather()    
};


loadCity();
searchWeather();
document.getElementById("search-btn").addEventListener('click', btnHandler);



        
    


