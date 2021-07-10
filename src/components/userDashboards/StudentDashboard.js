import React from "react";
import Navbar from "../Navbar";
import SubjectCardListComponent from "../subject/SubjectCardListComponent";

import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	container: {
		display: "flex",

		minHeight: "100vh",
		height: "auto",
		position: "relative",
		paddingLeft: "2em",
	},
	dashboardwrapper: {
		justifyContent: "center",
		width: "100%",
		height: "100vh",
	},
}));

const StudentDashboard = () => {
	const theme = useTheme();
	const classes = useStyles(theme);

	return (
		<div className={classes.container}>
			<Navbar title={"List of Subjects"} />
			<div className={classes.dashboardwrapper}>
				<SubjectCardListComponent />
			</div>
		</div>
	);
};

export default StudentDashboard;
