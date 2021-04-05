import React from 'react'

const Part = ({text, num}) => {
  return (
    <div>{text} {num}</div>
  );
}

const Course = ({course}) => {
  return (
    <>
      <h2>{course.name}</h2>
      {course.parts.map((part) => <Part text={part.name} num={part.exercises} key={part.id}/>)}
      <b>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
    </>
  );
}

export default Course
