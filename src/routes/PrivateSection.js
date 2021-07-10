import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import PrivateRoutes from "./PrivateRoutes";
const useStyles = createUseStyles({});

function PrivateSection() {
	const theme = useTheme();
	const classes = useStyles({ theme });

	return (
		<div className={classes.contentBlock}>
			<PrivateRoutes />
		</div>
	);
}

export default PrivateSection;
