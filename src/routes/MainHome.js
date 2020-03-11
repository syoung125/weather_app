import React from 'react';
import data from '../json/city.list.json';
import $ from 'jquery';
import "./MainHome.css";

class MainHome extends React.Component{
    
    constructor(){
        super(); // this is required
        this.state = {
            isDataLoading: true,
            country: []
        }
        this.getCity();
        this.selectCountry = this.selectCountry.bind(this);
    }

    getCity() {
        if(this.state.isDataLoading == true){   //because constructor was called multiple times 
            var countryArr = [];
            var dataLen = data.length;
            data.map((city, i) => {
                if($.inArray(city.country, countryArr) == -1) countryArr.push(city.country);
                if(dataLen == i+1) this.state.isDataLoading = false;
            });
            this.state.country = countryArr.sort();    // constructor 안에 있을 때는 state를 직접적으로 바꾼다.
        }
    }

    componentDidMount () {
        const { country } = this.state;
        var select = document.getElementById("country");
        country.map(text => {
            var option = document.createElement("option");
            option.text = text;
            select.add(option);
        })
    }
    
    render() {
        return (
            <div className="main__wrapper">
                <h1 className="title">Where are you?</h1>
                <div className="select__wrapper">
                    <label>Choose country: </label>
                    <select id="country" onChange={this.selectCountry}>
                    </select>
                </div>
                <div className="select__wrapper">
                    <label>Choose city: </label>
                    <select id="city" onChange={this.selectCity}>
                    </select>
                </div>
                <br/>
                <br/>
                <p id="citytxt"></p>
            </div>
        );
    }

    selectCountry(){
        var selectedCountry = document.getElementById("country").value;
        this.makeCityList(selectedCountry);
    }

    makeCityList(selectedCountry){
        var cityArr = [];
        data.map((city) => {
            if(city.country == selectedCountry){
                cityArr.push(city);
            }
        });
        cityArr.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (b.name < a.name) {
                return 1;
            }
            return 0;
        });
        var select = document.getElementById("city");
        cityArr.map((city) => {
            var option = document.createElement("option");
            option.value = city.id;
            option.text = city.name;
            select.add(option);
        })
    }

    selectCity(){
        var selectedCity = document.getElementById("city");   // 도시 코드 (id)
        document.getElementById("citytxt").innerHTML = "<a href="+`/#/weather/${selectedCity.value}`+">Click! The weather of "
                                                                +selectedCity.selectedOptions[0].text + "</a>";
    }
}

export default MainHome;