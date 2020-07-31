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

const useStyles = makeStyles({
	root: {
		width: "100%"
	},
	container: {
		maxHeight: 400
	}
});

export default function FilePredictionTable({ data, predictions }) {
	const classes = useStyles();
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(10);

	const rows = data;
	console.log(rows);
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
							<TableCell
								key='id'
								align='center'
								style={{
									minWidth: 100
								}}>
								ID
							</TableCell>
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
										<TableCell key='id' align='center'>
											{row}
										</TableCell>
										<TableCell key='num_orders' align='center'>
											{predictions[i]}
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
