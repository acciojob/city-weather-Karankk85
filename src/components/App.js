import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "YOUR_API_KEY"; // Replace with your real OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!query) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError("");
      } else {
        setWeatherData(null);
        setError("City not found");
      }
    } catch (err) {
      setError("Error fetching data");
      setWeatherData(null);
    }
  };

  return (
    <div>
      {/* Do not remove the main div */}
      <div>
        <input
          type="text"
          className="search"
          placeholder="Enter city name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p>{error}</p>}

      {weatherData && (
        <div className="weather">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
};

export default App;
