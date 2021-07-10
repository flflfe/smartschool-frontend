import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import SubjectCardListComponent from "./SubjectCardListComponent";
const useStyles = createUseStyles((theme) => ({
	container: {
		height: "100vh",
		width: "100vw",
		paddingLeft: "2em",
	},
	mainbox: {
		display: "flex",
		flexDirection: "column",
	},
	header: {
		display: "flex",
		padding: "5em 0 1em 0",
	},
	headerText: {
		flex: 1,
		marginLeft: "1em",
		fontSize: "1.5em",
	},
}));
const SubjectDashboard = ({ match }) => {
	const theme = useTheme();
	const classes = useStyles(theme);

	const classroomID = match.params.classid;
	console.log(classroomID);

	return (
		<div className={classes.container}>
			<div className={classes.mainbox}>
				<SubjectCardListComponent />
			</div>
		</div>
	);
};

export default SubjectDashboard;
