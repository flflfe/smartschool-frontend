import React from "react";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
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

const HeaderComponent = ({ children }) => {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div className={classes.header}>
			<h1 className={classes.headerText}>Here are the Classrooms</h1>
			{children}
		</div>
	);
};

export default HeaderComponent;
