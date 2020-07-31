import React, { useState } from "react";
import {
	Drawer,
	CssBaseline,
	AppBar,
	Toolbar,
	List,
	Typography,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	IconButton,
	Menu,
	MenuItem,
	Divider
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import DashboardIcon from "@material-ui/icons/Dashboard";

import Overview from "./Overview";
import PredictionTab from "./forecaster/PredictionTab";
import Inventory from "./inventory/Inventory";

import { logout } from "../actions/auth";
import { toggleState } from "../actions/inventory";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "../styles/Dashboard.styles";

const views = {
	overview: {
		name: "overview",
		label: "OVERVIEW",
		component: Overview,
		icon: DashboardIcon
	},
	predict: {
		name: "predict",
		label: "DEMAND FORECASTER",
		component: PredictionTab,
		icon: EqualizerIcon
	},
	inventory: {
		name: "inventory",
		label: "INVENTORY",
		component: Inventory,
		icon: FastfoodIcon
	}
};

const Dashboard = () => {
	const [ state, setState ] = useState("overview");
	const [ anchorEl, setAnchorEl ] = useState(null);
	const open = Boolean(anchorEl);
	const user = useSelector((state) => state.auth.user);

	const dispatch = useDispatch();
	const classes = useStyles();

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const currentView = views[state];

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position='fixed' color='inherit' className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography variant='h6' noWrap>
						{currentView.label}
					</Typography>
					<div>
						<IconButton
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleMenu}
							color='inherit'>
							<AccountCircle style={{ fontSize: "1.8rem" }} />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							open={open}
							onClose={handleClose}>
							<MenuItem>{user && user.username}</MenuItem>
							<Divider />
							<MenuItem onClick={() => dispatch(logout())}>
								Logout
							</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant='permanent'
				classes={{
					paper: classes.drawerPaper
				}}>
				<Toolbar>
					<Typography variant='h5' noWrap>
						Warehouse Manager
					</Typography>
				</Toolbar>
				<div className={classes.drawerContainer}>
					<List>
						{Object.keys(views).map((key) => {
							const view = views[key];
							return (
								<ListItem
									key={key}
									button
									style={{
										backgroundColor:
											currentView.name === view.name &&
											"rgba(0,0,0,0.1)"
									}}
									onClick={() => {
										setState(view.name);
										dispatch(toggleState("meal"));
									}}>
									<ListItemAvatar>
										<Avatar className={classes.avatar}>
											<view.icon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={view.label} />
								</ListItem>
							);
						})}
					</List>
				</div>
			</Drawer>
			<main className={classes.content}>
				<currentView.component />
			</main>
		</div>
	);
};

export default Dashboard;
