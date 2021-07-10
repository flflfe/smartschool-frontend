import React, { useState, useEffect } from "react";

import Axios from "axios";
import Navbar from "../Navbar";
import RefreshIcon from "@material-ui/icons/Refresh";
import MovieIcon from "@material-ui/icons/Movie";

import { useHistory } from "react-router";

import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	container: {
		height: "100vh",
		width: "100vw",
		padding: "0 2em 0 2em",
	},
	mainbox: {
		display: "flex",
		flexDirection: "column",
		paddingTop: "2em",
	},
	recordingsCard: {
		display: "flex",

		borderRadius: "1em",
		height: "100%",
		width: "auto",
		overflow: "none",
		margin: "0 1em 1em 1em",

		cursor: "pointer",
		transition: "all ease 350ms",
		border: `1px solid ${theme.color.colorWhite}`,
		"&:hover": {
			transform: "scale(1.03)",
			border: `1px solid ${theme.color.colorBlue}`,
		},
	},

	recordingsdetails: {
		justifyContent: "start",
		display: "flex",

		backgroundColor: `${theme.color.colorOpacityBlack2}`,
		width: "100%",
		height: "100%",
		color: `${theme.color.colorWhite}`,
		borderRadius: "1em",
		padding: "1em 1em",
	},
	leftcol: {
		flex: "1",
	},
	rightcol: {
		justifyContent: "space-around",
		textAlign: "center",
	},
	recordingname: {
		fontSize: "1.5rem",
		fontWeight: "600",
		lineHeight: "1em",
	},
	recordingauthor: {
		fontSize: "1.2rem",
		marginTop: "0.3rem",
		fontWeight: "400",
	},
	refreshBtn: {
		marginLeft: "1em",
		backgroundColor: `${theme.color.colorGreen}`,
		border: "none",
		textAlign: "center",
		borderRadius: "0.5em",
	},
}));
const ChapterDashboard = ({ match }) => {
	// const classid = match.params.classid;
	const theme = useTheme();
	const classes = useStyles(theme);
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(true);
	const chapterId = match.params.chapterid;
	const [refresh, setRefresh] = useState(true);

	const [chapterData, setChapterData] = useState([]);
	const {
		name,
		recordings,
		// resourceFiles,
		// VocabularyList,
		// chatBotId,
		// subject,
		// _id,
	} = chapterData;
	console.log(recordings);
	console.log(name);

	async function fetchChapterData() {
		console.log(chapterId);

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

			console.log(data);
			setChapterData(data.chapter);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchChapterData();
	}, [refresh]);

	const classId = match.params.classid;
	const subjectId = match.params.subjectid;
	const gotoRecordingDashboard = (recordingId) => {
		console.log(recordingId);

		history.push(
			`/classrooms/${classId}/${subjectId}/chapters/${chapterId}/${recordingId}`
		);
	};

	return (
		<div className={classes.container}>
			<Navbar title="Recordings" chapterId={chapterId} />
			<button
				className={classes.refreshBtn}
				onClick={() => setRefresh(!refresh)}>
				<RefreshIcon fontSize="large" />
			</button>
			<div className={classes.mainbox}>
				{recordings?.map((recording) => (
					<div
						className={classes.recordingsCard}
						onClick={(e) => gotoRecordingDashboard(recording._id)}>
						{console.log(recording._id)}
						<div className={classes.recordingsdetails}>
							<div className={classes.leftcol}>
								<h1 className={classes.recordingname}>
									{recording.title}
								</h1>
								<h1 className={classes.recordingauthor}>
									{recording.author?.Name}
								</h1>
							</div>
							<div className={classes.rightcol}>
								<MovieIcon fontSize={"large"} />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChapterDashboard;
