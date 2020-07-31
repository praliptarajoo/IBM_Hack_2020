import React, { useState } from "react";
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Box,
	Typography,
	Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import useStyles from "../../styles/Login.styles";

const Copyright = () => {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{"Copyright © "}
			<Link color='inherit' href='https://material-ui.com/'>
				TriTech
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
};

const Login = () => {
	const classes = useStyles();

	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(login(username, password));
	};

	if (isAuthenticated) return <Redirect to='/' />;

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						id='username'
						label='Username'
						name='username'
						autoComplete='username'
						autoFocus
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
					/>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						size='large'
						className={classes.submit}>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href='#' variant='body2'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default Login;
