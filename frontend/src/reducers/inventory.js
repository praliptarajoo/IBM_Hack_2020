import {
	GET_MEALS,
	GET_ITEMS,
	GET_ITEM,
	UPDATE_ITEM,
	INVENTORY_ERROR,
	TOGGLE_STATE,
	GET_SELECTED_ITEMS
} from "../actions/types";

const initialState = {
	meals: [],
	currentMealId: null,
	items: [],
	selectedItems: [],
	state: "meal"
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_MEALS:
			return {
				...state,
				meals: action.payload,
				state: "meal"
			};
		case GET_SELECTED_ITEMS:
			return {
				...state,
				selectedItems: action.payload.selectedItems,
				currentMealId: action.payload.meal_id,
				state: "item"
			};
		case GET_ITEMS:
			return {
				...state,
				items: action.payload,
				state: "item"
			};
		case TOGGLE_STATE:
			return {
				...state,
				state: action.payload
			};
		case UPDATE_ITEM:
		default:
			return state;
	}
}
