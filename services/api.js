// import axios from "axios";
import axiosClient from "axios/createClient";
import { getCookie, removeCookie, setCookie } from "utils";

const API_URL = "http://localhost:3001"; // Replace with your API endpoint

const registerUser = async (userData) => {
  try {
    const response = await axiosClient.post(
      `${API_URL}/api/user/register`,
      userData
    );
    console.log("response data is ::", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (userData) => {
  try {
    const response = await axiosClient.post(
      `${API_URL}/api/user/login`,
      userData
    );

    setCookie("user", response.data.data);
    setCookie(
      "token",
      `${response?.data?.data?.token?.token}`,
      new Date(Date.now() + response?.data?.data?.token?.expiresIn * 1000)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const setWeather = async (weatherData) => {
  try {
    const response = await axiosClient.post(
      `${API_URL}/api/weather/getWeather`,
      weatherData,
      {
        headers: {
          Authorization: getCookie("token"),
        },
      }
    );
    // setCookie("user", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserChat = async (chatData) => {
  try {
    const response = await axiosClient.post(
      `${API_URL}/api/openai/chats`,
      chatData,
      {
        headers: {
          Authorization: getCookie("token"),
        },
      }
    );
    // setCookie("user", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { registerUser, loginUser, setWeather, getUserChat };
