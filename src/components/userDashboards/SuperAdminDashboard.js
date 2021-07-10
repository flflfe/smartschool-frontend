import React from "react";
import Navbar from "../Navbar";
import ClassroomListComponent from "../classroom/ClassroomListComponent";

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
const SuperAdminDashboard = () => {
	const theme = useTheme();
	const classes = useStyles(theme);

	return (
		<div className={classes.container}>
			<div className={classes.dashboardwrapper}>
				<Navbar title={"Classrooms"} />
				<ClassroomListComponent />
			</div>
		</div>
	);
};

export default SuperAdminDashboard;
