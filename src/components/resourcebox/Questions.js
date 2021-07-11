import React, { useState, useEffect } from "react";
import Axios from "axios";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	container: {
		height: "100%",
		width: "100%",
	},
	actionbox: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: `${theme.color.colorBlack3}`,
		width: "100%",
		height: "100%",
		padding: "1em",
	},
}));

const Questions = ({ recordingId }) => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [questions, setQuestions] = useState([]);
	async function fetchQuestions() {
		try {
			let response = await Axios({
				method: "get",
				url: `http://localhost:4000/recordings/${recordingId}/get/questions`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let data = await response.data.recording.questions;
			setQuestions(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchQuestions();
	}, []);
	return (
		<div className={classes.container}>
			<div className={classes.questionbox}>
				{questions?.map((question) => (
					<p>{question.text}</p>
				))}
			</div>
		</div>
	);
};

export default Questions;
