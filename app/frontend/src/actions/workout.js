import api from "../utils/api";
import { setAlert } from "./alert";

import {
  GET_WORKOUT,
  WORKOUT_ERROR,
  UPDATE_WORKOUT,
  GET_EXERCISES,
  EXERCISES_ERROR,
  ADD_EXERCISE,
  GET_EXERCISE,
} from "./types";

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get current users workout
export const getCurrentWorkout = () => async (dispatch) => {
  try {
    const res = await api.get("/workout/");

    dispatch({
      type: GET_WORKOUT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get workout by ID
export const getWorkoutbyId = (userId) => async (dispatch) => {
  try {
    const userid = userId === undefined ? "" : userId;
    const res = await api.get(`/workout/${userid}`);

    dispatch({
      type: GET_WORKOUT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const getExrecises = () => async (dispatch) => {
  try {
    const res = await api.get(`/exrecise/`);

    dispatch({
      type: GET_EXERCISES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EXERCISES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create workout
export const createWorkout =
  (formData,edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post("/workout/new", formData);
      dispatch({
        type: GET_WORKOUT,
        payload: res.data,
      });

      dispatch(setAlert(edit ? "Workout Updated" : "Workout Created", "success"));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: WORKOUT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

  // update workout
export const updateWorkout =
  (formData) =>
  async (dispatch) => {
    try {
      const res = await api.patch("/workout/", formData);
      dispatch({
        type: UPDATE_WORKOUT,
        payload: res.data,
      });

      dispatch(setAlert("Workout Updated", "success"));
    } catch (err) {
      const errors = err.response.data;

      if (errors) {
        dispatch(setAlert(errors, "danger"));
      }

      dispatch({
        type: WORKOUT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };


export const addExrecise = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/workout/add_exercises", formData);
      dispatch({
        type: GET_EXERCISE,
        payload: res.data,
      });
    dispatch({
      type: ADD_EXERCISE,
      payload: res.data,
    });

    dispatch(setAlert("Exercises Added", "success"));


  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Exercise
export const deleteExercise = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/workout/delete_exercise?exercise_id=${id}`);

    dispatch({
      type:GET_EXERCISE,
      payload: res.data,
    })
    dispatch({
      type: UPDATE_WORKOUT,
      payload: res.data,
    });

    dispatch(setAlert("Exercise Removed", "success"));
  } catch (err) {
    dispatch({
      type: EXERCISES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteWorkout = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await api.delete("/workout/");

      dispatch(setAlert("Your workout has been permanently deleted"));
    } catch (err) {
      dispatch({
        type: WORKOUT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
