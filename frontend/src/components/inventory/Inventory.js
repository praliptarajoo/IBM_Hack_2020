import React from "react";
import { useSelector } from "react-redux";
import MealView from "./MealView";
import ItemView from "./ItemView";
const Inventory = () => {
	const state = useSelector((state) => state.inventory.state);
	const view = state === "meal" ? <MealView /> : <ItemView />;
	return <React.Fragment>{view}</React.Fragment>;
};

export default Inventory;
