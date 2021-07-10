import React, { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import Axios from "axios";
import { useHistory } from "react-router";

const useStyles = createUseStyles((theme) => ({
	loginform: {
		backgroundColor: `${theme.color.colorOpacityBlack}`,
		height: "100vh",
		width: "40vw",
		padding: "25vh 2em",
	},

	wrapper: {
		maxWidth: "28em",
		width: "100%",
		margin: "2rem auto",
		padding: "2rem 2.5rem",
		border: "none",
		outline: "none",
		borderRadius: "0.25rem",
		color: `${theme.color.colorWhite}`,
	},
	heading: {
		fontSize: "1.2em",
		paddingLeft: "1rem",
	},
	registerhere: {
		fontSize: "0.7em",
		textAlign: "center",
		padding: "0rem 1rem",
	},
	form: {
		width: "100%",
		height: "auto",
		marginTop: "2rem",
	},
	inputcontrol: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: "1.25rem",
	},
	inputfield: {
		fontFamily: "inherit",
		fontSize: "1rem",
		fontWeight: 400,
		lineHeight: "inherit",
		width: "100%",
		height: "auto",
		padding: "0.75rem 1.25rem",
		border: "none",
		outline: "none",
		borderRadius: "2rem",
		color: `${theme.color.colorDarkGray}`,
		background: `${theme.color.colorLightGray}`,
		textTransform: "unset",
		textRendering: "optimizeLegibility",
	},
	inputsubmit: {
		fontFamily: "inherit",
		fontSize: "1rem",
		fontWeight: 500,
		lineHeight: "inherit",
		cursor: "pointer",
		minWidth: "100%",
		height: "auto",
		padding: "0.65rem 1.25rem",
		border: "none",
		outline: "none",
		borderRadius: "2rem",
		color: `${theme.color.colorWhite}`,
		background: `${theme.color.colorBlue}`,

		textTransform: "capitalize",
		textRendering: "optimizeLegibility",
	},
	// registerherebutton: {
	// 	border: "none",
	// 	outline: "none",
	// 	cursor: "pointer",
	// 	background: "none",
	// 	color: `${theme.color.colorOrange}`,
	// },
	errorbox: {
		color: `${theme.color.colorRed}`,
		padding: "0rem 1rem",
		cursor: "pointer",
		textAlign: "center",
	},
}));

const LoginComponent = () => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const history = useHistory();

	// const gotoregisterform = () => {
	// 	history.push("/home/signup");
	// };

	// async function fetchSubjects() {
	// 	let response = await Axios({
	// 		method: "get",
	// 		url: "http://localhost:4000/subjects",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `${window.localStorage.getItem("token")}`,
	// 		},
	// 	});
	// 	let subjectList = await response.data.subjects;
	// 	setSubjectList(subjectList);
	// 	console.log(subjectList);
	// }

	// useEffect(() => {
	// 	fetchSubjects();
	// }, []);

	async function Authenticate() {
		try {
			let response = await Axios({
				method: "post",
				url: "http://localhost:4000/signin/",
				data: { Email: email, Password: password },
				headers: { "Content-Type": "application/json" },
			});
			let token = await response.data?.token;
			if (!!token) {
				window.localStorage.setItem("token", token);
				history.push("/dashboard");
			}
		} catch (error) {
			console.log(error);
			setError("Error Loging In. Check your Email, Password and Try Again");
		}
	}

	const submitForm = (e) => {
		e.preventDefault();
		if (email === "" || password === "") {
			setError("Fields are required");
			return;
		} else {
			Authenticate();
		}
	};
	return (
		<div className={classes.loginform}>
			<section className={classes.wrapper}>
				<div className={classes.heading}>
					<h1>Login</h1>
				</div>
				<form name="login" className={classes.form}>
					<div className={classes.inputcontrol}>
						<label htmlFor="email" className={classes.inputlabel} hidden>
							Email Address
						</label>
						<input
							type="email"
							name="email"
							className={classes.inputfield}
							placeholder="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="off"
						/>
					</div>
					<div className={classes.inputcontrol}>
						<label
							htmlFor="password"
							className={classes.inputlabel}
							hidden>
							Password
						</label>
						<input
							type="password"
							name="password"
							className={classes.inputfield}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="off"
						/>
					</div>
					<div className={classes.inputcontrol}>
						<input
							type="button"
							name="submit"
							className={classes.inputsubmit}
							defaultValue="Login"
							onClick={submitForm}
						/>
					</div>
					{/* <p className={classes.registerhere}>
						If you haven't yet Registered,
						<input
							type="button"
							name="submit"
							className={classes.registerherebutton}
							defaultValue="Register Here"
							onClick={gotoregisterform}
						/>
					</p> */}
					<div className={classes.errorbox} onClick={() => setError(null)}>
						{error}
					</div>
				</form>
			</section>
		</div>
	);
};

export default LoginComponent;
