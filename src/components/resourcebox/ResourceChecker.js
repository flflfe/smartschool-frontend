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
	loadingBox: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		textAlign: "center",
		alignItems: "center",
		marginTop: "1em",
	},

	inputfield: {
		fontFamily: "inherit",
		fontSize: "1rem",
		fontWeight: 400,
		lineHeight: "inherit",
		width: "50%",
		height: "auto",
		padding: "0.75rem 1.25rem",
		border: "none",
		outline: "none",
		borderRadius: "1rem",
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
		width: "50%",
		height: "auto",
		padding: "0.65rem 1.25rem",
		margin: "0.65rem 1.25rem",

		border: "none",
		outline: "none",
		borderRadius: "1rem",
		color: `${theme.color.colorWhite}`,
		background: `${theme.color.colorBlue}`,

		textTransform: "capitalize",
		textRendering: "optimizeLegibility",
	},
}));

const ResourceChecker = ({
	isRequested,
	isComplete,
	setRefreshBtn,
	refreshBtn,
	recordingId,
}) => {
	const theme = useTheme();
	const classes = useStyles(theme);

	const [speakerCount, setSpeakerCount] = useState(1);

	async function requestAIProcessing() {
		try {
			let response = await Axios({
				method: "post",
				url: `http://localhost:4000/recordings/${recordingId}/requestprocessing`,
				data: {
					speakerCount: speakerCount,
				},
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let data = await response.data;
			setRefreshBtn(() => !refreshBtn);

			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}
	async function checkStatus() {
		try {
			let response = await Axios({
				method: "post",
				url: `http://localhost:4000/recordings/${recordingId}/checkstatus`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let data = await response.data;
			setRefreshBtn(() => !refreshBtn);

			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div>
			{isRequested === true && isComplete === false ? (
				<>
					<div className={classes.loadingBox}>
						This may take a while... Please Check Status after some time.
					</div>
					<input
						type="button"
						name="submit"
						className={classes.inputsubmit}
						defaultValue="Refresh"
						onClick={() => checkStatus()}
					/>
				</>
			) : isRequested === false && isComplete === false ? (
				<div className={classes.loadingBox}>
					<label htmlFor="speakerCount">
						Select Number of Speakers in the Video
					</label>
					<input
						type="number"
						name="speakerCount"
						value={speakerCount}
						className={classes.inputfield}
						min={1}
						onChange={(e) => setSpeakerCount(e.target.value)}
					/>
					<label htmlFor="train">
						Click here to Request AI Processing
					</label>
					<input
						type="button"
						name="train"
						className={classes.inputsubmit}
						defaultValue="Request AI Processing"
						onClick={() => requestAIProcessing()}
					/>
				</div>
			) : null}
		</div>
	);
};

export default ResourceChecker;
