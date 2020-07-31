import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
	Chart,
	PieSeries,
	Legend,
	Title
} from "@devexpress/dx-react-chart-material-ui";
import { useSelector, useDispatch } from "react-redux";
import { getMeals, getItems } from "../actions/inventory";
import Card from "./common/Card";

const useStyles = makeStyles({
	cards: {
		display: "grid",
		gridTemplateColumns: "repeat(5, 1fr)",
		gridGap: 10
	},
	chart: {
		display: "flex",
		justifyContent: "start",
		width: "40%",
		marginTop: 10
	},
	paper: {
		width: "inherit",
		width: "100%"
	}
});

const styles = {
	titleText: {
		textAlign: "center"
	}
};

const TextComponent = withStyles(styles)(({ classes, ...restProps }) => (
	<Title.Text {...restProps} className={classes.titleText} />
));

const Overview = () => {
	const dispatch = useDispatch();
	const meals = useSelector((state) => state.inventory.meals);
	const items = useSelector((state) => state.inventory.items);

	useEffect(() => {
		dispatch(getMeals);
		dispatch(getItems);
	}, []);

	const totalMeals = meals.length;
	const totalItems = items.length;
	const inStockItems = items.filter(
		(item) => item.actual_stock >= item.system_stock
	).length;
	const lowInStockItems = items.filter(
		(item) => item.actual_stock <= item.system_stock && item.actual_stock != 0
	).length;
	const outOfStockItems = items.filter((item) => item.actual_stock == 0)
		.length;

	const chartData = [
		{
			status: "In Stock",
			area: 100 * inStockItems / totalItems
		},
		{
			status: "Low In Stock",
			area: 100 * lowInStockItems / totalItems
		},
		{
			status: "Out Of Stock",
			area: 100 * outOfStockItems / totalItems
		}
	];
	const classes = useStyles();
	return (
		<div>
			<div className={classes.cards}>
				<Card title='Total Meals' content={totalMeals} />
				<Card title='Total Items' content={totalItems} />
				<Card title='Items In Stock' content={inStockItems} />
				<Card title='Items Low in Stock' content={lowInStockItems} />
				<Card title='Items Out of Stock' content={outOfStockItems} />
			</div>
			<div className={classes.chart}>
				<Paper className={classes.paper}>
					<Chart data={chartData}>
						<Title text='Items Overview' textComponent={TextComponent} />
						<Legend />
						<PieSeries valueField='area' argumentField='status' />
					</Chart>
				</Paper>
			</div>
		</div>
	);
};

export default Overview;
