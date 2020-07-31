import axios from "axios";
import { returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
	GET_MEALS,
	ADD_MEAL,
	GET_ITEMS,
	GET_ITEM,
	UPDATE_ITEM,
	INVENTORY_ERROR,
	TOGGLE_STATE,
	GET_SELECTED_ITEMS
} from "../actions/types";

export const getMeals = (dispatch, getState) => {
	axios
		.get("/api/inventory/meal/", tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_MEALS,
				payload: res.data
			});
		})
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const getSelectedItems = (meal_id) => (dispatch, getState) => {
	axios
		.get(`/api/inventory/meal/${meal_id}/`, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_SELECTED_ITEMS,
				payload: { selectedItems: res.data.items, meal_id }
			});
		})
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const toggleState = (newState) => (dispatch) => {
	dispatch({
		type: TOGGLE_STATE,
		payload: newState
	});
};

export const getItems = (dispatch, getState) => {
	axios
		.get("/api/inventory/item/", tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: GET_ITEMS,
				payload: res.data
			});
		})
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const updateItem = (mealId, item) => (dispatch, getState) => {
	if (item.meals.includes(mealId)) alert("Item Already exists !");
	else {
		const data = { meals: [ ...item.meals, mealId ] };
		axios
			.patch(`/api/inventory/item/${item.id}/`, data, tokenConfig(getState))
			.then((res) => {
				dispatch({
					type: UPDATE_ITEM
				});
				dispatch(getSelectedItems(mealId));
			})
			.catch((err) =>
				dispatch(returnErrors(err.response.data, err.response.status))
			);
	}
};

export const addMeal = (mealId, category, cuisine) => (dispatch, getState) => {
	const data = {
		meal_id: mealId,
		category,
		cuisine
	};
	axios
		.post(`/api/inventory/meal/`, data, tokenConfig(getState))
		.then((res) => {
			dispatch({
				type: ADD_MEAL
			});
			dispatch(getMeals);
		})
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
