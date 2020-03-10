import React from 'react';
import axios from 'axios';
import Weather from './Weather'
import './App.css';

class App extends React.Component {
  state = {
    isLoading: true,
    wList: []
  };
  
  getWeather = async() => {
    // weather of Seoul
    const {data: {list}} = await axios.get("http://api.openweathermap.org/data/2.5/forecast?id=1835847&APPID=902ca10063feb0211f04abbebbebcf8d");
    this.setState({wList: list, isLoading: false});
    // console.log(list);
  }

  componentDidMount(){
    this.getWeather();
  }

  render(){
    const { isLoading, wList } = this.state;
    return (<section className="container">
      {isLoading? (
        <div className="loader">
          <span className="loader_txt">Loading...</span>
        </div>
      ) : (
        <div>
        <h1>Weather in Seoul, Korea</h1>
        <div className="weathers">
          {wList.map(weather => (
            <Weather 
              key = {weather.dt}
              timestamp = {weather.dt}
              temp = {weather.main.temp}
              label = {weather.weather[0].main}
              clouds = {weather.clouds.all}
              wind = {weather.wind.speed}
              humidity = {weather.main.humidity}
              icon = {weather.weather[0].icon}
            />
          ))}
        </div>
      </div>
      )}
    </section>);
  }
  
}

export default App;
