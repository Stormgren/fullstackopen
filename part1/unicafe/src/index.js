import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {
  return(
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  if (props.all === 0 ) {
    return(
      <div>
        No feedback given
      </div>
    )
  } else {
  return (
    <table>
    <tbody>
    
        <Statistic text="Good" value={props.good}/>
      
        <Statistic text="Neutral" value={props.neutral}/>
       
        <Statistic text="Bad" value={props.bad}/>
      
        <Statistic text="All" value={props.all}/>
      
        <Statistic text="Average" value={props.average / props.all}/>
       
        <Statistic text="Positive" value={(100 / props.all * props.good) + ' %'}/>
        
      </tbody>
      </table>
  )
}
}

const Button = (props) =>{
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const goodHandler = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(average + 1)
  }

  const neutralHandler = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage(average + 0)

  }

  const badHandler = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average - 1)

  }

  return (
    <div>
      <h1>Give feedback:</h1>
      <Button handleClick={goodHandler} text="Good"/>
      <Button handleClick={neutralHandler} text="Neutral"/>
      <Button handleClick={badHandler} text="Bad"/>

      <h1>Statistics:</h1>

      <Statistics good={good} bad={bad} neutral={neutral} average={average} all={all} />

    </div>
  )
}

//All, average, positive

ReactDOM.render(<App />, 
  document.getElementById('root')
)