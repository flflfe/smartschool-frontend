import React from "react";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	container: {
		height: "100%",
		width: "100%",
	},
	mainbox: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: `${theme.color.colorBlack3}`,
	},

	resourceBox: {
		width: "100%",
		height: "100%",

		paddingLeft: "1em",
		paddingTop: "1em",
		backgroundColor: `${theme.color.colorOpacityBlack2}`,
	},
	resourceName: {
		color: `${theme.color.colorWhite}`,
		"&:hover": {
			color: `${theme.color.colorGreen}`,
			cursor: "pointer",
		},
	},
	// authorName: {
	// 	color: `${theme.color.colorOpacityBlack2}`,
	// 	fontSize: "20px",
	// },
}));

const Resources = ({ resourceFiles }) => {
	const theme = useTheme();
	const classes = useStyles(theme);

	const handleClickResource = (url) => {
		const newWindow = window.open(url, "_blank", "noopener,noreferrer");
		if (newWindow) newWindow.opener = null;
	};
	return (
		<div className={classes.container}>
			{console.log(resourceFiles)}
			<div className={classes.resourceBox}>
				{resourceFiles?.map((resource) => (
					<div className={classes.resource}>
						<div
							className={classes.resourceName}
							onClick={() => handleClickResource(resource.fileUrl)}>
							{resource.name}
						</div>
						{/* <div className={classes.authorName}>
							By: {resource.author.Name}
						</div> */}
					</div>
				))}
			</div>
		</div>
	);
};

export default Resources;
