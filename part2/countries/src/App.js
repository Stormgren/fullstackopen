import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState(false);
  const [searchRes, setSearchRes] = useState('')
  const [message, setMessage] = useState('')
  const [results, setResults] = useState([])
  const [details, setDetails] = useState({})
  const [stats, setStats] = useState(false)
  const [one, setOne] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => 
      setCountries(res.data)
      )
    
  }, [])
  
  const formHandler = (e) => {
    e.preventDefault()
  }

  const searchHandler = (e) => {
    setSearchRes(e.target.value)
    let currentquery = null;


    currentquery = countries.filter(country => {
      return (
        country.name.toLowerCase().includes(searchRes.toLowerCase()) 
        );
      });

      if (currentquery !== '' && currentquery.length > 10){
        setMessage('The results are too many, please be more specific')
      } else if(currentquery.length !== 1){
        setMessage('')
        setResults(currentquery)
       console.log(results)
        
      } else if(currentquery.length === 1) {
        setMessage('')
        setResults(currentquery)
        let data = results[0];
          let countryObj = {
        name: data.name,
        capital: data.capital,
        population: data.population,
        languages: data.languages,
        flag: data.flag
      }
      setDetails(countryObj)
      }
    
  }

  
  const showDetailsHandler = (res) => {
    setStats(!stats)
    setOne(res)
  }

  useEffect(() => {
    let temp = null;
    axios.get(`https://restcountries.eu/rest/v2/name/${one}`).then(str =>  setDetails(str.data[0]))
    // // setDetails(axios.get(`https://restcountries.eu/rest/v2/name/${res}`))
    console.log(temp)
  
  }, [stats])

  const Data = ({ details }) => {
    return(
      <div>
      <h3>{details.name}</h3>
       {details.capital != null ? <p> Capital {details.capital}</p> : <br/>}
      {details.population != null ? <p>Population: {details.population}</p> : <br/>}
      <ul>
        {details.languages !== undefined ? details.languages.map(lang => <li key={lang.name}>{lang.name}</li>) : <br/>}
      </ul>
      <img src={details.flag} alt={details.name}/>
      </div>
    )
  }


  return (
    <div className="App">
      <form onSubmit={formHandler}>
        <input type="text" onChange={searchHandler}/>


      </form>
      {message}
      <ul>
      {results.map(result => <li key={result.name}>{result.name} <button onClick={() => showDetailsHandler(result.name)}>Show more</button> </li>)}
      </ul>
      { <Data details={details}/> }
    </div>
  );
}

export default App;
