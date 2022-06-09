import { GET_FOOD, FOOD_ERROR, AUTH_ERROR } from "../actions/types";

const initialState = {
  food: null,
  loading: true,
  error: {},
};

function foodReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FOOD:
      return {
        ...state,
        food: payload.foods,
        loading: false,
      };
    case FOOD_ERROR:
    case AUTH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        food: null,
      };
    default:
      return state;
  }
}

export default foodReducer;
