import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const auth = useSelector((state) => state.auth);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (auth.isLoading) {
					return (
						<p
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100vh"
							}}>
							Loading...
						</p>
					);
				} else if (auth.isAuthenticated === false) {
					return <Redirect to='/login' />;
				} else {
					return <Component {...props} />;
				}
			}}
		/>
	);
};
export default PrivateRoute;
