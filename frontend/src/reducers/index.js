import { combineReducers } from "redux";
import auth from "./auth";
import messages from "./messages";
import inventory from "./inventory";

export default combineReducers({
	auth,
	messages,
	inventory
});
