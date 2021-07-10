import React, { useState, useEffect } from "react";
import Axios from "axios";

const Actions = ({ recordingId }) => {
	async function fetchTranscript() {
		try {
			let response = await Axios({
				method: "get",
				url: `http://localhost:4000/recordings/${recordingId}/get/actions`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let data = await response.data;

			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchTranscript();
	}, []);
	return <div>Actions</div>;
};

export default Actions;
