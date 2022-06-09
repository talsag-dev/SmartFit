import { GET_EXERCISE, GET_EXERCISES, EXERCISES_ERROR,AUTH_ERROR
 } from "../actions/types";

const initialState = {
  exercise: null,
  loading: true,
  error: {},
};

function exerciseReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXERCISE:
    case GET_EXERCISES:
      return {
        ...state,
        exercise: payload,
        loading: false,
      };
    case EXERCISES_ERROR:
    case AUTH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        exercise: null,
      };
    default:
      return state;
  }
}

export default exerciseReducer;
