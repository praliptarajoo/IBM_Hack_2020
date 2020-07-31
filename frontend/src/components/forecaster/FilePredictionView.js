import React, { useState } from "react";
import { Paper, Button, InputLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import useStyles from "../../styles/FilePredictionView.styles";
import FilePredictionTable from "./FilePredictionTable";
import Loader from "../common/Loader";
import { useSelector } from "react-redux";

import Cookies from "js-cookie";
import axios from "axios";

const FilePredictionView = () => {
	const [ selectedFile, setSelectedFile ] = useState(null);
	const [ data, setData ] = useState([]);
	const [ predictions, setPredictions ] = useState([]);
	const [ predicting, setPredicting ] = useState(false);
	const token = useSelector((state) => state.auth.token);

	const onChangeHandler = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleFileFormClick = async () => {
		setPredicting(true);
		const data = new FormData();
		data.append("file", selectedFile);
		try {
			const config = {
				headers: {
					Content_type: "application/json",
					HTTP_X_REQUESTED_WITH: "XMLHttprequest",
					"X-Requested-With": "XMLHttpRequest",
					Authorization: `Token ${token}`
				}
			};
			const res = await axios.post("/predict/file/", data, config);
			setPredictions(res.data.predictions[0].values);
			setData(res.data.id);
			setPredicting(false);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<form className={classes.form}>
					<div className='form-group files'>
						<InputLabel>Upload Your File </InputLabel>
						<input
							type='file'
							className='form-control'
							multiple=''
							accept='.csv'
							onChange={onChangeHandler}
						/>
					</div>
					{predicting ? (
						<div className={classes.loader}>
							<Loader />
						</div>
					) : (
						<div className={classes.buttons}>
							<ColorButton
								className={classes.button}
								variant='contained'
								color='primary'
								size='large'
								disabled={selectedFile === null || predicting}
								onClick={handleFileFormClick}>
								Predict
							</ColorButton>
							{(predictions.length !== 0 || selectedFile !== null) && (
								<Button
									className={classes.button}
									variant='contained'
									color='secondary'
									size='large'
									onClick={() => {
										setSelectedFile(null);
										setData([]);
										setPredictions([]);
									}}>
									Reset
								</Button>
							)}
						</div>
					)}
				</form>
			</Paper>
			{predictions.length !== 0 && (
				<Paper className={classes.table}>
					<FilePredictionTable data={data} predictions={predictions} />
				</Paper>
			)}
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

export default FilePredictionView;
