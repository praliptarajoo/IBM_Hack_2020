import { makeStyles } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex"
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth
	},
	toolbar: {
		display: "flex",
		justifyContent: "space-between"
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerContainer: {
		overflow: "auto",
		width: drawerWidth
	},
	content: {
		width: "100%",
		marginTop: "4rem",
		padding: theme.spacing(3),
		fontSize: "1rem",
		overflow: "0"
	},
	avatar: {
		backgroundColor: deepPurple[500]
	}
}));

export default useStyles;
