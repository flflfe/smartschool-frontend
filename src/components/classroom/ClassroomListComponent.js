import React, { useState, useEffect } from "react";
import ClassroomCard from "../classroom/ClassroomCard";
import { useHistory } from "react-router";

import Axios from "axios";
import LoadingComponent from "../LoadingComponent";

import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	container: {
		display: "flex",

		height: "auto",
	},

	classroomlist: {
		justifyContent: "center",
		width: "96vw",
		height: "auto",
	},

	listMain: {
		height: "auto",
		width: "auto",

		display: "grid",
		justifyItems: "stretch",
		alignItems: "start",
		overflow: "scroll",
		overflowX: "hidden",

		gridTemplateRows: "repeat(auto, 50px)",
		gridTemplateColumns: "1fr 1fr 1fr",

		gridAutoFlow: "row",
	},
	classroomCardList: {
		margin: "0.5em",
	},
}));

const ClassroomListComponent = () => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const history = useHistory();

	const [isLoading, setIsLoading] = useState(true);

	const [classroomList, setClassroomList] = useState([]);

	async function fetchClassrooms() {
		try {
			let response = await Axios({
				method: "get",
				url: "http://localhost:4000/classrooms",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let classroomList = await response.data.classrooms;

			setClassroomList(classroomList);
			setIsLoading(false);
			// console.log(classroomList);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchClassrooms();
	}, []);
	const onClickHandler = (classid) => {
		// console.log(`Class ID: ${classid}`);
		history.push(`/classrooms/${classid}`);
	};

	return (
		<div className={classes.container}>
			<div className={classes.classroomlist}>
				{isLoading ? (
					<LoadingComponent />
				) : (
					<div className={classes.listMain}>
						{classroomList.map((classroom) => (
							<div
								className={classes.classroomCardList}
								key={classroom._id}>
								<ClassroomCard
									name={classroom.name}
									teachers={classroom.teachers}
									onClickHandler={(e) => {
										// console.log(classroom._id);
										onClickHandler(classroom._id);
									}}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ClassroomListComponent;
