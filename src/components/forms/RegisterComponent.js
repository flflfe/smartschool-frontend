import React, { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import Axios from "axios";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = createUseStyles((theme) => ({
	registerform: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		height: "100vh",
		width: "100vw",
		padding: "auto 2em auto 2em",
		overflow: "hidden",
	},

	wrapper: {
		maxWidth: "28em",
		width: "100%",
		height: "90vh",
		margin: "1em auto",
		padding: "2rem 2rem",
		border: "none",
		outline: "none",
		borderRadius: "0.25rem",
		color: "#ffffff",
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
		marginTop: "4em",
	},
	inputcontrol: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: "1.25rem",
	},
	datepicker__container: {
		alignItems: "start",

		display: "flex",
		width: "8em",
	},

	classSelectorBDiv: {
		padding: "0.5em 1em 0.5em 1rem",
		marginBottom: "1em",
		marginLeft: "0.5em",
		border: "none",
		outline: "none",
		borderRadius: "0 2rem 2rem 0",
		width: "60%",

		background: `${theme.color.colorWhite}`,

		textTransform: "capitalize",
		textRendering: "optimizeLegibility",
	},
	dobpicker: {
		padding: "0.65rem 2rem",
		marginBottom: "1em",
		border: "none",
		outline: "none",
		borderRadius: "2rem 0 0 2rem",
		width: "40%",

		background: `${theme.color.colorWhite}`,

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
		borderRadius: "2rem",
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
		padding: "0.65rem 1.25rem",
		border: "none",
		outline: "none",
		borderRadius: "2rem",
		color: `${theme.color.colorWhite}`,
		background: `${theme.color.colorOrange}`,

		textTransform: "capitalize",
		textRendering: "optimizeLegibility",
	},

	errorbox: {
		color: `${theme.color.colorRed}`,
		padding: "0rem 1rem",
		cursor: "pointer",
		textAlign: "center",
	},
	rowmahaal: {
		display: "flex",
		flexDirection: "row",
		padding: "2px",
		width: "100%",
	},
}));

const RegisterComponent = () => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [dob, setDob] = useState(new Date());
	const [classroom, setClassroom] = useState("");
	const [password, setPassword] = useState("");
	const [passwordcheck, setPasswordCheck] = useState("");
	const [error, setError] = useState("");

	const data = {
		Name: name,
		Email: email,
		Password: password,
		DOB: dob,
		classroom: classroom,
		role: "role.student",
	};
	console.log(data);
	const [classroomList, setClassRoomList] = useState([
		{ name: "60d46b768a26b8afcf85758c" },
		{ name: "test1" },
		{ name: "test2" },
		{ name: "test3" },
	]);

	const submitForm = () => {
		if (email === "" || password === "" || dob === "") {
			setError("Fields are required");
			return;
		} else if (password !== passwordcheck) {
			setError("Passwords do not match");
		} else {
			Axios({
				method: "post",
				url: "https://localhost:4000/signup",
				data: data,
				headers: { "Content-Type": "application/json" },
			}).then(
				(res) => {
					console.log(res);
					if (res.data?.token) {
						window.localStorage.setItem("token", res.data?.token);
					}
				},
				(err) => {
					console.log(err);
					// setError(err.response.error);
				}
			);
		}
	};

	return (
		<div className={classes.registerform}>
			<section className={classes.wrapper}>
				<div className={classes.heading}>
					<h1>Register</h1>
				</div>
				<form name="login" className={classes.form}>
					<div className={classes.inputcontrol}>
						<label htmlFor="name" className={classes.inputlabel} hidden>
							Full Name
						</label>
						<input
							type="name"
							name="name"
							className={classes.inputfield}
							placeholder="Full Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoComplete="off"
						/>
					</div>
					<div className={classes.inputcontrol}>
						<label htmlFor="email" className={classes.inputlabel} hidden>
							Email Address
						</label>
						<input
							type="email"
							name="email"
							className={classes.inputfield}
							placeholder="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="off"
						/>
					</div>
					<div className={classes.rowmahaal}>
						<div className={classes.dobpicker}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									className={classes.datepicker__container}
									value={dob}
									label="Date of Birth"
									onChange={setDob}
									disableFuture
									variant="dialog"
									format="MM/dd/yyyy"
									initialFocusedDate
									openTo="year"
									inputVariant="standard"
								/>
							</MuiPickersUtilsProvider>
						</div>

						<div className={classes.classSelectorBDiv}>
							<Autocomplete
								id="combo-box-demo"
								className={classes.classSelector}
								onInputChange={(event, value) => console.log(value)}
								options={classroomList}
								getOptionLabel={(option) => option.name}
								fullWidth
								value={classroom}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Select Classroom"
										variant="standard"
										value={classroom}
									/>
								)}
							/>
						</div>
					</div>
					<div className={classes.inputcontrol}>
						<label
							htmlFor="password"
							className={classes.inputlabel}
							hidden>
							Password
						</label>
						<input
							type="password"
							name="password"
							className={classes.inputfield}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className={classes.inputcontrol}>
						<label
							htmlFor="repassword"
							className={classes.inputlabel}
							hidden>
							Password
						</label>
						<input
							type="password"
							name="password"
							className={classes.inputfield}
							placeholder="Re-enter your Password"
							value={passwordcheck}
							onChange={(e) => setPasswordCheck(e.target.value)}
						/>
					</div>
					<div className={classes.inputcontrol}>
						<input
							type="button"
							name="submit"
							className={classes.inputsubmit}
							defaultValue="Register"
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

export default RegisterComponent;
