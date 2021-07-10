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
	},

	summaryBox: {
		width: "100%",
		height: "100%",
		cursor: "pointer",
		paddingLeft: "1em",
		paddingTop: "1em",
		overflow: "scroll",
		overflowX: "hidden",
		backgroundColor: `${theme.color.colorOpacityBlack2}`,
	},
	summaryText: {
		color: `${theme.color.colorWhite}`,
	},
}));

const Summary = ({ recordingData }) => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const recordingid = recordingData._id;
	const [summaries, setSummaries] = useState([]);

	async function fetchSummaries() {
		try {
			let response = await Axios({
				method: "get",
				url: `http://localhost:4000/recordings/${recordingid}/get/summary`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let data = await response.data.recording.summary;

			console.log(data);
			setSummaries(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchSummaries();
	}, []);
	return (
		<div className={classes.container}>
			{console.log(recordingid)}
			<div className={classes.summaryBox}>
				{summaries?.map((summary) => (
					<p>{summary.text}</p>
				))}
			</div>
		</div>
	);
};

export default Summary;
