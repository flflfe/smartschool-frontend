import React from "react";
import SubjectCardListComponent from "../subject/SubjectCardListComponent";
import Navbar from "../Navbar";

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

const TeacherDashboard = () => {
	const theme = useTheme();
	const classes = useStyles(theme);

	return (
		<div className={classes.container}>
			<Navbar title={"Subjects"} />
			<div className={classes.dashboardwrapper}>
				<SubjectCardListComponent />
			</div>
		</div>
	);
};

export default TeacherDashboard;
