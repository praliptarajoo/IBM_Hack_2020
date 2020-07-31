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
	TableRow
} from "@material-ui/core";

const columns = [
	{ id: "id", label: "ID" },
	{ id: "name", label: "Name" },
	{ id: "category", label: "Category" },
	{ id: "system_stock", label: "System Stock" },
	{ id: "actual_stock", label: "Actual Stock" }
];

const stockStatus = {
	inStock: {
		color: "#28af45",
		text: "In Stock"
	},
	lowStock: {
		color: "#ffc107",
		text: "Low in Stock"
	},
	outOfStock: {
		color: "#dc3545",
		text: "Out Of Stock"
	}
};

const useStyles = makeStyles({
	paper: {
		width: "100%",
		marginTop: 8
	},
	container: {
		maxHeight: 400
	}
});

export default function MealTable({ items }) {
	const classes = useStyles();
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(10);

	const rows = items;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

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
							<TableCell key='status' align='center'>
								Status
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
								const getStatus = () => {
									if (row.actual_stock > 0.5 * row.system_stock)
										return "inStock";
									else if (row.actual_stock == 0) return "outOfStock";
									else return "lowStock";
								};
								const status = getStatus();
								return (
									<TableRow
										hover
										role='checkbox'
										tabIndex={-1}
										key={i}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align='center'>
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
											key='status'
											align='center'
											style={{ color: stockStatus[status].color }}>
											{stockStatus[status].text}
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
}
