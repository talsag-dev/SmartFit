import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import workout from "./workout";
import menu from "./menu";
import food from "./food";
import exercise from "./exercise";
export default combineReducers({
  alert,
  food,
  exercise,
  auth,
  profile,
  workout,
  menu
});
