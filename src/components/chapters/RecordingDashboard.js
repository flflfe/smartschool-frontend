import React, { useState, useEffect } from "react";

import Axios from "axios";

import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	container: {
		height: "100vh",
		width: "100vw",
		paddingLeft: "2em",
	},
	mainbox: {
		display: "flex",
		flexDirection: "column",
	},

	videotextbox: {
		display: "flex",
		width: "100%",
		position: "relative",

		justifyContent: "space-between",
	},
	videobox: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",

		height: "70vh",
		width: "60vw",
		marginLeft: "2vw",
		marginRight: "2vw",

		border: `1px solid  ${theme.color.colorWhite}`,
		borderRadius: "1rem",

		backgroundColor: `${theme.color.colorOpacityBlack2}`,
		position: "relative",
	},

	textbox: {
		border: `1px solid  ${theme.color.colorWhite}`,
		height: "70vh",
		width: "34vw",
		marginRight: "2vw",
	},
}));
const RecordingDashboard = ({ match }) => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [isLoading, setIsLoading] = useState(true);
	const recordingId = match.params.recordingid;
	const chapterId = match.params.chapterid;
	console.log(chapterId);
	console.log(recordingId);

	const [chapterData, setChapterData] = useState([]);
	const [recordingData, setRecordingData] = useState([]);

	const { name, recordingUrl } = recordingData;
	console.log(name, recordingUrl);

	console.log(chapterData.resourceFiles);
	console.log(recordingData);

	async function fetchRecordingData() {
		try {
			let response = await Axios({
				method: "get",
				url: `http://localhost:4000/recordings/${recordingId}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let data = await response.data;

			console.log(data);

			setRecordingData(data.recording);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	}
	async function fetchChapterData() {
		try {
			let response = await Axios({
				method: "get",
				url: `http://localhost:4000/chapters/${chapterId}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let data = await response.data;

			console.log(data.chapter.resourceFiles);
			console.log(data.chapter);

			setChapterData(data.chapter);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchChapterData();
		fetchRecordingData();
	}, []);

	return <div className={classes.container}>Recording Dashboard</div>;
};

export default RecordingDashboard;
