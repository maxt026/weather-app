import React, { useState } from 'react';


const api = {
  key: '5b19d8481fc92f9bffd0f506aeffbeea',
  base: 'http://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
        });
    }
  } 
  

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 
    'June', 'July', 'August', 'September', 'October', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    ;

    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  } 

  const Timebuilder = (s) => {
    let hours = s.getHours();
    let minutes = '0' + s.getMinutes();
    let seconds = '0' + s.getSeconds();
    let output = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return output
  }


  return (
    <div className={(typeof weather.main != 'undefined')
     ? ((weather.main.temp > 16) 
     ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className='search-box'>
          <input 
          type='text' 
          className='search-bar' 
          placeholder='...Search'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>{Math.round(weather.main.temp)}°C</div>
            <div className='weather'>{weather.weather[0].main}</div>
          </div>
          <div className='lower-box'>
            <div className='keys-box'>
              <div className='keys'>Wind:</div>
              <div className='keys'>Pressure:</div>
              <div className='keys'>Humidity:</div>
              <div className='keys'>Sunrise:</div>
              <div className='keys'>Sunset:</div>
            </div>
            <div className='values-box'>
              <div className='keys'>{weather.wind.speed}m/s</div>
              <div className='keys'>{weather.main.pressure}hPa</div>
              <div className='keys'>{weather.main.humidity}%</div>
              <div className='keys'>{Timebuilder(new Date(weather.sys.sunrise*1000))}</div>
              <div className='keys'>{Timebuilder(new Date(weather.sys.sunset*1000))}</div>
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
