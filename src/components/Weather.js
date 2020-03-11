import React from 'react';
import PropTypes from "prop-types";
import './weather.css';

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    // var month = months[a.getMonth()];
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = year + '/' + month + '/' + date + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

/*
@prop timestamp dt:Time of data calculation unix, UTC
@prop temp temperature
...
*/
function Weather({timestamp, temp, label, clouds, wind, humidity, icon}){
    return (
        <div className="weatherWrapper">
            <div className="weather">
                <h3 className="weather__timestamp">{timeConverter(parseInt(timestamp))}</h3>
                <div className="weather__img">
                    <img src={"http://openweathermap.org/img/wn/"+icon+"@2x.png"} alt={label}></img>
                </div>
                <h2 className="weather__temp">{parseInt(temp) - 273} °C</h2>
                <h3 className="weather__label">{label}</h3>
                <p className="weather__clouds">clouds : {clouds} %</p>
                <p className="weather__wind">wind : {wind}  m/s</p>
                <p className="weather__humidity">humidity : {humidity} %</p>
            </div>
        </div>
    );
}


Weather.propTypes = {
    timestamp: PropTypes.number.isRequired,
    temp: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    clouds: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired
}

export default Weather;