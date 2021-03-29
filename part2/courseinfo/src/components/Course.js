import React from 'react';

const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }

  const Content = ({ course }) => {
    return (
          <>
           {course.parts.map((part) => (
               <Part key={part.id} part={part}></Part>
           ))}
          </>
      )
  }

  const Part = ({part}) => {
      return (
          <p> {part.name} {part.exercises}</p>
      )
  }
  
  const Total = ( {course}) => {
    const arr = course.parts.map(el => el.exercises);

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

      let sum = arr.reduce(reducer)

      return (
          <h3>
              Total number of exercises is {sum}
          </h3>
      )
  }

const Course = ({ course }) => {
    return(
    <>
        <Header name={course.name}></Header>
        <Content course={course}></Content>
        <Total course ={course}></Total>
    </>
    )
}



export default Course;