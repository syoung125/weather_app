import React from 'react';
import axios from 'axios';
import Weather from '../components/Weather'
import data from '../json/city.list.json';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoading: true,
    wList: [],
    cityId: this.props.match.params.id,
    cityName: null,
    CountryName: null
  };
  
  getWeather = async() => {
    // weather of given id
    const {data: {list}} = await axios.get("http://api.openweathermap.org/data/2.5/forecast?id="+this.state.cityId+"&APPID=902ca10063feb0211f04abbebbebcf8d");
    this.setState({wList: list, isLoading: false});
    this.findCityById();
  }

  componentDidMount(){
    this.getWeather();
  }

  findCityById(){
    for(var i=0;i<data.length;i++){
      var city = data[i];
      if(city.id == this.state.cityId){
        this.setState({cityName: city.name, CountryName: city.country});
        break;
      }
    }
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
          <div className="weathers__header">
            <h1>Weather of {this.state.cityName}, {this.state.CountryName}</h1>
          </div>
          <div className="weathers__body">
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

export default Home;
