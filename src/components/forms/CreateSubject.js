import React, { useState, useEffect } from "react";
import { createUseStyles, useTheme } from "react-jss";

import Axios from "axios";

import { TextField } from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

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
		padding: "0.5em 1em 0.7em 1rem",
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
	loadingteacherdiv: {
		color: `${theme.color.colorGreen}`,
	},
}));

const CreateSubject = ({ classroomID }) => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [teacher, setTeacher] = useState([]);
	const [subjectName, setSubjectName] = useState("");
	const [gotTeachers, setGotTeachers] = useState(false);

	const [error, setError] = useState("");
	const [teachersList, setTeachersList] = useState([]);
	// const [teachersList, setTeachersList] = useState([
	// 	{ name: "Ram", id: "smthn" },
	// 	{ name: "Shyam", id: "smthn" },
	// 	{ name: "Hari", id: "smthn" },
	// 	{ name: "Shiva", id: "smthn" },
	// ]);

	// console.log(classroomID);
	async function fetchTeachersList() {
		try {
			let response = await Axios({
				method: "GET",
				url: `http://localhost:4000/teachers`,

				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let responseData = await response.data.teacher;
			console.log(responseData);
			setTeachersList(responseData);
			setGotTeachers(true);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchTeachersList();
	}, []);
	// const data = {
	// 	name: subjectName,
	// 	teachers: teacher._id,
	// };

	async function submitForm() {
		if (subjectName === "") {
			setError("Subject Name is Required");
			return;
		} else if ((teacher[0] = undefined)) {
			setError("Please Select Teacher");
		} else {
			try {
				let response = await Axios({
					method: "POST",
					url: `http://localhost:4000/classrooms/${classroomID}/subjects`,
					data: {
						name: subjectName,
						teachers: teacher._id,
					},
					headers: {
						"Content-Type": "application/json",

						Authorization: `${window.localStorage.getItem("token")}`,
					},
				});
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<div className={classes.createsubjectform}>
			<section className={classes.wrapper}>
				<div className={classes.heading}>
					<h1>Add Subject</h1>
				</div>
				<form name="login" className={classes.form}>
					<div className={classes.inputcontrol}>
						<label htmlFor="name" className={classes.inputlabel} hidden>
							Name
						</label>
						<input
							type="name"
							name="name"
							className={classes.inputfield}
							placeholder="Name of the Subject"
							value={subjectName}
							onChange={(e) => setSubjectName(e.target.value)}
							autoComplete="off"
						/>
					</div>
					{/* setTeacher(event.target.value) */}
					<div className={classes.classSelectorDiv}>
						{gotTeachers ? (
							<Autocomplete
								className={classes.classSelector}
								value={teacher.Name}
								onChange={(event, value) => {
									setTeacher(value);

									console.log(value);
								}}
								// onChange={(event, value) => console.log(teacher)}
								options={teachersList}
								getOptionLabel={(option) => option.Name}
								fullWidth
								autoSelect
								renderInput={(params) => (
									<TextField
										{...params}
										label="Select Teacher"
										variant="standard"
										value={(option) => option.Name}
									/>
								)}
							/>
						) : (
							<div className={classes.loadingteacherdiv}>
								Fetching Teachers...
							</div>
						)}
						{/* <Autocomplete
							className={classes.classSelector}
							value={teacher}
							onInputChange={(event, value) => setTeacher(value)}
							options={teachersList}
							getOptionLabel={(option) => option.name}
							fullWidth
							renderInput={(params) => (
								<TextField
									{...params}
									label="Select Teacher"
									variant="standard"
									value={(option) => option.name}
								/>
							)}
						/> */}
					</div>
					<div className={classes.inputcontrol}>
						<input
							type="button"
							name="submit"
							className={classes.inputsubmit}
							defaultValue="Create Subject"
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

export default CreateSubject;
