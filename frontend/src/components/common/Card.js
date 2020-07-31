import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		display: "flex",
		minWidth: 275,
		minHeight: 150,
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center"
	},
	title: {
		fontSize: 14
	}
});

export default function SimpleCard({ title, content }) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color='textSecondary'
					gutterBottom>
					{title.toUpperCase()}
				</Typography>
				<Typography variant='h3' component='h2'>
					{content}
				</Typography>
			</CardContent>
		</Card>
	);
}
