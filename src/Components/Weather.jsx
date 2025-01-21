/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  useEffect(()=> {
    const fetchDefaultLocation = async () => {
      const defaultLocation = "Jaipur"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=metric&appid=c58702930ed0f528c5f5eadfe102fa5b`;
      const response = await axios.get(url);
      setData(response.data);
    }
    fetchDefaultLocation();
  },[])

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c58702930ed0f528c5f5eadfe102fa5b`; // Fixed template string
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLocation("");
      console.log(response.data); // Changed to log the actual API response
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
  }
}

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return <i className="bx bxs-sun"></i>;
      case "Clouds":
        return <i className="bx bxs-cloud"></i>;
      case "Rain":
        return <i className="bx bxs-cloud-rain"></i>;
      case "Thunderstorm":
        return <i className="bx bxs-cloud-lightning"></i>;
      case "Snow":
        return <i className="bx bxs-cloud-snow"></i>;
      case "Haze":
      case "Mist":
        return <i className="bx bxs-cloud"></i>;
      default:
        return <i className="bx bxs-cloud"></i>;
    }
  };

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>
        <div className="search-location">
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      <div className="weather-data">
        {data.weather && data.weather[0] && getWeatherIcon(data.weather[0].main)}
        <div className="weather-type">
          {data.weather ? data.weather[0].main : null}
        </div>
        <div className="temp">
          {data.main ? `${Math.floor(data.main.temp)}°C` : null}
        </div>
      </div>
    </div>
  );
};

export default Weather;
