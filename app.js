let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecaste = document.querySelector(".weather_forecaste");
let w_icon = document.querySelector(".weather_icon");
let w_temp = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelslike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure")

let citySearch = document.querySelector(".weather_search");

// to get the county code
const getCountryFullN = (code) =>{
    return new Intl.DisplayNames(["en"], {type : "region"}).of(code);
}

// to get the time and date 
const getCountryTime = (dt) =>{
    const curDates = new Date(dt * 1000);
    console.log(curDates);
    const options = {
        weekdays :"long",
        year: "numeric",
        month: "long",
        day : "numeric" , 
        hour : "numeric" ,
        minute: "numeric",
    };
    const formatter= new Intl.DateTimeFormat("en-US" , options);
    return formatter.format(curDates);
}

// let get the city name dynamially in api 

let city = "pune";
 
citySearch.addEventListener("submit" , (e) =>{
    e.preventDefault();
    let cityName = document.querySelector("#city_name");
    console.log(cityName.value);
    city = cityName.value.trim();

    getWeatherData();
    
    cityName.value = "";
});

const getWeatherData = async () =>{

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=221f80f14403fad56ac45c094205f`;
    try {
        const res = await fetch(weatherApiUrl);
        const data =  await res.json();
        console.log(data);
        const {main , name , weather , wind , sys , dt} = data;
        cityName.innerHTML = `${name} , ${getCountryFullN(sys.country)}`;
        dateTime.innerHTML = getCountryTime(dt);
        w_icon.innerHTML = weather.icon;
        w_temp.innerHTML = main.temp;
        w_forecaste.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"  alt="${weather[0].description}">`;
        w_minTem.innerHTML = `min: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `max: ${main.temp_max.toFixed()}&#176`;
        w_feelslike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${main.humidity} m/s`;
        w_pressure.innerHTML = `${main.pressure} hpa`; 
    }catch (error) {
        console.error("error featching weather data:" , error);
    }   
};

document.body.addEventListener("load" , getWeatherData());
