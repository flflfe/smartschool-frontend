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
		lineHeight: "1.5em",
	},
	h2: {
		fontSize: "2em",
		fontWeight: "200",
	},
	h3: {
		fontSize: "2em",
		fontWeight: "200",
	},
	login: {
		width: "100%",
		height: "100%",
	},
	italicstext: {
		color: `${theme.color.colorBlue}`,
	},
}));

const HomeComponent = () => {
	const theme = useTheme();
	const classes = useStyles(theme);

	return (
		<div className={classes.container}>
			<div className={classes.headerTextPart}>
				<h2 className={classes.h2}>This is </h2>

				<h1 className={classes.h1}>Kavya Classrooms</h1>
				<h3 className={classes.h3}>
					For <i className={classes.italicstext}>Students</i> of the
					<i className={classes.italicstext}>Future</i>
				</h3>
			</div>

			<div className="login">
				<LoginComponent />
			</div>
		</div>
	);
};

export default HomeComponent;
