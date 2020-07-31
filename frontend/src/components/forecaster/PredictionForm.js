import React, { useState } from "react";
import { Paper, TextField, MenuItem, Button } from "@material-ui/core";
import useStyles from "../../styles/PredictionForm.styles";

const PredictionForm = ({ data, setData }) => {
	const [ weekInput, setWeekInput ] = useState("");
	const [ centerIdInput, setCenterIdInput ] = useState("");
	const [ mealIdInput, setMealIdInput ] = useState("");
	const [ homepageInput, setHomepageInput ] = useState("");
	const [ emailerInput, setEmailerInput ] = useState("");
	const [ basePriceInput, setBasePriceInput ] = useState("");
	const [ checkoutPriceInput, setCheckoutPriceInput ] = useState("");

	const reset = () => {
		setWeekInput("");
		setCenterIdInput("");
		setMealIdInput("");
		setHomepageInput("");
		setEmailerInput("");
		setBasePriceInput("");
		setCheckoutPriceInput("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newData = {
			week: weekInput,
			center_id: centerIdInput,
			meal_id: mealIdInput,
			base_price: basePriceInput,
			checkout_price: checkoutPriceInput,
			homepage_featured: homepageInput,
			emailer_for_promotion: emailerInput
		};
		setData([ ...data, newData ]);
		reset();
	};

	const options = [ "0", "1" ];

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<form onSubmit={handleSubmit} className={classes.form}>
					<TextField
						label='Week'
						margin='normal'
						variant='outlined'
						type='number'
						required
						value={weekInput}
						onChange={(e) => setWeekInput(e.target.value)}
						style={{ width: 100 }}
					/>
					<TextField
						label='Center Id'
						margin='normal'
						variant='outlined'
						type='number'
						required
						value={centerIdInput}
						onChange={(e) => setCenterIdInput(e.target.value)}
						style={{ width: 150 }}
					/>
					<TextField
						label='Meal Id'
						margin='normal'
						variant='outlined'
						type='number'
						required
						value={mealIdInput}
						onChange={(e) => setMealIdInput(e.target.value)}
						style={{ width: 150 }}
					/>
					<TextField
						label='Base Price'
						margin='normal'
						variant='outlined'
						type='text'
						required
						value={basePriceInput}
						onChange={(e) => setBasePriceInput(e.target.value)}
						style={{ width: 160 }}
					/>
					<TextField
						label='Checkout Price'
						margin='normal'
						variant='outlined'
						type='text'
						required
						value={checkoutPriceInput}
						onChange={(e) => setCheckoutPriceInput(e.target.value)}
						style={{ width: 160 }}
					/>
					<TextField
						select
						label='Homepage Featured'
						value={homepageInput}
						required
						onChange={(e) => setHomepageInput(e.target.value)}
						variant='outlined'
						margin='normal'
						style={{ width: 210 }}>
						{options.map((option) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						label='Emailer for Promotion'
						value={emailerInput}
						required
						onChange={(e) => setEmailerInput(e.target.value)}
						variant='outlined'
						margin='normal'
						style={{ width: 210 }}>
						{options.map((option) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>
					<Button
						type='submit'
						size='large'
						color='primary'
						variant='contained'
						style={{ minHeight: 56, marginTop: 8 }}>
						Add
					</Button>
				</form>
			</Paper>
		</div>
	);
};

export default PredictionForm;
