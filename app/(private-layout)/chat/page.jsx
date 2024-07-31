"use client";

import { getCookie, removeCookie } from "utils";
import { useState } from "react";
import styles from "public/style/Weather.module.css";
import { getUserChat } from "services/api";

const Chat = () => {
  const [prompt, setLocation] = useState("");
  const [chatData, setChatData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      if (!prompt) {
        setError("Failed to fetch chat data. Please try again.");
        setChatData(null);
        return;
      }
      const response = await getUserChat({ prompt: prompt });
      setChatData(response?.data);
      setError("");
      setLocation("");
    } catch (err) {
      setChatData(null);
      setError(err);
    }
  };

  return (
    <div className={styles.weatherContainer}>
      <h1>Chat Information</h1>
      <form onSubmit={fetchWeather} className={styles.weatherForm}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter prompt"
          className={styles.weatherInput}
        />
        <button type="submit" className={styles.weatherButton}>
          Get Chat
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {chatData && chatData.completion ? (
        <div className={styles.weatherData}>
          <p>prompt: {chatData.completion}</p>

          {/* Add more chat details as needed */}
        </div>
      ) : chatData && !chatData.status ? (
        <p className={styles.noData}>
          Oops! Sorry Please Try with diffrent prompt.
        </p>
      ) : (
        <p className={styles.noData}>No chat data available.</p>
      )}
    </div>
  );
};

export default Chat;
