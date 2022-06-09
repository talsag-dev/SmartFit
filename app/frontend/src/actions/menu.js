import api from "../utils/api";
import { setAlert } from "./alert";

import {
  GET_MENU,
  MENU_ERROR,
  UPDATE_MENU,
  GET_FOOD,
  FOOD_ERROR,
} from "./types";

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get current users profile
export const getCurrentMenu = () => async (dispatch) => {
  try {
    const res = await api.get("/menu/");

    dispatch({
      type: GET_MENU,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MENU_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// // Get all profiles
// export const getProfiles = () => async (dispatch) => {
//   dispatch({ type: CLEAR_PROFILE });

//   try {
//     const res = await api.get("/profile/profiles/all");

//     dispatch({
//       type: GET_PROFILES,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// Get profile by ID
export const getMenuById = (userId) => async (dispatch) => {
  try {
    const userid = userId === undefined ? "" : userId;
    const res = await api.get(`/menu/${userid}`);

    dispatch({
      type: GET_MENU,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MENU_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createMenu = () => async (dispatch) => {
   try {
      const res = await api.post("/menu/add_menu");
      dispatch({
        type: GET_MENU,
        payload: res.data,
      });

      dispatch(
        setAlert("Menu Created", "success")
      );
        dispatch(
          setAlert("No Food in Menu,Please add food to menu", "warning")
        );
    } catch (err) {
      const error = err.response.data;

      if (error) {
        dispatch(setAlert(error.msg, "danger"));
      }

      dispatch({
        type: MENU_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Add Experience
export const addFood = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/menu/add_food", formData);

    dispatch({
      type: UPDATE_MENU,
      payload: res.data,
    });

    dispatch(setAlert("Food Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: MENU_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const searchFood = (query) => async (dispatch) => {
  try {
    const res = await api.post(`/nutrition/food/?query=${query}`, {});

    dispatch({
      type: GET_FOOD,
      payload: res.data,
    });
    if (res.data.message === "We couldn't match any of your foods") {
      dispatch(setAlert("No food found", "danger"));
    }
    else{
          dispatch(setAlert("Food Found", "success"));
    }
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      dispatch(setAlert("No Food Found", "danger"));
    }

    dispatch({
      type: FOOD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};



// Delete experience
export const deleteFood = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/menu/delete_food/?food_id=${id}`);

    dispatch({
      type: UPDATE_MENU,
      payload: res.data,
    });

    dispatch(setAlert("Food Removed", "success"));
  } catch (err) {
    dispatch({
      type: MENU_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};



// Delete account & profile
export const deleteMenu = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await api.delete("/menu/");

      dispatch(setAlert("Your menu has been permanently deleted"));
    } catch (err) {
      dispatch({
        type: MENU_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
