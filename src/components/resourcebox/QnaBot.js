import React, { useState } from "react";
import Axios from "axios";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	container: {
		height: "100%",
		width: "100%",
	},
	mainbox: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: `${theme.color.colorBlack2}`,

		height: "100%",
		width: "100%",
	},
	inputfield: {
		fontFamily: "inherit",
		fontSize: "1rem",
		fontWeight: 400,
		lineHeight: "inherit",
		width: "25em",
		height: "4em",
		padding: "0.75rem 1.25rem",
		border: "none",
		outline: "none",
		borderRadius: "1rem",
		color: `${theme.color.colorDarkGray}`,
		background: `${theme.color.colorLightGray}`,
		textTransform: "unset",
		textRendering: "optimizeLegibility",
		margin: "1em",
		marginRight: "0em",
		flex: 1,
	},
	sendQuestionbox: {
		display: "flex",
		height: "auto",
		width: "100%",
		justifyContent: "center",
		flex: "1",
	},
	askQuestionBtn: {
		fontFamily: "inherit",
		margin: "1em",
		fontSize: "1rem",
		fontWeight: 500,
		lineHeight: "inherit",
		cursor: "pointer",
		width: "5em",
		height: "4em",
		padding: "0.65rem 1.25rem",
		border: "none",
		outline: "none",
		borderRadius: "1rem",
		color: `${theme.color.colorWhite}`,
		background: `${theme.color.colorBlue}`,

		textTransform: "capitalize",
		textRendering: "optimizeLegibility",
	},
	inputsubmit: {
		fontFamily: "inherit",
		margin: "1em",
		fontSize: "1rem",
		fontWeight: 500,
		lineHeight: "inherit",
		cursor: "pointer",
		width: "90%",
		height: "4em",
		padding: "0.65rem 1.25rem",
		border: "none",
		outline: "none",
		borderRadius: "2rem",
		color: `${theme.color.colorWhite}`,
		background: `${theme.color.colorBlue}`,

		textTransform: "capitalize",
		textRendering: "optimizeLegibility",
	},
	questionAnwers: {
		height: "90%",
		overflow: "scroll",
		overflowX: "hidden",
		padding: "1em 1.25em",
		backgroundColor: `${theme.color.colorBlack2}`,
	},
	questionAnwerBox: {
		height: "auto",
		margin: "0.8em 0.8em 0.8em 0.2em",
		padding: "0.5em",
		transition: "all ease 350ms",
		backgroundColor: `${theme.color.colorOpacityBlack2}`,
		borderRadius: "1em",
		border: `1px solid ${theme.color.colorWhite}`,
		"&:hover": {
			transform: "scale(1.03)",
			border: `1px solid ${theme.color.colorBlue}`,
			color: `${theme.color.colorGreen}`,
			cursor: "pointer",
		},
	},
	question: {
		fontSize: "30px",
		fontWeight: "600",
	},
	shortanswer: {
		marginTop: "10px",
	},
	answer: {
		marginTop: "15px",
	},
	spantext: {
		color: `${theme.color.colorBlue}`,
		marginRight: "1em",
	},
}));
const QnaBot = ({ chapterData, recordingId, chapterId }) => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [btndisable, setBtnDisable] = useState(false);
	const { isPublished } = chapterData;

	const [resourcesArray, setResourcesArray] = useState([]);
	const standbyArray = [];
	const [sPublishedData, setsPublishedData] = useState([]);
	const [question, setQuestion] = useState("");
	const [questionAnswerArray, setQuestionAnswerArray] = useState([]);

	console.log(resourcesArray);

	console.log(chapterData.resourceFiles);

	async function createChatBot() {
		setBtnDisable(true);
		chapterData.resourceFiles.map((resource) => {
			standbyArray.push({ name: resource.name, fileUrl: resource.fileUrl });
			setResourcesArray(standbyArray);
		});
		try {
			let response = await Axios({
				method: "post",
				url: `http://localhost:4000/chapters/${chapterId}/createChatBot`,
				data: {
					recordingsId: [recordingId],
					resourcesArray: resourcesArray,
				},
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let data = await response.data;
			setsPublishedData(data);

			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}
	async function askQuestion() {
		try {
			let response = await Axios({
				method: "post",
				url: `http://localhost:4000/chapters/${chapterId}/ask`,
				data: {
					question: question,
				},
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let data = await response.data;

			questionAnswerArray.push({
				question: question,
				answer: data.answer.answers[0].answer,
				shortanswer: data.answer.answers[0].answerSpan.text,
			});
			setQuestion("");

			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className={classes.container}>
			<div className={classes.mainbox}>
				{isPublished === false ? (
					<input
						disabled={btndisable}
						type="button"
						name="train"
						className={classes.inputsubmit}
						defaultValue="Request AI Processing"
						onClick={() => createChatBot()}
					/>
				) : (
					<>
						<div className={classes.questionAnwers}>
							{questionAnswerArray.map((qa, index) => {
								console.log({ qa });
								return (
									<div
										key={index}
										className={classes.questionAnwerBox}>
										<div className={classes.question}>
											{qa.question}
										</div>
										<div className={classes.shortAnswer}>
											<span className={classes.spantext}>
												Answer:
											</span>
											{qa.shortanswer}
										</div>
										<div className={classes.answer}>
											<span className={classes.spantext}>
												Context:
											</span>
											{qa.answer}
										</div>
									</div>
								);
							})}
						</div>

						<div className={classes.sendQuestionbox}>
							<input
								value={question}
								className={classes.inputfield}
								type="text"
								placeholder="Type a question"
								onChange={(e) => setQuestion(e.target.value)}
							/>
							<button
								className={classes.askQuestionBtn}
								onClick={() => askQuestion()}>
								Send
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default QnaBot;
