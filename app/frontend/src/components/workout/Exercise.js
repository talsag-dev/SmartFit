import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ExerciseItem = ({ exercise }) => {
  return (
    <div className='exercise-grid bg-light'>
      <img src={exercise.gifUrl} alt='' className='round-img' />
      <div>
        <h2 className='exercise-title'>{exercise.name}</h2>
        <p className='exercise-target-muscle'>
          Target Muscle:{exercise.target}
        </p>
        <p className='exercise-equipment'>
          Equipment:{exercise.equipment && <span>{exercise.equipment}</span>}
        </p>
        <p className='exercise-bodyPart'>
          Body Part:{exercise.bodyPart && <span>{exercise.bodyPart}</span>}
        </p>
        {exercise.number_of_sets ? (
          <p className='exercise-numberofsets'>
            Sets:
            {<span>{exercise.number_of_sets}</span>}
          </p>
        ) : null}
        {exercise.number_of_reps ? (
          <p className='exercise-numberofreps'>
            Reps:
            {<span>{exercise.number_of_reps}</span>}
          </p>
        ) : null}
      </div>
    </div>
  );
};


ExerciseItem.propTypes = {
  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  workout: state.workout,

});

export default connect(mapStateToProps)(ExerciseItem);
