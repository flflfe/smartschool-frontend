import React, { useState } from "react";
import Axios from "axios";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
	container: {
		display: "flex",

		height: "100%",
		width: "100%",

		justifyContent: "space-around",
	},
	fileuploadwrapper: {
		paddingTop: "3em",
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
	},
	inputcontrol: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",

		marginBottom: "0.25rem",
	},

	uploadFileBtn: {
		fontFamily: "inherit",
		fontSize: "1rem",
		fontWeight: 500,
		lineHeight: "inherit",
		cursor: "pointer",
		minWidth: "auto",
		width: "20em",
		height: "auto",
		padding: "0.65rem 1.25rem",
		border: "none",
		outline: "none",
		borderRadius: "2rem 0  0 2rem",
		color: `${theme.color.colorWhite}`,
		background: `${theme.color.colorGreen}`,
		marginTop: "3em",
		textTransform: "capitalize",
		textRendering: "optimizeLegibility",
	},

	cancelUploadBtn: {
		fontFamily: "inherit",
		fontSize: "1rem",
		fontWeight: 500,
		lineHeight: "inherit",
		cursor: "pointer",
		minWidth: "auto",
		width: "10em",
		height: "auto",
		padding: "0.65rem 1.25rem",
		border: "none",
		outline: "none",
		borderRadius: "0 2rem 2rem 0 ",
		color: `${theme.color.colorWhite}`,
		background: `${theme.color.colorRed}`,
		marginTop: "2em",
		textTransform: "capitalize",
		textRendering: "optimizeLegibility",
	},
	errorbox: {
		color: `${theme.color.colorRed}`,
		padding: "0rem 1rem",
		cursor: "pointer",
		textAlign: "center",
	},
	messagebox: {
		color: `${theme.color.colorBlue}`,
		padding: "0rem 1rem",
		cursor: "pointer",
		textAlign: "center",
	},
	btngroup: {
		display: "flex",
		flexDirection: "row",
	},
	fileupload: {
		top: "1em",
		background: `${theme.color.colorRed}`,
	},
	inputBox: {
		fontFamily: "inherit",
		fontSize: "1rem",
		fontWeight: 400,
		lineHeight: "inherit",
		width: "100%",
		height: "auto",
		padding: "0.75rem 1.25rem",
		border: "none",
		outline: "none",
		borderRadius: "2rem",
		color: `${theme.color.colorDarkGray}`,
		background: `${theme.color.colorLightGray}`,
		textTransform: "unset",
		textRendering: "optimizeLegibility",
		margin: "0.5em",
	},
}));

const FileUpload = ({ chapterId }) => {
	console.log(chapterId);

	const theme = useTheme();
	const classes = useStyles(theme);

	const [message, setMessage] = useState("");

	// const [recordingUrl, setRecordingUrl] = useState("");

	const [title, setTitle] = useState("");
	const [error, setError] = useState("");
	const cancelToken = Axios.CancelToken;
	const [source, setSource] = useState(cancelToken.source());
	const [isCancelled, setIsCancelled] = useState(false);

	let file = [];

	const handleUploadRecording = async (url) => {
		console.log();
		Axios({
			method: "post",
			url: `http://localhost:4000/chapters/${chapterId}/recordings`,
			data: {
				title: title,
				recordingUrl: url,
			},
			headers: {
				"Content-Type": "application/json",
				Authorization: `${window.localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const onSubmit = async (event) => {
		console.log(file[0]);
		const data = new FormData();
		data.append("videos", file[0]);
		console.log(data);
		console.log(isCancelled);
		if (isCancelled) {
			setSource(new cancelToken.source());
			setIsCancelled(false);
		}
		setMessage("Submitting...");
		event.preventDefault(event);
		console.log(data);
		Axios({
			method: "post",
			url: "http://localhost:4000/upload/videos",
			data: data,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `${window.localStorage.getItem("token")}`,
			},
			cancelToken: source.token,
			onUploadProgress: function (progressEvent) {
				var percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
				setMessage(`Uploading (${percentCompleted}%)`);
			},
		})
			.then(async (res) => {
				console.log(res);
				// setRecordingUrl(res.data.Response);

				console.log(res.data.Response);
				console.log(res.status);

				await handleUploadRecording(res.data.Response);
			})
			.catch((err) => {
				console.log(err);
				if (Axios.isCancel(err)) {
					setMessage("Request Cancelled");
				} else if (err.response) {
					setMessage(err.response.data?.message);
				} else {
					setMessage("Network Error");
				}
				return;
			});
	};
	const onCancel = () => {
		console.log("Cancel clicked");
		source.cancel("axios request cancelled");
		setIsCancelled(true);
	};
	// console.log(recordingVideoData);

	return (
		<div className={classes.container}>
			<div className={classes.fileuploadwrapper}>
				<form onSubmit={onSubmit}>
					<div className={classes.fileupload}>File Upload</div>
					<div>
						<div className={classes.inputcontrol}>
							<div className={classes.messagebox}>{message}</div>
							<input
								className={classes.inputBox}
								type="text"
								value={title}
								placeholder="Enter Title"
								required
								onChange={(e) => setTitle(e.target.value)}
							/>

							<input
								type="file"
								id="file"
								placeholder="Upload file here"
								required
								onChange={(event) => file.push(event.target.files[0])}
							/>

							<div className={classes.btngroup}>
								<input
									type="submit"
									name="submit"
									className={classes.uploadFileBtn}
									onClick={onSubmit}
								/>
								<input
									type="button"
									name="cancel"
									className={classes.cancelUploadBtn}
									defaultValue="Cancel Upload"
									onClick={onCancel}
								/>
							</div>
						</div>
					</div>
				</form>

				<div className={classes.errorbox} onClick={() => setError(null)}>
					{error}
				</div>
			</div>
		</div>
	);
};

export default FileUpload;
