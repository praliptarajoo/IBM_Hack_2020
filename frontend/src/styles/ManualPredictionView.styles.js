import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	paper: {
		marginTop: 8,
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center"
	},
	buttons: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "10vh"
	},
	button: {
		margin: "8px"
	}
}));

export default useStyles;
