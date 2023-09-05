import React, { useContext } from "react";
import { ContextData } from "../Context/Context";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperature0,
  faSun,
  faMoon,
  faTemperatureArrowUp,
  faTemperatureArrowDown,
} from "@fortawesome/free-solid-svg-icons";

// CHART JS-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import DetailTodo from "./DetailTodo";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    // title: {
    //   display: true,
    //   text: "Temperature Chart",
    // },
    legend: {
      display: false,
      position: "none",
    },
  },
};
// dummy data
const dayTemp = [23.2, 24.2, 25.4, 26.5, 25.8, 24.5, 24.0];

const labels = ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "00:00"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: dayTemp.map((data) => data),
      borderColor: "#e6e6e6",
      backgroundColor: "red",
    },
  ],
};

////////
// MAIN
////////
export function Detail() {
  // Context Data
  const { weatherData } = useContext(ContextData);

  // Variables
  const weatherSys = weatherData ? weatherData.sys : null;
  const weatherMain = weatherData ? weatherData.main : null;

  // Function
  /**ms 단위의 시간을 받아 지역표준시간으로 return 해줍니다**/
  const timeStamp = (ms) => {
    return new Date(ms * 1000).toLocaleTimeString();
  };

  return (
    <div className="detail_container container">
      <div className="detail_weather_info">
        <h3>Today is</h3>
        <DetailWeatherTab
          timeStamp={timeStamp}
          weatherMain={weatherMain}
          weatherSys={weatherSys}
        />
      </div>
      <div className="detail_weather_charts">
        <h3>Temperature Chart</h3>
        <Line options={options} data={data} />
      </div>
      <div className="detail_todolist">
        <DetailTodo />
      </div>
    </div>
  );
}

function DetailWeatherTab({ timeStamp, weatherSys, weatherMain }) {
  return (
    <>
      {/* sunrise */}
      <div className="detail_weather_tab">
        <div className="tab_left">
          <h3>
            <FontAwesomeIcon className="FA_icon" icon={faSun} />
          </h3>
          <p>Sunrise</p>
        </div>
        {timeStamp(weatherSys?.sunrise)}
      </div>

      {/* sunset */}
      <div className="detail_weather_tab">
        <div className="tab_left">
          <h3>
            <FontAwesomeIcon icon={faMoon} className="FA_icon" />
          </h3>
          <p>Sunset</p>
        </div>
        {timeStamp(weatherSys?.sunset)}
      </div>

      {/* temp */}
      <div className="detail_weather_tab">
        <div className="tab_left">
          <h3>
            <FontAwesomeIcon icon={faTemperature0} className="FA_icon" />
          </h3>
          <p>Temperature</p>
        </div>
        {String(weatherMain?.temp).slice(0, 4)} ºC
      </div>

      {/* max temp */}
      <div className="detail_weather_tab">
        <div className="tab_left">
          <h3>
            <FontAwesomeIcon icon={faTemperatureArrowUp} className="FA_icon" />
          </h3>
          <p>Max Temperature</p>
        </div>
        {String(weatherMain?.temp_max).slice(0, 4)} ºC
      </div>

      {/* min temp */}
      <div className="detail_weather_tab">
        <div className="tab_left">
          <h3>
            <FontAwesomeIcon
              icon={faTemperatureArrowDown}
              className="FA_icon"
            />
          </h3>
          <p>Min Temperature</p>
        </div>
        {String(weatherMain?.temp_min).slice(0, 4)} ºC
      </div>
    </>
  );
}
