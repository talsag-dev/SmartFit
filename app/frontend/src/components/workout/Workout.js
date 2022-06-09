import React, {  Fragment, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useParams, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentWorkout, createWorkout,deleteWorkout } from "../../actions/workout";
import ExerciseItemDelete from "./ExerciseItemDelete";
import Spinner from "../layout/Spinner";


const Workout = ({
  createWorkout,
  getCurrentWorkout,
  deleteWorkout,
  workout: { workout,loading },
  auth: {
    user: { full_name, email },
  },
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    getCurrentWorkout();
  }, [getCurrentWorkout]);

  const handleUpdateClick = (e) => {
    e.preventDefault();
    navigate("/create-workout");
  };
  const handleDeleteClick = (e) => {
    e.preventDefault();
    deleteWorkout();
    navigate("/dashboard");
  };
  return (
    <section className='container'>
      <h1 className='large text-primary'>Workout</h1>
      <p className='lead'>
        <i className='fas fa-dumbbell' /> Welcome{" "}
        {full_name}
      </p>
      {workout !== null ? (
        <>
          {workout.exercises.length !== 0 ? (
            <Fragment>
              <h2 className='text-primary'>
                Number of Training days a week :{" "}
                {workout.number_of_days_per_week}
              </h2>
              <h2 className='text-primary'>Split : {workout.split}</h2>
              {workout.split === "Full Body" && (
                <Fragment>
                  <h3>Chest</h3>
                  {workout.exercises.map(
                    (exercise) =>
                      exercise.bodyPart.includes("chest") && (
                        <>
                          <ExerciseItemDelete exercise={exercise} />
                        </>
                      )
                  )}

                  <h3>Back</h3>
                  {workout.exercises.map(
                    (exercise) =>
                      exercise.bodyPart.includes("back") && (
                        <>
                          <ExerciseItemDelete exercise={exercise} />
                        </>
                      )
                  )}

                  <h3>Shoulders</h3>
                  {workout.exercises.map(
                    (exercise) =>
                      exercise.bodyPart.includes("shoulders") && (
                        <>
                          <ExerciseItemDelete exercise={exercise} />
                      
                        </>
                      )
                  )}

                  <h3>Legs</h3>
                  {workout.exercises.map(
                    (exercise) =>
                      exercise.bodyPart.includes("legs") && (
                        <>
                          <ExerciseItemDelete exercise={exercise} />

                        </>
                      )
                  )}

                  <h3>Arms</h3>
                  {workout.exercises.map(
                    (exercise) =>
                      exercise.bodyPart.includes("arms") && (
                        <>
                          <ExerciseItemDelete exercise={exercise} />
                        </>
                      )
                  )}

                  <h3>Abs</h3>
                  {workout.exercises.map(
                    (exercise) =>
                      exercise.bodyPart.includes("waist") && (
                        <>
                          <ExerciseItemDelete exercise={exercise} />
                        </>
                      )
                  )}
                </Fragment>
              )}
              <>
                {" "}
                <button className='btn btn-primary' onClick={handleUpdateClick}>
                  Update Workout
                </button>
                <button className='btn btn-primary' onClick={handleDeleteClick}>
                  Delete Workout
                </button>
              </>
            </Fragment>
          ) : (
            <Navigate to='/create-workout' />
          )}
        </>
      ) : (
        <>
          <p>You have not yet setup a Workout, please add some info</p>
          <Link
            to='/create-workout'
            className='btn btn-primary my-1'
            onClick={(e) => {
              e.preventDefault();
              createWorkout(
                {
                  number_of_days_per_week: 0,
                  exercises: [],
                },
                false
              );
            }}
          >
            Create Workout
          </Link>
        </>
      )}
    </section>
  );
};

Workout.propTypes = {
  createWorkout: PropTypes.func.isRequired,
  getCurrentWorkout: PropTypes.func.isRequired,
  workout: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteWorkout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  workout: state.workout,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  createWorkout,
  getCurrentWorkout,
  deleteWorkout,
})(Workout);
