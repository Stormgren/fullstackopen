import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchRes, setSearchRes] = useState("");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const [details, setDetails] = useState({});
  const [stats, setStats] = useState(false);
  const [one, setOne] = useState("");
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => setCountries(res.data));
  }, []);

  const formHandler = (e) => {
    e.preventDefault();
  };

  const searchHandler = (e) => {
    setSearchRes(e.target.value);
    let currentquery = null;

    currentquery = countries.filter((country) => {
      return country.name.toLowerCase().includes(searchRes.toLowerCase());
    });

    if (currentquery !== "" && currentquery.length > 10) {
      setMessage("The results are too many, please be more specific");
    } else if (currentquery.length !== 1) {
      setMessage("");
      setResults(currentquery);
    } else if (currentquery.length === 1) {
      setMessage("");
      setResults(currentquery);
      
      let data = results[0];
     
      let countryObj = {
        name: data.name,
        capital: data.capital,
        population: data.population,
        languages: data.languages,
        flag: data.flag,
      };
      setDetails(countryObj);
    }
  };

  const showDetailsHandler = (res) => {
    setStats(!stats);
    setOne(res);
  };

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${one}`)
      .then((str) => setDetails(str.data[0]));
  }, [one]);

  useEffect(() => {
    if (details !== undefined) {
      let info = details.capital;
      const KEY = process.env.REACT_APP_API_KEY.replace(/'/g, "");
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${KEY}&query=${info}`
        )
        .then((res) => setWeather(res.data));
    }
  }, [details]);

  const Data = ({ details, weather }) => {
    return (
      <div>
        <h3>{details.name}</h3>
        {details.capital != null ? <p> Capital {details.capital}</p> : <br />}
        {details.population != null ? (
          <p>Population: {details.population}</p>
        ) : (
          <br />
        )}
        <ul>
          {details.languages !== undefined ? (
            details.languages.map((lang) => (
              <li key={lang.name}>{lang.name}</li>
            ))
          ) : (
            <br />
          )}
        </ul>
        <img className="flag" src={details.flag} alt={details.name} />

        {details.name != null ? <p>Weather of {details.name}</p> : <br />}
        {weather.current !== undefined ? (
          <p>Temperature is {weather.current.temperature}</p>
        ) : (
          <br />
        )}
        {weather.current !== undefined ? (
          <img
            src={weather.current.weather_icons}
            alt={weather.current.description}
          />
        ) : (
          <br />
        )}
        {weather.current !== undefined ? (
          <p>
            Wind speed {weather.current.wind_speed} direction{" "}
            {weather.current.wind_dir}
          </p>
        ) : (
          <br />
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <form onSubmit={formHandler}>
        <input type="text" onChange={searchHandler} />
      </form>
      {message}
      <ul>
        {results.map((result) => (
          <li key={result.name}>
            {result.name}
            <button onClick={() => showDetailsHandler(result.name)}>
              Show more
            </button>
          </li>
        ))}
      </ul>
      {<Data details={details} weather={weather} />}
    </div>
  );
};

export default App;
