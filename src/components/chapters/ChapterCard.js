import React from "react";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	mainclassroomcard: {
		height: "auto",

		minWidth: "25vw",
		width: "auto",
	},
	classroomcard: {
		display: "flex",

		borderRadius: "1em",
		height: "100%",
		width: "100%",
		overflow: "none",

		cursor: "pointer",
		transition: "all ease 350ms",
		border: `1px solid ${theme.color.colorWhite}`,
		"&:hover": {
			transform: "scale(1.03)",
			border: `1px solid ${theme.color.colorBlue}`,
		},
	},

	classroomcarddetails: {
		justifyContent: "center",
		backgroundColor: `${theme.color.colorOpacityBlack2}`,
		width: "100%",
		height: "100%",
		color: `${theme.color.colorWhite}`,
		borderRadius: "1em",
		padding: "1em 1em",
	},
	classroomName: {
		fontSize: "1.5rem",
		fontWeight: "600",
		lineHeight: "1em",
	},
	classroomDesc: {
		fontSize: "1.2rem",
		marginTop: "0.3rem",
		fontWeight: "400",
	},
}));

const ChapterCard = ({ name, onClickHandler, teachers }) => {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div className={classes.mainclassroomcard}>
			<div className={classes.classroomcard} onClick={onClickHandler}>
				<div className={classes.classroomcarddetails}>
					<h1 className={classes.classroomName}>{name}</h1>
					<h1 className={classes.classroomDesc}>
						{teachers?.map((teacher) => (
							<div>{teacher.name}</div>
						))}
					</h1>
				</div>
			</div>
		</div>
	);
};

export default ChapterCard;
