import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 8
	},
	form: {
		display: "flex",
		justifyContent: "space-evenly",
		width: "100%",
		alignItems: "center"
	},
	paper: {
		minWidth: "inherit",
		padding: 8,
		display: "flex",
		alignItems: "center"
	}
}));

export default useStyles;
