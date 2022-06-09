import { GET_MENU, MENU_ERROR, UPDATE_MENU,AUTH_ERROR
 } from "../actions/types";

const initialState = {
  menu: null,
  loading: true,
  error: {},
};

function menuReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MENU:
    case UPDATE_MENU:
      return {
        ...state,
        menu: payload,
        loading: false,
      };
    case MENU_ERROR:
    case AUTH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        menu: null,
      };
    default:
      return state;
  }
}

export default menuReducer;
