import { useState } from "react";

const Day08 = () => {
  const [city, setcity] = useState("");
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [weather, setweather] = useState(null);
  const fetchCity = async () => {
    if (city === "") return;
    setloading(true);
    setweather(null);
    seterror(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=af0c7ca08aefc54c8b5f07f2892624f2&units=metric`,
      );
      if (!res.ok) throw new Error("City Not Found !");
      const data = await res.json();
      setweather(data);
      setcity("");
    } catch (err) {
      seterror(err.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 p-4 ">
      <div className="bg-gray-50 max-w-sm w-full  rounded-xl shadow-xl">
        <h1 className="text-center text-xl text-gray-500 my-4 border-b border-gray-300 leading-relaxed">
          Weather App
        </h1>
        <div className="flex items-center justify-center gap-2 mb-4 p-2">
          <input
            type="text"
            placeholder="city name"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") fetchCity();
            }}
            className="p-2 border border-gray-200 bg-gray-100 rounded-lg flex-1 "
          />
          <button
            onClick={fetchCity}
            className="p-2 border bg-blue-800 text-white font-semibold cursor-pointer rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Search
          </button>
        </div>
        {error && (
          <div className="bg-gray-100 text-center p-10 leading-relaxed">
            <p className="text-6xl mb-2">🌧️</p>
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-gray-500">
              Please check the city name and try again
            </p>
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center p-10">
            <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-transparent animate-spin"></div>
          </div>
        )}
        {weather && (
          <div className="">
            <div className="bg-blue-800 text-center p-4   ">
              <h2 className="text-white font-semibold text-xl ">
                {weather.name},{weather.sys.country}
              </h2>
              <p className="text-gray-200 text-xs font-semibold">
                {new Date(weather.dt * 1000).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="flex justify-center ">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
              <p className="text-7xl text-white mb-1 ">
                {Math.round(weather.main.temp)}°
              </p>
              <p className="text-gray-200 text-sm font-semibold">
                {weather.weather[0].description}
              </p>
            </div>
            <div className="grid grid-cols-2 p-6  bg-gray-100 gap-3 rounded-b-xl ">
              <div className="text-center bg-white border border-gray-100 py-4 rounded-xl leading-relaxed">
                <div>
                  <span className="text-2xl">💧</span>
                </div>
                <p className="text-blue-800">{weather.main.humidity} %</p>
                <p className="text-gray-500 text-sm">Humidity</p>
              </div>
              <div className="text-center bg-white border border-gray-100 py-4 rounded-xl leading-relaxed">
                <div>
                  <span className="text-2xl">💨</span>
                </div>
                <p className="text-blue-800">
                  {Math.round(weather.wind.speed)} km/h
                </p>
                <p className="text-gray-500 text-sm">Wind speed</p>
              </div>
              <div className="text-center bg-white border border-gray-100 py-4 rounded-xl leading-relaxed">
                <div>
                  <span className="text-2xl">🌡️</span>
                </div>
                <p className="text-blue-800">
                  {Math.round(weather.main.feels_like)} °C{" "}
                </p>
                <p className="text-gray-500 text-sm">Feels like</p>
              </div>
              <div className="text-center bg-white border border-gray-100 p-2 rounded-xl leading-relaxed">
                <div>
                  <span className="text-2xl">👁️</span>
                </div>
                <p className="text-blue-800">
                  {(weather.visibility / 1000).toFixed(1)} km
                </p>
                <p className="text-gray-500 text-sm">Visibility</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Day08;
