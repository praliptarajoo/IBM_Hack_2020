import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 8
	},
	paper: {
		minWidth: "inherit",
		padding: 8
	},
	form: {
		display: "flex",
		justifyContent: "center",
		flexDirection: "column"
	},
	loader: {
		margin: "auto"
	},
	table: {
		margin: "8px auto"
	},
	buttons: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	button: {
		margin: "8px"
	}
}));

export default useStyles;
