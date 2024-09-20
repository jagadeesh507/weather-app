import "./App.css";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet"; // Import Helmet

function App() {
  const [city, setCity] = useState("");
  const [isFirst, setIsFirst] = useState(true);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  const InputValue = (e) => {
    setCity(e.target.value);
  };

  const GetData = async (event) => {
    event.preventDefault();
    setIsFirst(false);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=MQPL56VG6BJS5KN9KESUD59BK&contentType=json`
      );

      if (response.status !== 200) {
        setWeather(null);
      } else {
        setWeather(response.data);
        setLat(response.data.latitude);
        setLong(response.data.longitude);
      }
      setLoading(false);
    } catch (error) {
      setWeather(null);
      setLoading(false);
    }
  };

  return (
    <div className="body">
      {/* Helmet to inject Plausible script into the head */}
      <Helmet>
        <script
          defer
          data-domain="weather-app-orpin-rho.vercel.app"
          src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
        ></script>
        <script>
          {`
            window.plausible = window.plausible || function() { 
              (window.plausible.q = window.plausible.q || []).push(arguments)
            }
          `}
        </script>
      </Helmet>

      <form onSubmit={GetData}>
        <label>
          Enter City Name:
          <input
            type="text"
            placeholder="Enter city name"
            onChange={InputValue}
            value={city}
          />
        </label>
        <button className="submit-button">Submit</button>
      </form>

      {loading ? (
        <i className="fa-solid fa-rotate fa-spin fa-2xl"></i>
      ) : weather ? (
        <div className="data-card">
          <div className="data-content">
            <div className="city-name">City Name: {weather.resolvedAddress}</div>
            <div className="weather-data">
              <div>ICON: {weather.days[0].icon}</div>
              <div>TEMPERATURE: {weather.days[0].temp}</div>
              <div>DEW: {weather.days[0].dew}</div>
              <div>CLOUD COVER: {weather.days[0].cloudcover}</div>
              <div>DESCRIPTION: {weather.description}</div>
              <div>WEATHER CONDITION: {weather.days[0].description}</div>
            </div>
          </div>
          <iframe
            src={`https://maps.google.com/maps?q=${lat},${long}&hl=es;&output=embed`}
            title="google-map"
          ></iframe>
        </div>
      ) : (
        !isFirst && <div className="error">Please enter a valid city</div>
      )}
    </div>
  );
}

export default App;
