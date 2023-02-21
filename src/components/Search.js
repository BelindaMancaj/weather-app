import React, { useEffect, useState } from 'react';
import './Search.css'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

fontawesome.library.add(faCheckSquare, faCoffee);

const Search = () => {
    const [location, setLocation] = useState("Tirana");
    const [weatherData, setWeatherData] = useState([]);
  async function getWeatherData() {
    const response = await  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ddc3e8696ce96fd06aec08bccc333f59`);
    const data = await response.json();
    setWeatherData(data)
  }
  const handleSearch = (e) =>{
    setLocation(e.target.value)
  }
  
  console.log(weatherData)
  useEffect(() =>{
      getWeatherData();
  }, [])
  console.log(weatherData)
  return (
    <div className='container'>
      <p className='title'>Weather Forecast</p>
      <FontAwesomeIcon icon="check-square" /><br /><br />
    <FontAwesomeIcon icon="coffee" />

      <div class="search">
      <input type="text" className='location-input' onChange={(e) => handleSearch(e) }/>
      <button className='search-btn' onClick={() => getWeatherData()}>Search</button>
      </div>

      {Object.keys(weatherData).length > 0 ? 
      <>
      {weatherData.cod !== '404' ?
      <>
       <p className='location-name'>{weatherData.name}, {weatherData.sys.country}</p>
       <p class="description">~ {weatherData.weather[0].description}</p>
       <p class="temp">Now: {weatherData.main.temp} °C</p>
       <p class="temp">Maximum temperature: {weatherData.main.temp_max} °C</p>
       <p class="temp">Minimum temperature: {weatherData.main.temp_min} °C</p>
       <p class="temp">Humidity: {weatherData.main.humidity}%</p>
       </>:
       <p className='exist'>This location doesn't exist!</p>
    }
     {/* <FontAwesomeIcon icon={faCoffee} /> */}
      </>
      :<p className='loading'>Loading...</p>}
    </div>
  )
}

export default Search