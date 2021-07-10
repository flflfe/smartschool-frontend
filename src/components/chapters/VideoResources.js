import React, { useState } from "react";

import Resources from "../resourcebox/Resources";
import Transcript from "../resourcebox/Transcript";
import Summary from "../resourcebox/Summary";
import Topics from "../resourcebox/Topics";
import QnaBot from "../resourcebox/QnaBot";
import Followup from "../resourcebox/Followup";
import Actions from "../resourcebox/Actions";
import ResourceChecker from "../resourcebox/ResourceChecker";

import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	resoursesWrapper: {
		height: "100%",
		width: "100%",
		justifyContent: "start",
		display: "flex",
		flexDirection: "column",
	},
	navBar: {
		width: "100%",
		height: "auto",
		display: "flex",
		flexDirection: "column",

		backgroundColor: `${theme.color.colorGreen}`,
	},
	navBarRow: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
	},
	navBarItem: {
		width: "100%",
		height: "100%",
		justifyContent: "space-around",
		padding: "0.2em 0.6em 0.2em 0.6em",
		// backgroundColor: `${theme.color.colorOpacityBlack2}`,
		textAlign: "center",

		"&:hover": {
			cursor: "pointer",
			backgroundColor: `${theme.color.colorWhite}`,
			color: `${theme.color.colorGreen}`,
		},
	},
	mainbody: {
		height: "100%",
	},
}));

const VideoResources = ({
	chapterData,
	recordingData,
	setTranscriptionSeek,
	bufferDone,
	setRefreshBtn,
	refreshBtn,
	recordingId,
	chapterId,
}) => {
	const theme = useTheme();
	const classes = useStyles(theme);

	const {
		name,
		recordings,
		resourceFiles,
		VocabularyList,
		chatBotId,
		subject,
		_id,
	} = chapterData;
	const { isRequested, isComplete } = recordingData;
	console.log(chapterData);
	console.log(recordingData);

	const [activeBox, setActiveBox] = useState("Resources");

	const navBarActiveHandler = (value) => {
		setActiveBox(value);
	};

	return (
		<div className={classes.resoursesWrapper}>
			<div className={classes.navBar}>
				<div className={classes.navBarRow}>
					<div
						className={classes.navBarItem}
						onClick={() => navBarActiveHandler("Resources")}>
						Resources
					</div>
					<div
						className={classes.navBarItem}
						onClick={() => navBarActiveHandler("Transcript")}>
						Transcript
					</div>
					<div
						className={classes.navBarItem}
						onClick={() => navBarActiveHandler("Summary")}>
						Summary
					</div>
				</div>
				<div className={classes.navBarRow}>
					<div
						className={classes.navBarItem}
						onClick={() => navBarActiveHandler("Topics")}>
						Topics
					</div>
					<div
						className={classes.navBarItem}
						onClick={() => navBarActiveHandler("QNA Bot")}>
						QNA Bot
					</div>
					<div
						className={classes.navBarItem}
						onClick={() => navBarActiveHandler("Followup")}>
						Followups
					</div>
					<div
						className={classes.navBarItem}
						onClick={() => navBarActiveHandler("Actions")}>
						Actions
					</div>
				</div>
			</div>
			<div className={classes.mainbody}>
				{isComplete !== true || isRequested !== true ? (
					<ResourceChecker
						recordingId={recordingId}
						setRefreshBtn={setRefreshBtn}
						refreshBtn={refreshBtn}
						isComplete={isComplete}
						isRequested={isRequested}
					/>
				) : (
					<>
						{activeBox === "Resources" ? (
							<Resources resourceFiles={resourceFiles} />
						) : activeBox === "Transcript" ? (
							<Transcript
								recordingData={recordingData}
								setTranscriptionSeek={setTranscriptionSeek}
								bufferDone={bufferDone}
							/>
						) : activeBox === "Summary" ? (
							<Summary recordingData={recordingData} />
						) : activeBox === "Topics" ? (
							<Topics />
						) : activeBox === "QNA Bot" ? (
							<QnaBot
								chapterId={chapterId}
								chapterData={chapterData}
								recordingId={recordingId}
							/>
						) : activeBox === "Followup" ? (
							<Followup />
						) : activeBox === "Actions" ? (
							<Actions recordingId={recordingId} />
						) : null}
					</>
				)}
			</div>
		</div>
	);
};

export default VideoResources;
