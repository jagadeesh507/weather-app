import "./App.css";
import axios from "axios";
import { useState } from "react";
function App() {
  const [city, setCity] = useState("");
  const[isFirst,setisFirst]=useState(true);
  const [weather, setWeather] = useState(null);
  const [loading,setLoading]=useState(false);
  const[long,setLong]=useState("");
  const [lat,setLat]=useState("");
  const InputValue = (e) => {
    setCity(e.target.value);
  };

  const GetData = async (event) => {
      setisFirst(false);
      setLoading(true);
      event.preventDefault();
      try {
        const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=MQPL56VG6BJS5KN9KESUD59BK&contentType=json`
        );

        if(response.status !== 200) {
          setWeather(null);
        }
        setWeather(response.data);
        console.log(response.data)
        setLat(response.data.latitude)
        setLong(response.data.longitude);
        setLoading(false);
      } catch (error) {
        setWeather(null);
        setLoading(false);
      }
  };
  return (
    <div className="body">
      <form onSubmit={GetData}>
        Enter City Name: <input type="text"placeholder="enter city name" onChange={InputValue} />
        <button className="submit-button">Submit</button>
      </form>
      {
        (loading)?<i class="fa-solid fa-rotate fa-spin fa-2xl"></i>:
        (weather) ?(<div className="data-card"><div className="data-content">
       <div className="city-name"> City Name:{weather.resolvedAddress}</div>
         <div className="weather-data"><div>ICON  : {weather.days[0].icon}</div>
         <div>DEW  :{weather.days[0].dew}</div>
         <div>CLOUD COVER  : {weather.days[0].cloudcover}</div>
          <div>DESCRIPTION  : {weather.description}</div>
          <div>WEATHER CONDITION  :{weather.days[0].description}</div>
          </div></div> 
          <iframe src={"https://maps.google.com/maps?q="+lat+","+long+"&hl=es;&output=embed"} title="google-map"></iframe>
         </div> ): (!isFirst)&&(
          <div className="error" >please enter a valid city</div>
        ) 
        
      }
      
      
    </div>
  );
}

export default App;
