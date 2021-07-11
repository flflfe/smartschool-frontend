import React from "react";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	container: {
		height: "auto",
		width: "100%",
	},
	mainbox: {
		display: "flex",
		flexDirection: "column",
	},
	header: {
		display: "flex",
		padding: "2em 0 1em 0",
	},
	headerText: {
		flex: 1,
		marginLeft: "2em",
		fontSize: "1.5em",
	},
}));

const ChapterNavBar = ({ title }) => {
	const theme = useTheme();
	const classes = useStyles(theme);

	return (
		<div className={classes.container}>
			<div className={classes.mainbox}>
				<div className={classes.header}>
					<h1 className={classes.headerText}>{title}</h1>
				</div>
			</div>
		</div>
	);
};

export default ChapterNavBar;
