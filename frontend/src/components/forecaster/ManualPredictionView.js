import React, { useState } from "react";
import { Button, Paper } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

import PredictionForm from "./PredictionForm";
import ManualPredictionTable from "./ManualPredictionTable";
import useStyles from "../../styles/ManualPredictionView.styles";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";

const ManualPredictionView = () => {
	const [ data, setData ] = useState([]);
	const [ predictions, setPredictions ] = useState([]);
	const [ predicting, setPredicting ] = useState(false);
	const token = useSelector((state) => state.auth.token);

	const classes = useStyles();

	const handleManualFormClick = async () => {
		setPredicting(true);
		console.log(data);
		try {
			const config = {
				headers: {
					Content_type: "application/json",
					HTTP_X_REQUESTED_WITH: "XMLHttprequest",
					"X-Requested-With": "XMLHttpRequest",
					Authorization: `Token ${token}`
				}
			};
			const res = await axios.post("/predict/manual/", data, config);
			setPredicting(false);
			console.log(res.data.predictions[0].values);
			setPredictions(res.data.predictions[0].values);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<PredictionForm data={data} setData={setData} />
			<Paper className={classes.paper}>
				<ManualPredictionTable
					data={data}
					predictions={predictions}
					predicting={predicting}
				/>
			</Paper>
			<div className={classes.buttons}>
				<ColorButton
					className={classes.button}
					variant='contained'
					color='primary'
					size='large'
					onClick={handleManualFormClick}
					disabled={data.length === 0 || predicting}>
					Predict
				</ColorButton>
				{(predictions.length !== 0 || data.length !== 0) && (
					<Button
						className={classes.button}
						variant='contained'
						color='secondary'
						size='large'
						onClick={() => {
							setData([]);
							setPredictions([]);
						}}>
						Reset
					</Button>
				)}
			</div>
		</div>
	);
};

const ColorButton = withStyles((theme) => ({
	root: {
		color: "white",
		backgroundColor: green[500],
		"&:hover": {
			backgroundColor: green[700]
		}
	}
}))(Button);

export default ManualPredictionView;
