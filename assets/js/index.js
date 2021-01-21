var apiKey = 'd649823ba74d47f1330b1e1bee44ba38'

fetch('https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=d649823ba74d47f1330b1e1bee44ba38&units=imperial')
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data);
})