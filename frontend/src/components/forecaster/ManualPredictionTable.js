import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow
} from "@material-ui/core";

import Loader from "../common/Loader";

const columns = [
	{ id: "week", label: "Week", minWidth: 100, maxHeight: 50, align: "center" },
	{
		id: "center_id",
		label: "Center ID",
		minWidth: 100,
		maxHeight: 50,
		align: "center"
	},
	{
		id: "meal_id",
		label: "Meal ID",
		minWidth: 100,
		maxHeight: 50,
		align: "center"
	},
	{
		id: "base_price",
		label: "Base Price",
		minWidth: 100,
		maxHeight: 50,
		align: "center"
	},
	{
		id: "checkout_price",
		label: "Checkout Price",
		minWidth: 100,
		maxHeight: 50,
		align: "center"
	},
	{
		id: "homepage_featured",
		label: "Homepage Featured",
		minWidth: 100,
		maxHeight: 50,
		align: "center"
	},
	{
		id: "emailer_for_promotion",
		label: "Emailer for Promotion",
		minWidth: 100,
		maxHeight: 50,
		align: "center"
	}
];

const useStyles = makeStyles({
	root: {
		width: "100%"
	},
	container: {
		maxHeight: 440
	}
});

const ManualPredictionTable = ({ data, predictions, predicting }) => {
	const classes = useStyles();
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(10);

	const rows = data;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{
										minWidth: column.minWidth
									}}>
									{column.label}
								</TableCell>
							))}
							<TableCell
								key='num_orders'
								align='center'
								style={{ minWidth: 100 }}>
								Num Orders
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((row, i) => {
								return (
									<TableRow
										hover
										role='checkbox'
										tabIndex={-1}
										key={i}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell
													key={column.id}
													align={column.align}
													style={{
														padding: predicting && 4,
														minHeight: 100
													}}>
													{column.format &&
													typeof value === "number" ? (
														column.format(value)
													) : (
														value
													)}
												</TableCell>
											);
										})}
										<TableCell
											key='num_orders'
											align='center'
											style={{
												padding: predicting && 6,
												minWidth: 100
											}}>
											{!predicting ? predictions.length !== 0 ? (
												predictions[i]
											) : (
												""
											) : (
												<Loader />
											)}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[ 10, 25, 100 ]}
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default ManualPredictionTable;
