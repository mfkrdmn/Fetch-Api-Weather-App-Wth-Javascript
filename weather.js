let url = "https://api.openweathermap.org/data/2.5/" 
let apiKey = "643423c7b5bbc82e36390c3f367e2e9e"


const start = function(cityName){

    let apiLink = `${url}weather?q=${cityName}&appid=${apiKey}&units=metric`

    fetch(apiLink)
    .then(function(response){
        return response.json()
    })
    .then(resultinDisplay)

}

const resultinDisplay = function(result){

    $(".sky").html(result.weather[0].description) 
    $(".feelsLike").html(`${Math.round(result.main.feels_like)}°`)
    $(".temp").html(`${Math.round(result.main.temp)}°`)
    $(".city").html(`${result.name},${result.sys.country}`)
    $(".humidity").html(`${Math.round(result.main.humidity)}%`)
    $(".windSpeed").html(`${Math.round(result.wind.speed)} kmh`)
    $(".minMaxTemp").html(`${Math.round(result.main.temp_min)}°C /
     ${Math.round(result.main.temp_max)}°C`)
}

$("#searchInput").keypress(function(e){
    if(e.keyCode == "13"){
        start($("#searchInput").val())
    }
})

