import React, { Fragment, useState, useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { updateWorkout, getCurrentWorkout } from "../../actions/workout";
import Select from "react-select";
import FullBody from "./FullBody";
import { setAlert } from "../../actions/alert";

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our profileData
 */
  const initialState = {
    number_of_days_per_week: 0,
    exercises: [],
    split: '',
  };
const WorkoutForm = ({
  workout: { workout, loading },
  setAlert,
  updateWorkout,
  getCurrentWorkout,
}) => {
    const fav_split = useSelector((state) => state.profile.profile?.fav_split);

    const [Option, setOption] = useState(
      fav_split === undefined ? "" : fav_split
    );

  const [formData, setFormData] = useState(initialState);
  let navigate = useNavigate();

  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!workout) getCurrentWorkout();

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && workout) {
      const workoutData = { ...initialState };
      for (const key in workout) {
        if (key in workoutData) workoutData[key] = workout[key];
      }
      for (const key in workout.exercises) {
        if (key in workoutData) workoutData[key] = workout.exercises[key];
      }

      setFormData(workoutData);
    }
  }, [loading, getCurrentWorkout, workout]);

  const handleClickSumbit = (e) => {
    e.preventDefault();
    updateWorkout(formData);
    setTimeout(()=>navigate('/workout'),1000)
  };

  const handleChange = (e) => {
    setOption(e.target.value);
    setFormData({ ...formData, split: e.target.value });
  };

  function addExercisetoForm(exercise) {
      setFormData({ ...formData, exercises: [...formData.exercises, exercise] });
      setAlert("Exercise Added", "success");
  }

  return (
    <section className='container'>
      <h1 className='large text-primary'>{"Update Your Workout"}</h1>
      <p className='lead'>
        <i className='fas fa-user' />
        {" Add some changes to your workout"}
      </p>
      <form className='formWorkout'>
        <small>* = required field</small>
        <div className='form-group'>
          <Select
            onChange={(e) => {
              setFormData({
                ...formData,
                number_of_days_per_week: e.value,
              });
              console.log(formData)
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "#e0c6c1",
                text: "#3599B8",
                font: "#3599B8",
              },
            })}
            options={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
              { value: 5, label: "5" },
              { value: 6, label: "6" },
              { value: 7, label: "7" },
            ]}
            required
          />

          <small className='form-text'>
            * How many days per week are you going to workout?
          </small>
        </div>
      </form>
      <div className='workout-fav_split'>
        <h2 className='text-primary'>Favorite Split</h2>
        <form className='form-fav_split' onChange={handleChange} required>
          <small className='form-text'>
            *please choose your desired workout split
          </small>
          <input
            type='radio'
            value='Full Body'
            name='split'
            defaultChecked={Option === "Full Body"}
          />
          <label htmlFor='Full Body'>Full Body</label>
          <input
            type='radio'
            value='Body Part'
            name='split'
            defaultChecked={Option === "Body Part"}
          />
          <label htmlFor='Body Part'>Body Part</label>
          <input
            type='radio'
            value='Upper Lower'
            name='split'
            defaultChecked={Option === "Upper Lower"}
          />
          <label htmlFor='Upper Lower'>Upper Lower</label>
          <input
            type='radio'
            value='Push,Pull, Legs'
            name='split'
            defaultChecked={Option === "Push,Pull, Legs"}
          />
          <label htmlFor='Push,Pull, Legs'>Push,Pull, Legs</label>
        </form>
      </div>
      <div className='chosen-workout'>
        {Option === "Full Body" ? (
          <FullBody addExercisetoForm={addExercisetoForm} />
        ) : (
          ""
        )}
      </div>
      <button className='btn btn-primary my-1' onClick={handleClickSumbit}>
        Submit
      </button>

      <Link className='btn btn-light my-1' to='/dashboard'>
        Go Back
      </Link>
    </section>
  );
};

WorkoutForm.propTypes = {
  updateWorkout: PropTypes.func.isRequired,
  getCurrentWorkout: PropTypes.func.isRequired,
  workout: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  workout: state.workout,
  profile: state.profile,
});

export default connect(mapStateToProps, { setAlert,updateWorkout, getCurrentWorkout })(
  WorkoutForm
);
