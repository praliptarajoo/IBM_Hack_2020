import React, { useEffect, useState } from "react";
import { Paper, TextField, MenuItem, Button } from "@material-ui/core";
import { getMeals } from "../../actions/inventory";
import { useSelector, useDispatch } from "react-redux";
import MealTable from "./MealTable";
import { makeStyles } from "@material-ui/core/styles";
import MealForm from "./MealForm";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 8
	},
	paper: {
		minWidth: "inherit",
		padding: 8,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	},
	filter: {
		display: "flex",
		justifyContent: "space-evenly",
		width: "30%"
	}
}));
const Inventory = () => {
	const dispatch = useDispatch();

	const [ categoryInput, setCategoryInput ] = useState("");
	const [ cuisineInput, setCuisineInput ] = useState("");
	const [ filteredMeals, setFilteredMeals ] = useState([]);
	const meals = useSelector((state) => state.inventory.meals);

	const loadMeals = () => dispatch(getMeals);
	useEffect(() => {
		loadMeals();
	}, []);

	console.log(filteredMeals);
	const categoryFilterMeals = (category) => {
		const temp = meals.filter((meal) => meal.category === category);
		setFilteredMeals(temp);
		setCategoryInput(category);
	};

	const cuisineFilterMeals = (cuisine) => {
		const temp = meals.filter((meal) => meal.cuisine === cuisine);
		setFilteredMeals(temp);
		setCuisineInput(cuisine);
	};

	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<MealForm />
				<div className={classes.filter}>
					<TextField
						select
						label='Filter by Category'
						value={categoryInput}
						onChange={(e) => categoryFilterMeals(e.target.value)}
						variant='outlined'
						margin='normal'
						style={{ width: 210 }}>
						{meals.map((meal) => (
							<MenuItem key={meal.meal_id} value={meal.category}>
								{meal.category}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						label='Filter by Cuisine'
						value={cuisineInput}
						onChange={(e) => cuisineFilterMeals(e.target.value)}
						variant='outlined'
						margin='normal'
						style={{ width: 210 }}>
						{meals.map((meal) => (
							<MenuItem key={meal.meal_id} value={meal.cuisine}>
								{meal.cuisine}
							</MenuItem>
						))}
					</TextField>
				</div>
			</Paper>
			<MealTable
				meals={filteredMeals.length !== 0 ? filteredMeals : meals}
			/>
		</div>
	);
};

export default Inventory;
