const axios = require("axios");

const getWeatherByCity = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`,
  );

  return {
    temperature: response.data.main.temp,
    description: response.data.weather[0].description,
    humidity: response.data.main.humidity,
  };
};

module.exports = getWeatherByCity;
