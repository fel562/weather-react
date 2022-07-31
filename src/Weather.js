import React, { useState } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactAnimatedWeather from "react-animated-weather";

import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("Somewhere");
  const [weather, setWeather] = useState({
      temp: "18",
      wind: "22",
      hum: "33",
      desc: "sunny",
      img: `http://openweathermap.org/img/wn/01d@2x.png`

      
    });
 
let dayToday = new Date();
let timeToday = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let time;
if (timeToday.getUTCMinutes()<10){
time=  timeToday.getHours() + ":0" + timeToday.getUTCMinutes();
}

else {time =  timeToday.getHours() + ":" + timeToday.getUTCMinutes();}
 

  function showAlert(event) {
    event.preventDefault();
    let apiKey = "1912f8fc56e75e781c82f4724a74f76d";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
   
    axios.get(url).then(showTemp);
  }
  function myCity(event) {
    setCity(event.target.value);
  }

  function showTemp(response) {
    setWeather({
      temp: Math.round(response.data.main.temp),
      wind: response.data.wind.speed,
      hum: response.data.main.humidity,
      desc: response.data.weather[0].description,
      date: days[dayToday.getDay()],
      mtime: time,
      img: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      
    });
    console.log(weather.temp);
  }


    let form = (
    <form onSubmit={showAlert}> <div class="row">       
       <div class="col-8"><input onChange={myCity} id="cityInput" class="form-control" placeholder="your city" type="search" autoComplete="off"></input></div>
        <div class="col-2"><button type="submit" id="buttonS" class="btn btn-primary myBtn" >search</button></div>
        <div class="col-2"><button type="button" id="buttonC" class="btn btn-success myBtn" >current</button></div> </div>
    </form>
  );

  return (
    <div className="Weather">
<div class="wrapper mt-5">
    <div class="container">     
        {form}      
      <div class="row">
        <div class="col-8">last update: <span id="dayToday">{weather.date}</span> <span id="timeToday">{weather.mtime}</span></div>
      </div>
    </div>
    <div class="container">
      <div class="row  mt-5">
        <div class="col-8 weatherCur"><h1 id="placeToday">{city}</h1>
        <h2><span id="description">{weather.desc}</span></h2>
          <h3 id="myTemp">{weather.temp}</h3><span class="degree">
          <span id="tempCel"><a href="#" id="linkCel" class="active">°C</a></span>
          <span>|<span id="linkFar"><a href="#" id="linkFar">°F</a></span></span>
        </span>
          <img class="imgmain" id="mainimg"   src={weather.img}
              alt={weather.desc} />  
             
        </div>
        <div class="col-4 pt-5 myGrey">
         <span id="humidity">Humidity: {weather.hum}%</span><br />
         <span id="wind">Wind: {weather.wind} km/h</span>
        </div>
      </div>
    </div>
<div class="container mt-5" >
<div class="row" id="forecast">
    <div class="col">    
    <p><span class="day">Sun</span><br /><img src={weather.img} /> 
    <span class="tempMax">26°</span><span class="tempMin">18°</span></p>
    </div>
<div class="col">    
    <p><span class="day">Mon</span><br /><img src={weather.img} /> 
    <span class="tempMax">26°</span><span class="tempMin">18°</span></p>
    </div>
    <div class="col">    
    <p><span class="day">Tue</span><br /><img src={weather.img} /> 
    <span class="tempMax">26°</span><span class="tempMin">18°</span></p>
    </div>
    <div class="col">    
    <p><span class="day">Wed</span><br /><img src={weather.img} /> 
    <span class="tempMax">26°</span><span class="tempMin">18°</span></p>
    </div>
    <div class="col">    
    <p><span class="day">Thu</span><br /><img src={weather.img} /> 
    <span class="tempMax">26°</span><span class="tempMin">18°</span></p>
    </div> </div> 
    
    
    

</div></div>
<footer><small>This project was coded by <a href="https://www.linkedin.com/in/liubov-shupik-46940016b/" target="_blank"
    rel="noopener noreferrer">Liubov Shupik</a> and is <a href="https://github.com/fel562/weather-react" target="_blank"
    rel="noopener noreferrer">open-sourced on GitHub</a> and <a href="https://felfelfel.netlify.app/" id="testlink"
    target="_blank" rel="noopener noreferrer">hosted on Netlify</a></small></footer>
    </div>
  );
}
