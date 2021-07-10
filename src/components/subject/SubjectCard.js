import React from "react";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	mainsubjectcard: {
		height: "150px",

		minWidth: "30vw",
		width: "100%",
	},
	subjectcard: {
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

	subjectcarddetails: {
		justifyContent: "center",
		backgroundColor: `${theme.color.colorOpacityBlack2}`,
		width: "100%",
		height: "100%",

		borderRadius: "1em",
		padding: "1em 1em",
	},
	subjectName: {
		fontSize: "1.5rem",
		fontWeight: "600",
		lineHeight: "1.5em",
	},
	subjectDesc: {
		fontSize: "1.2rem",
		marginTop: "0.3rem",
		fontWeight: "400",
	},
}));

const SubjectCard = ({ name, teachers, onClickHandler }) => {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div>
			<div className={classes.mainsubjectcard} onClick={onClickHandler}>
				<div className={classes.subjectcard}>
					<div className={classes.subjectcarddetails}>
						<h1 className={classes.subjectName}>{name}</h1>
						<div className={classes.subjectDesc}>
							{teachers?.map((teacher) => (
								<div>{teacher?.Name}</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SubjectCard;
