import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Button
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getSelectedItems } from "../../actions/inventory";

const columns = [
	{ id: "meal_id", label: "Meal Id" },
	{ id: "category", label: "Category" },
	{ id: "cuisine", label: "Cuisine" },
	{ id: "items", label: "Inventory Details" }
];

const useStyles = makeStyles({
	paper: {
		width: "100%",
		marginTop: 8
	},
	container: {
		maxHeight: 1000
	}
});

export default function MealTable({ meals }) {
	const classes = useStyles();
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(10);

	const rows = meals;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const dispatch = useDispatch();

	return (
		<Paper className={classes.paper}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align='center'
									style={{
										minWidth: 100
									}}>
									{column.label}
								</TableCell>
							))}
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
											const cell =
												column.id === "items" ? (
													<TableCell
														key={column.id}
														align='center'
														style={{
															minHeight: 100
														}}>
														<Button
															variant='outlined'
															color='primary'
															onClick={() =>
																dispatch(
																	getSelectedItems(row.meal_id)
																)}>
															view inventory
														</Button>
													</TableCell>
												) : (
													<TableCell
														key={column.id}
														align='center'
														style={{
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
											return cell;
										})}
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
}
