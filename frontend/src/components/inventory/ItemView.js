import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Button, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ItemTable from "./ItemTable";
import { getItems, updateItem } from "../../actions/inventory";
import { makeStyles } from "@material-ui/core/styles";

const ItemView = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getItems);
	}, []);
	const selectedItems = useSelector((state) => state.inventory.selectedItems);
	const items = useSelector((state) => state.inventory.items);
	const currentMealId = useSelector((state) => state.inventory.currentMealId);
	const [ newItem, setNewItem ] = useState(null);

	const handleSubmit = () => {
		dispatch(updateItem(currentMealId, newItem));
	};

	const useStyles = makeStyles((theme) => ({
		form: {
			display: "flex",
			justifyContent: "space-evenly",
			width: "30%"
		},
		paper: {
			minWidth: "inherit",
			padding: 8,
			display: "flex",
			justifyContent: "start",
			alignItems: "center"
		}
	}));

	const classes = useStyles();

	return (
		<div>
			<Paper className={classes.paper}>
				<form onSubmit={handleSubmit} className={classes.form}>
					<Autocomplete
						id='add-item'
						options={items}
						groupBy={(option) => option.category}
						getOptionLabel={(item) => item.name}
						style={{ width: 300 }}
						value={newItem}
						onChange={(event, newValue) => {
							setNewItem(newValue);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Enter Item Name'
								variant='outlined'
							/>
						)}
					/>
					<Button
						variant='contained'
						color='primary'
						type='submit'
						size='large'>
						Add Item
					</Button>
				</form>
			</Paper>
			<ItemTable items={selectedItems} />
		</div>
	);
};

export default ItemView;
