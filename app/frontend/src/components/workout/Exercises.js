import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getExrecises } from "../../actions/workout";
import ExerciseItem from "./Exercise";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const Exercises = ({
  handleExreciseClick,
  getExrecises,
  exercise: { exercise, loading },
}) => {
  useEffect(() => {
    getExrecises();
  }, [getExrecises]);

    const [alignment, setAlignment] = React.useState("");
    const handleAlignment = (event, newAlignment) => {
      event.preventDefault();
      setAlignment(newAlignment);
    };
  return (
    <section className='container'>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Exercises</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse Exercises
          </p>
          <div className='bodypart-pick'>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              color='error'
            >
              <ToggleButton value='chest'>Chest</ToggleButton>
              <ToggleButton value='back'>Back</ToggleButton>
              <ToggleButton value='legs'>Legs</ToggleButton>
              <ToggleButton value='shoulders'>Shoulders</ToggleButton>
              <ToggleButton value='arms'>Arms</ToggleButton>
              <ToggleButton value='waist'>Abs</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className='exercises'>
            {exercise?.length > 0 ? (
              exercise.map(
                (exercise) =>
                  exercise.bodyPart.includes(alignment) && (
                    <Fragment>
                      <ExerciseItem key={exercise.id} exercise={exercise} />
                      <button
                        className='btn btn-primary'
                        onClick={() => {
                          handleExreciseClick(exercise);
                        }}
                      >
                        Add Exercise
                      </button>
                    </Fragment>
                  )
              )
            ) : (
              <Spinner />
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

Exercises.propTypes = {
  handleExreciseClick: PropTypes.func.isRequired,
  getExrecises: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  workout: state.workout,
  exercise: state.exercise
});

export default connect(mapStateToProps,{ getExrecises })(
  Exercises
);
