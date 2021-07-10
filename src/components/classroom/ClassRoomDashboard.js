import React from "react";
import SubjectCardListComponent from "../subject/SubjectCardListComponent";

import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
		height: "100%",
		width: "100vw",

		paddingLeft: "2em",
	},
	header: {
		display: "flex",
		padding: "0rem 1.25rem",
		margin: "5rem 0px 30px 2rem",
	},
	headerText: {
		flex: 1,
		marginLeft: "35px",
	},
}));

const ClassRoomDashboard = ({ match }) => {
	const classroomID = match.params.classid;
	console.log(classroomID);
	const theme = useTheme();
	const classes = useStyles(theme);

	return (
		<div className={classes.container}>
			<SubjectCardListComponent classroomID={classroomID} />
		</div>
	);
};

export default ClassRoomDashboard;
