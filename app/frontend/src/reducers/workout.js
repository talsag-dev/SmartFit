import {
  GET_WORKOUT,
  WORKOUT_ERROR,
  UPDATE_WORKOUT,
  EXERCISES_ERROR,
  ADD_EXERCISE,
  AUTH_ERROR
} from "../actions/types";

const initialState = {
  workout: null,
  loading: true,
  error: {},
};

function workoutReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WORKOUT:
    case UPDATE_WORKOUT:
    case ADD_EXERCISE:
      return {
        ...state,
        workout: payload,
        loading: false,
      };
    case WORKOUT_ERROR:
    case EXERCISES_ERROR:
    case AUTH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        workout: null,
      };
    default:
      return state;
  }
}

export default workoutReducer;
