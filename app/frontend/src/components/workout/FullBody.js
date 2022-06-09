import React, { Fragment } from "react";
import ExerciseAddComponent from "./ExerciseAddComponent";

const FullBody = ({ addExercisetoForm }) => {
  return (
    <Fragment>
      <h2 className='text-primary'>Full Body Workout</h2>
      <h3>Chest</h3>
      <ExerciseAddComponent addExercisetoForm={addExercisetoForm} />
      <h3>Arms</h3>
      <ExerciseAddComponent addExercisetoForm={addExercisetoForm} />
      <h3>Back</h3>
      <ExerciseAddComponent addExercisetoForm={addExercisetoForm} />
      <h3>Legs</h3>
      <ExerciseAddComponent addExercisetoForm={addExercisetoForm} />
      <h3>Shoulders</h3>
      <ExerciseAddComponent addExercisetoForm={addExercisetoForm} />
      <h3>Abs</h3>
      <ExerciseAddComponent addExercisetoForm={addExercisetoForm} />
    </Fragment>
  );
};

export default FullBody;


    
