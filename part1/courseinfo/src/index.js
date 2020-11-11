import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  return(
    <div>
      <p>{props.name} {props.noe}</p>
    </div>
  )
}

const Content = (props) => {
  console.log(props.parts[0].name);
  return(
    <div>
      <Part name={props.parts[0].name} noe={props.parts[0].excercises}/>
      <Part name={props.parts[1].name} noe={props.parts[1].excercises}/>
      <Part name={props.parts[2].name} noe={props.parts[2].excercises}/>

    </div>
  )
}

const Header = (props) => {
  console.log(props);
  return(
    <div>
      {props.course.name}
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      {props.parts.length}
    </div>
  )
}
const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))