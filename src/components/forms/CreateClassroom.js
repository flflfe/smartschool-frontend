import React, { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { useHistory } from "react-router";

import Axios from "axios";

const useStyles = createUseStyles((theme) => ({
	createsubjectform: {
		position: "relative",
		height: "100%",
		width: "100%",
	},
	wrapper: {
		width: "80%",

		position: "absolute",
		top: "40%",
		left: "8%",

		transform: "translate(0, -40%)",
	},
	heading: {
		fontSize: "1.2em",
		paddingLeft: "1rem",
	},
	loginhere: {
		fontSize: "0.7em",
		textAlign: "center",
		padding: "0rem 1rem",
	},
	form: {
		width: "100%",
		height: "auto",
		marginTop: "2rem",
	},
	inputcontrol: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: "1.25rem",
	},

	classSelectorDiv: {
		padding: "0.5em 1em 0.5em 1rem",
		marginBottom: "1em",

		border: "none",
		outline: "none",
		borderRadius: "1rem",
		width: "100%",

		background: `${theme.color.colorWhite}`,
		color: `${theme.color.colorDarkGray}`,

		textTransform: "capitalize",
		textRendering: "optimizeLegibility",
	},

	inputfield: {
		fontFamily: "inherit",
		fontSize: "1rem",
		fontWeight: 400,
		lineHeight: "inherit",
		width: "100%",
		height: "auto",
		padding: "0.75rem 1.25rem",
		border: "none",
		outline: "none",
		borderRadius: "1rem",
		color: `${theme.color.colorDarkGray}`,
		background: `${theme.color.colorLightGray}`,
		textTransform: "unset",
		textRendering: "optimizeLegibility",
	},
	inputsubmit: {
		fontFamily: "inherit",
		fontSize: "1rem",
		fontWeight: 500,
		lineHeight: "inherit",
		cursor: "pointer",
		minWidth: "100%",
		height: "auto",
		padding: "0.75rem 1.25rem",
		border: "none",
		outline: "none",
		borderRadius: "1rem",
		color: `${theme.color.colorWhite}`,
		background: `${theme.color.colorGreen}`,

		textTransform: "capitalize",
		textRendering: "optimizeLegibility",
	},
	loginherebutton: {
		border: "none",
		outline: "none",
		cursor: "pointer",
		background: "none",
		color: `${theme.color.colorBlue}`,
	},

	errorbox: {
		color: `${theme.color.colorRed}`,
		padding: "0rem 1rem",
		cursor: "pointer",
		textAlign: "center",
	},
}));

const CreateClassroom = () => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [name, setName] = useState("");

	const [error, setError] = useState("");

	const data = {
		name: name,
	};
	console.log(data);

	async function submitForm() {
		if (name === "") {
			setError("Classroom Name is Required");
			return;
		} else {
			try {
				let response = await Axios({
					method: "post",
					url: `http://localhost:4000/classrooms`,
					data: data,

					headers: {
						"Content-Type": "application/json",
						Authorization: `${window.localStorage.getItem("token")}`,
					},
				});

				console.log(response);
			} catch (error) {
				console.log(error);
			}
			// Axios({
			// 	method: "post",
			// 	url: `https://localhost:4000//classrooms/${classroomid}/subjects`,
			// 	data: data,
			// 	headers: { "Content-Type": "application/json" },
			// 	Authorization: `${window.localStorage.getItem("token")}`,
			// }).then(
			// 	(res) => {
			// 		console.log(res);
			// 	},
			// 	(err) => {
			// 		console.log(err);
			// 		setError(err.response.error);
			// 	}
			// );
		}
	}

	return (
		<div className={classes.createsubjectform}>
			<section className={classes.wrapper}>
				<div className={classes.heading}>
					<h1>Add Classroom</h1>
				</div>
				<form name="createsubject" className={classes.form}>
					<div className={classes.inputcontrol}>
						<label htmlFor="name" className={classes.inputlabel} hidden>
							Name
						</label>
						<input
							type="name"
							name="name"
							className={classes.inputfield}
							placeholder="Name of Classroom"
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoComplete="off"
						/>
					</div>

					<div className={classes.inputcontrol}>
						<input
							type="button"
							name="submit"
							className={classes.inputsubmit}
							defaultValue="Create Classroom"
							onClick={submitForm}
						/>
					</div>

					<div className={classes.errorbox} onClick={() => setError(null)}>
						{error}
					</div>
				</form>
			</section>
		</div>
	);
};

export default CreateClassroom;
