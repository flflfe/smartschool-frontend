import React, { useState, useEffect } from "react";
import Axios from "axios";
import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	container: {
		height: "100%",
		width: "100%",
	},
	actionbox: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: `${theme.color.colorBlack3}`,
		width: "100%",
		height: "100%",
		padding: "1em",
	},
}));

const Actions = ({ recordingId }) => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [actions, setActions] = useState([]);
	async function fetchActions() {
		try {
			let response = await Axios({
				method: "get",
				url: `http://localhost:4000/recordings/${recordingId}/get/actions`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let data = await response.data.recording.actions;
			setActions(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchActions();
	}, []);
	return (
		<div className={classes.container}>
			<div className={classes.actionbox}>
				{actions?.map((action) => (
					<p>{action.text}</p>
				))}
			</div>
		</div>
	);
};

export default Actions;
