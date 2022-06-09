import React, { Fragment,useState} from "react";
import ExerciseAdd from "./ExreciseAdd";

const ExerciseAddComponent = ({ addExercisetoForm }) => {
  const [ExerciseAddComponents, setExerciseAddComponents] = useState([]);

  const addComponent = () => {
    setExerciseAddComponents([...ExerciseAddComponents, ExerciseAdd]);
  };

  return (
    <Fragment>
      <div className='workout-full_body-section'>
        <ul className='exercise-add-list'>
          {ExerciseAddComponents.map((ExerciseAddComponent, index) => (
            <li key={index}>
              <ExerciseAddComponent addExercisetoForm ={addExercisetoForm}/>
            </li>
          ))}
        </ul>
        <button className='btn btn-light' onClick={addComponent}>
          +
        </button>
      </div>
    </Fragment>
  );
};

export default ExerciseAddComponent;
