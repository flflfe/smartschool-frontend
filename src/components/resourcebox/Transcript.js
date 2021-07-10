import React, { useState, useEffect } from "react";
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
		backgroundColor: `${theme.color.colorBlack3}`,
		width: "100%",
		height: "100%",
	},

	transcriptbox: {
		width: "100%",
		height: "75%",
		cursor: "pointer",
		paddingLeft: "1em",
		paddingTop: "1em",
		overflow: "scroll",
		overflowX: "hidden",
		backgroundColor: `${theme.color.colorOpacityBlack2}`,
	},
	// transcripttext: {
	// 	"&:hover": {
	// 		color: `${theme.color.colorGreen}`,
	// 		cursor: "pointer",
	// 	},
	// },
	searchcontainer: {
		width: "100%",
		display: "flex",
	},
	searchbox: {
		flex: 1,
	},
	loadingBox: {
		height: "100%",
	},
	box: {
		height: "auto",
		transition: "all ease 350ms",
		borderRadius: "1em",
		border: `1px solid ${theme.color.colorWhite}`,
		"&:hover": {
			transform: "scale(1.03)",
			border: `1px solid ${theme.color.colorBlue}`,
			color: `${theme.color.colorGreen}`,
			cursor: "pointer",
		},
		margin: "0.8em 0.8em 0.8em 0.2em",
		padding: "0.5em",
	},
	speaker: {
		fontweight: "200",
	},
}));

const Transcript = ({
	recordingData,
	setTranscriptionSeek,
	bufferDone,
	isRequested,
	isComplete,
}) => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const recordingid = recordingData._id;
	const [transcript, setTrancript] = useState([]);
	const [query, setQuery] = useState("");
	console.log(transcript);

	async function fetchTranscript() {
		try {
			let response = await Axios({
				method: "get",
				url: `http://localhost:4000/recordings/${recordingid}/get/transcript`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let data = await response.data.recording.transcript;

			console.log(data);
			setTrancript(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchTranscript();
	}, []);
	return (
		<div className={classes.container}>
			{bufferDone ? (
				<>
					<div className={classes.searchcontainer}>
						<input
							className={classes.searchbox}
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							id="header-search"
							placeholder="Search"
							name="s"
						/>
					</div>

					<div className={classes.transcriptbox}>
						{transcript
							?.filter((filteredTranscripts) =>
								filteredTranscripts.text.includes(query)
							)
							.map((mappedTranscript) => (
								<div
									className={classes.box}
									onClick={(e) =>
										setTranscriptionSeek(mappedTranscript.startTime)
									}>
									{console.log(mappedTranscript)}
									<div className={classes.speaker}>
										{mappedTranscript.from.name}
									</div>
									<p className={classes.transcripttext}>
										{mappedTranscript.text}
									</p>

									{mappedTranscript.sentiment.suggested ===
									"neutral" ? (
										<p
											className={classes.transcripttext}
											style={{ color: `${theme.color.colorBlue}` }}>
											{mappedTranscript.sentiment.suggested}
										</p>
									) : mappedTranscript.sentiment.suggested ===
									  "negative" ? (
										<p
											className={classes.transcripttext}
											style={{ color: `${theme.color.colorRed}` }}>
											{mappedTranscript.sentiment.suggested}
										</p>
									) : mappedTranscript.sentiment.suggested ===
									  "positive" ? (
										<p
											className={classes.transcripttext}
											style={{ color: `${theme.color.colorGreen}` }}>
											{mappedTranscript.sentiment.suggested}
										</p>
									) : null}
								</div>
							))}
					</div>
				</>
			) : (
				<div className={classes.loadingBox}>Getting Transcript..</div>
			)}
		</div>
	);
};

export default Transcript;
