"use client";

import { useSelector } from "react-redux";
import { getCookie } from "utils";

import { useState } from "react";
import axios from "axios";
import styles from "public/style/Weather.module.css";
import { setWeather } from "services/api";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      if (!location) {
        setError("Failed to fetch weather data. Please try again.");
        setWeatherData(null);
        return;
      }
      const response = await setWeather({ city: location });
      setWeatherData(response?.data?.weatherReport);
      setError("");
      setLocation("");
    } catch (err) {      
      setWeatherData(null);
      setError("Failed to fetch weather data. Please try again.");
    }
  };

  return (
    <div className={styles.weatherContainer}>
      <h1>Weather Information</h1>
      <form onSubmit={fetchWeather} className={styles.weatherForm}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className={styles.weatherInput}
        />
        <button type="submit" className={styles.weatherButton}>
          Get Weather
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {weatherData && weatherData.status ? (
        <div className={styles.weatherData}>
          <h3>{weatherData.location}</h3>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Condition: {weatherData.description || "No"}</p>
          <p>city: {weatherData.city}</p>
          {/* Add more weather details as needed */}
        </div>
      ) : weatherData && !weatherData.status ? (
        <p className={styles.noData}>
          Oops! Sorry Please Try with diffrent city.
        </p>
      ) : (
        <p className={styles.noData}>No weather data available.</p>
      )}
    </div>
  );
};

export default Weather;
