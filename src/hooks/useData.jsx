import { useEffect, useState } from "react";
import axios from "axios";

export function useData() {
  const [weatherData, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const API_KEY = "9caf1dcc3cfea9dbb6db407fa962d875";

  useEffect(() => {
    setLoading(true);
    setError("undefined");
    navigator.geolocation.getCurrentPosition((data) => {
      const lat = data.coords.latitude;
      const lon = data.coords.longitude;
      getWeatherData(lat, lon);
    });
  }, []);

  function getWeatherData(lat, lon) {
    axios
      .get(
        // unit 설정 가능
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      .then((res) => setData(res.data))
      .catch(setError("에러 발생!"))
      .finally(setLoading(false));
  }
  return [weatherData, loading, error];
}
