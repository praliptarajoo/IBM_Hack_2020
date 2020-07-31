import React, { useEffect } from "react";
import {
	HashRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./auth/Login";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import PrivateRoute from "./auth/PrivateRoute";

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<PrivateRoute exact path='/' component={Dashboard} />
					<Route exact path='/login' render={() => <Login />} />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
