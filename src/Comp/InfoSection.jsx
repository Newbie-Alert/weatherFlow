import React from "react";
import { ContextData } from "../Context/Context";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faWind } from "@fortawesome/free-solid-svg-icons";

export default function InfoSection() {
  const { weatherData } = useContext(ContextData);

  if (!weatherData)
    return (
      <div className="loading">
        <h1>로딩 중...</h1>
      </div>
    );

  return (
    <main className="container">
      <section className="main_info">
        <div className="main_info_text">
          <p>
            Today in
            <span>{weatherData.name}</span>
          </p>
          <h2>It's {weatherData.weather[0].main} day</h2>
        </div>
        <div className="main_info_weather">
          <div className="main_info_weather_icon">
            {
              <img
                src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
            }
            <h1>
              {weatherData ? String(weatherData.main.temp).slice(0, 2) : null}º
            </h1>
          </div>
          <div className="main_info_weather_rain">
            <h3>
              <FontAwesomeIcon icon={faDroplet} /> :{" "}
              {weatherData ? weatherData.main.humidity : null}%
            </h3>
            <h3>
              <FontAwesomeIcon icon={faWind} /> :{" "}
              {weatherData ? weatherData.wind.speed : null}m/s
            </h3>
          </div>
        </div>
      </section>
    </main>
  );
}
