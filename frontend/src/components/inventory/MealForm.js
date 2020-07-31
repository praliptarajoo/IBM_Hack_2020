import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { addMeal } from "../../actions/inventory";

const useStyles = makeStyles((theme) => ({
	form: {
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
		width: "40%"
	},
	button: { minHeight: 56, marginTop: 8, marginRight: 10 }
}));

const MealForm = () => {
	const [ mealId, setMealId ] = useState("");
	const [ category, setCategory ] = useState("");
	const [ cuisine, setCuisine ] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = () => {
		dispatch(addMeal(mealId, category, cuisine));
	};

	const classes = useStyles();
	return (
		<form onSubmit={handleSubmit} className={classes.form}>
			<TextField
				label='Meal Id'
				margin='normal'
				variant='outlined'
				type='number'
				required
				value={mealId}
				onChange={(e) => setMealId(e.target.value)}
				style={{ width: 120 }}
			/>
			<TextField
				label='Category'
				margin='normal'
				variant='outlined'
				type='text'
				required
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				style={{ width: 150 }}
			/>
			<TextField
				label='Cuisine'
				margin='normal'
				variant='outlined'
				type='text'
				required
				value={cuisine}
				onChange={(e) => setCuisine(e.target.value)}
				style={{ width: 150 }}
			/>
			<Button
				variant='contained'
				color='primary'
				size='large'
				type='submit'
				className={classes.button}>
				Add Meal
			</Button>
		</form>
	);
};

export default MealForm;
