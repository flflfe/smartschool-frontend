import React from "react";
import LoginComponent from "../components/forms/LoginComponent";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
	container: {
		display: "flex",
	},

	headerTextPart: {
		width: "65vw",
		padding: "35vh 5em",

		height: "100vh",
		justifyContent: "center",
	},
	h1: {
		fontSize: "3.5em",
		fontWeight: "700",
		lineHeight: "1em",
	},
	h2: {
		fontSize: "2em",
		fontWeight: "200",
	},
	login: {
		width: "100%",
		height: "100%",
	},
}));

const HomeComponent = () => {
	const theme = useTheme();
	const classes = useStyles(theme);

	return (
		<div className={classes.container}>
			<div className={classes.headerTextPart}>
				<h2 className={classes.h2}>This is a </h2>
				<br />
				<h1 className={classes.h1}>Smart School Project</h1>
			</div>

			<div className="login">
				<LoginComponent />
			</div>
		</div>
	);
};

export default HomeComponent;
