import React from "react";

import { createUseStyles, useTheme } from "react-jss";
import { useHistory } from "react-router";

const useStyles = createUseStyles((theme) => ({
	profilewrapper: {
		display: "flex",
		flexDirection: "column",
		position: "relative",

		width: "100%",
		height: "100%",
		justifyContent: "center",
	},

	large: {
		marginLeft: "30px",
		fontSize: "2em",
		marginBottom: "1em",
		flex: 1,
	},

	medium: {
		marginLeft: "30px",
		flex: 1,
		marginBottom: "0.2em",

		fontSize: "1em",
	},
	userinfo: {
		padding: "0.5em",
	},
	superAdminTag: {
		position: "absolute",
		top: "-2.2em",
		right: "16em",
		borderRadius: "1rem 1rem 0 0",
		border: "none",

		background: `${theme.color.colorGold}`,
		color: `${theme.color.colorWhite}`,

		padding: "0.2em 2em 0.2em 2em",
	},
	teacherTag: {
		position: "absolute",
		top: "-2.2em",
		right: "16em",
		borderRadius: "1rem 1rem 0 0",
		border: "none",

		background: `${theme.color.colorGreen}`,
		color: `${theme.color.colorWhite}`,
		padding: "0.2em 2em 0.2em 2em",
	},
	studentTag: {
		position: "absolute",

		top: "-2.2em",
		right: "16em",
		borderRadius: "1rem 1rem 0 0",
		border: "none",

		background: `${theme.color.colorBlue}`,
		color: `${theme.color.colorWhite}`,
		padding: "0.2em 2em 0.2em 2em",
	},
	logoutbtn: {
		width: "10em",
		border: "none",

		background: `${theme.color.colorRed}`,
		color: `${theme.color.colorWhite}`,
		marginTop: "auto",
		marginBottom: "auto",
	},
	nameandbtn: {
		display: "flex",
		alignItems: "center",
	},
	createUser: {
		border: "none",
		outline: "none",
		cursor: "pointer",
		background: `${theme.color.colorGreen}`,
		color: `${theme.color.colorWhite}`,
	},
	buttonsgroup: {
		display: "flex",
		flexDirection: "column",
	},
}));

const UserProfile = ({
	id,
	name,
	email,
	DOB,
	classroom,
	createdAt,
	updatedAt,
	role,
}) => {
	const history = useHistory();
	const theme = useTheme();
	const classes = useStyles(theme);
	const handleLogout = () => {
		localStorage.removeItem("token");
		history.push("/home");
	};

	const registerStudentHandler = () => {
		history.push("/register");
	};

	return (
		<div className={classes.container}>
			<div className={classes.userinfo}>
				{role === "role.superAdmin" ? (
					<div className={classes.superAdminTag}>Super Admin</div>
				) : role === "role.teacher" ? (
					<div className={classes.teacherTag}> Teacher</div>
				) : role === "role.student" ? (
					<div className={classes.studentTag}>Student</div>
				) : null}

				<div className={classes.info}>
					<div className={classes.nameandbtn}>
						<div className={classes.large}>{name}</div>
						<div className={classes.buttonsgroup}>
							<button
								className={classes.logoutbtn}
								type="button"
								onClick={handleLogout}>
								Logout
							</button>

							{role === "role.superAdmin" ? (
								<input
									type="button"
									name="submit"
									className={classes.createUser}
									defaultValue="Create User"
									onClick={registerStudentHandler}
								/>
							) : null}
						</div>
					</div>
				</div>
				<div className={classes.medium}>User ID: {id}</div>
				<div className={classes.medium}>Email: {email}</div>
				<div className={classes.medium}>Role: {role}</div>
				<div className={classes.medium}>Date of Birth: {DOB}</div>
				<div className={classes.medium}> Classroom ID: {classroom}</div>
				<div className={classes.medium}>
					Profile Created at: {createdAt}
				</div>
				<div className={classes.medium}>
					Profile Last Updated:{updatedAt}
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
