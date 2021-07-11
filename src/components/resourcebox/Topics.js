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

	topicbox: {
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

const Topics = ({ recordingId }) => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [topics, setTopics] = useState([]);

	const handlegotolink = (keyword) => {
		const url =
			"https://en.wikipedia.org/w/index.php?search=" +
			encodeURIComponent(keyword) +
			"&ns0=1&fulltext=Search";
		window.open(url, "_blank").focus();
	};

	async function fetchTopics() {
		try {
			let response = await Axios({
				method: "get",
				url: `http://localhost:4000/recordings/${recordingId}/get/topics`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let data = await response.data.recording.topics;

			console.log(data);
			setTopics(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchTopics();
	}, []);

	return (
		<div className={classes.container}>
			{console.log(recordingId)}
			<div className={classes.topicbox}>
				{topics?.map((topic, key) => (
					<p key={key} onClick={() => handlegotolink(topic.text)}>
						{topic.text}
					</p>
				))}
			</div>
		</div>
	);
};

export default Topics;
