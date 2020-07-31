import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
	root: {
		flexGrow: 1
	}
});

export default function CenteredTabs({ setState }) {
	const classes = useStyles();
	const [ value, setValue ] = useState(0);

	const handleChange = (event, newValue) => {
		if (newValue !== value) {
			setValue(newValue);
			const newState = value !== 0 ? "manual" : "file";
			setState(newState);
		}
	};

	return (
		<Paper className={classes.root}>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor='primary'
				textColor='primary'
				variant='fullWidth'
				centered>
				<Tab label='Manual Data Predict' />
				<Tab label='Predict using File' />
			</Tabs>
		</Paper>
	);
}
