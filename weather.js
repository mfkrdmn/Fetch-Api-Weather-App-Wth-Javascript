let url = "https://api.openweathermap.org/data/2.5/" 
let apiKey = "643423c7b5bbc82e36390c3f367e2e9e"

const start = function(cityName){

    let apiLink = `${url}weather?q=${cityName}&appid=${apiKey}&units=metric`
    let timeApiLink = `https://api.ipgeolocation.io/timezone?apiKey=21c99af3be2d430c9591a931cc16dda2&location=${cityName}`

    fetch(timeApiLink)
    .then(function(responsetime){
        return responsetime.json()
    })
    .then(resultinDisplayTime)


    fetch(apiLink)
    .then(function(response){
        return response.json()
    })
    .then(resultinDisplay)

}

let icon = document.getElementById("icon")
let weatherId = document.getElementById("weatherId")

const resultinDisplayTime = function(resulttime){
    
    $("#time").html(resulttime.time_24)

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
    $("#weatherId").html(result.weather[0].icon)



    const cloud = document.createElement("span");
    cloud.innerHTML='<i class="fa-solid fa-cloud"></i>'
    const clearsky = document.createElement("span");
    clearsky.innerHTML='<i class="fa-solid fa-sun"></i>'
    const fewclouds = document.createElement("span");
    fewclouds.innerHTML='<i class="fa-solid fa-cloud-sun"></i>'
    const scattered  = document.createElement("span");
    scattered .innerHTML='<i class="fa-solid fa-cloud-bolt"></i>'
    const rain  = document.createElement("span");
    rain .innerHTML='<i class="fa-solid fa-cloud-showers-heavy"></i>'

    if(weatherId.innerHTML=="04n"|weatherId.innerHTML=="04d"){
        icon.appendChild(cloud);
        $('body').css('background-image', 'url("photos/cloud(3).jpg")');
    }
    else if(weatherId.innerHTML=="01d"|weatherId.innerHTML=="01n"){
        icon.appendChild(clearsky);
        $('body').css('background-image', 'url("photos/sky.jpg")');
    }
    else if(weatherId.innerHTML=="02n"|weatherId.innerHTML=="02d"){
        icon.appendChild(fewclouds);
        $('body').css('background-image', 'url("photos/fewclouds.jpg")');
    }
    else if(weatherId.innerHTML=="03d"){
        icon.appendChild(scattered);
        $('body').css('background-image', 'url("photos/scattered.jpg")');
    }
    else if(weatherId.innerHTML=="10n"|weatherId.innerHTML=="09n"){
        icon.appendChild(rain);
        $('body').css('background-image', 'url("photos/rain.jpg")');
    }
    else{
        icon.innerHTML=""
    }



}

$("#searchInput").keypress(function(e){
    if(e.keyCode == "13"){
        start($("#searchInput").val())
    }
})

