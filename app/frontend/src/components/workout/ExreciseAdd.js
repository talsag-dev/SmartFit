import React, {  useState,useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExrecise } from "../../actions/workout";
import Modal from "react-modal";
import Exercises from "./Exercises";


const ExerciseAdd = ({ addExrecise, addExercisetoForm }) => {
  const [exerciseData, setexerciseData] = useState({
    favorite: false,
    number_of_reps: 0,
    number_of_sets: 0,
    alternatives: [],
  });
  const [isModalOpen, setisModalOpen] = useState(false);
  const [addDisabled, setaddDisabled] = useState(true);
  const [DisabledPick, setDisabledPick] = useState(false);

  useEffect(() => {
    if (
      exerciseData.number_of_reps !== 0 &&
      exerciseData.number_of_sets !== 0 &&
      exerciseData.hasOwnProperty("id")
    ) {
      setaddDisabled(false);
    }
  }, [setaddDisabled, exerciseData]);

  const onClick = (e) => {
    e.preventDefault();
    addExercisetoForm(exerciseData);
  };

  const onChange = (e) => {
    e.preventDefault();
    setexerciseData({
      ...exerciseData,
      [e.target.name]: e.target.valueAsNumber,
    });
  };

  function handleExreciseClick(exercise) {
    setexerciseData({ ...exerciseData, ...exercise });
    setisModalOpen(false);
  }

  const handleRemoveClick = (e) => {
    e.preventDefault();
    e.target.parentElement.style.display = "none";
  };

  return (
    <div className='input-field'>
      <button
        className='btn btn-primary'
        onClick={() => {
          setisModalOpen(true);
          setDisabledPick(true);
        }}
        style={{ fontSize: "small" }}
        disabled={DisabledPick}
      >
        Pick Exercise
      </button>
      <Modal isOpen={isModalOpen} ariaHideApp={false}>
        <Exercises handleExreciseClick={handleExreciseClick} />
      </Modal>
      <label className='text-muted'>Number of sets </label>
      <input
        type='number'
        className='form-control'
        name='number_of_sets'
        onChange={(e) => onChange(e)}
      />
      <label className='text-muted'>Number of reps </label>
      <input
        type='number'
        className='form-control'
        name='number_of_reps'
        onChange={(e) => onChange(e)}
      />{" "}
      <button
        className='btn btn-primary'
        onClick={onClick}
        disabled={addDisabled}
      >
        Add
      </button>
      <button className='btn btn-primary' onClick={handleRemoveClick}>
        Remove
      </button>
    </div>
  );
};


ExerciseAdd.propTypes = {
  addExrecise: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  workout: state.workout,
});

export default connect(mapStateToProps, { addExrecise })(
  ExerciseAdd
);
