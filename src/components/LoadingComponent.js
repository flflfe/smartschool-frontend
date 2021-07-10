import React from "react";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
	container: {
		display: "flex",

		height: "auto",
		width: "100vw",
		position: "relative",
	},
	loader: {
		fontSize: "2.5em",
		position: "absolute",
		top: "50%",
		left: "50%",
		margin: "-2em 0 0 -2em",
		color: `${theme.color.colorWhite}`,
	},
}));

const LoadingComponent = () => {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div className={classes.container}>
			<p className={classes.loader}>Loading...</p>
		</div>
	);
};

export default LoadingComponent;
