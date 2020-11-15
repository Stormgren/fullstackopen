import React from 'react'

const Part = (props) => {
    return(
      <div>
        <p>{props.name} {props.exercises}</p>
      </div>
    )
  }
  
  const Content = (props) => {

    return(
      <div>

        {props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}

      </div>
    )
  }
  
  const Header = (props) => {
    return(
      <h3>
        {props.name}
      </h3>
    )
  }
  
  const Total = (props) => {
    
    const total = props.parts.reduce((num, sum) => num + sum.exercises, 0);

    return(
      <h4>
       total of {total} excercises
      </h4>
    )
  }

const Course = (props) => {
    const course = props.course

    return(
        <div>
   
      <Header name={course.name}/>       
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      
        </div>
    )
}

export default Course;