import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import VideoResources from "./VideoResources";
import ChapterNavBar from "./ChapterNavBar";
import Resources from "../resourcebox/Resources";

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

	const [bufferdone, setBufferDone] = useState(false);
	const [refreshBtn, setRefreshBtn] = useState(true);

	const [transcriptionSeek, setTranscriptionSeek] = useState(0);

	const { title, recordingUrl } = recordingData;
	const { resourceFiles } = chapterData;
	console.log(title, recordingUrl);

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
	}, []);
	useEffect(() => {
		fetchRecordingData();
	}, [refreshBtn]);

	return (
		<div className={classes.container}>
			<ChapterNavBar title={title} />
			<div className={classes.mainbox}>
				<div className={classes.videotextbox}>
					<div className={classes.videobox}>
						<VideoPlayer
							title={title}
							recordingUrl={recordingUrl}
							transcriptionSeek={transcriptionSeek}
							setBufferDone={setBufferDone}
						/>
					</div>
					<div className={classes.textbox}>
						<VideoResources
							chapterId={chapterId}
							recordingId={recordingId}
							chapterData={chapterData}
							recordingData={recordingData}
							setTranscriptionSeek={setTranscriptionSeek}
							bufferDone={bufferdone}
							setRefreshBtn={setRefreshBtn}
							refreshBtn={refreshBtn}
						/>
					</div>
				</div>
				<Resources resourceFiles={resourceFiles} />
			</div>
		</div>
	);
};

export default RecordingDashboard;
